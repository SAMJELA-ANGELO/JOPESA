'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Gift, Calendar, Clock, CheckCircle } from 'lucide-react';
import { apiFetch, formatDate, getApiBase, getAlumniToken, isValidCameroonPhone, normalizeCameroonPhone, unwrapList } from '@/lib/api';
import { Contribution } from '@/types';
import Toast from '@/components/Toast';
import HeroSelect from '@/components/HeroSelect';

export default function AlumniContributionsPage() {
  const router = useRouter();
  const paymentPanelRef = useRef<HTMLDivElement>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [selectedInstallmentId, setSelectedInstallmentId] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'warning' | 'error' }>({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'warning' | 'error') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('jopesa_user') || '{}') : {};
    if (storedUser?.phone) {
      setPhone(normalizeCameroonPhone(storedUser.phone));
    }

    const loadContributions = async () => {
      setLoading(true);
      try {
        const payload = await apiFetch<Contribution[]>('/contributions?skip=0&take=100');
        const contributionsList = unwrapList<Contribution>(payload);
        setContributions(contributionsList.filter((contribution) => contribution.type?.toUpperCase() !== 'REGISTRATION_FEE'));
      } catch (err) {
        console.error(err);
        showToast(err instanceof Error ? err.message : 'Unable to load contributions', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadContributions();
  }, []);

  useEffect(() => {
    if (!toast.show) return;
    const timer = window.setTimeout(() => setToast((current) => ({ ...current, show: false })), 3500);
    return () => window.clearTimeout(timer);
  }, [toast.show]);

  // Handle pre-selected contribution from event registration
  useEffect(() => {
    if (contributions.length > 0) {
      const preSelectedId = typeof window !== 'undefined' ? localStorage.getItem('selectedContributionId') : null;
      if (preSelectedId) {
        const preSelected = contributions.find(c => c.id === preSelectedId);
        if (preSelected) {
          setSelectedContribution(preSelected);
          setSelectedInstallmentId(preSelected.type === 'DONATION' ? '' : preSelected.installments?.[0]?.id || '');
          setAmount(preSelected.type === 'DONATION' ? '' : preSelected.installments?.[0]?.amount?.toString() || '');
          setMessage(`Payment for ${preSelected.title}`);
          localStorage.removeItem('selectedContributionId');
        }
      }
    }
  }, [contributions]);

  const handleSelectContribution = (contribution: Contribution) => {
    setSelectedContribution(contribution);
    setSelectedInstallmentId(contribution.type === 'DONATION' ? '' : contribution.installments?.[0]?.id || '');
    setAmount(contribution.type === 'DONATION' ? '' : contribution.installments?.[0]?.amount?.toString() || '');
    setMessage(`Payment for ${contribution.title}`);
    // Scroll to payment form on mobile
    if (window.innerWidth < 768 && paymentPanelRef.current) {
      paymentPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInitiate = async () => {
    if (!selectedContribution) return;
    const normalizedPhone = normalizeCameroonPhone(phone);
    if (!isValidCameroonPhone(normalizedPhone)) {
      showToast('Enter a 9-digit phone number starting with 6, for example 681778976.', 'warning');
      return;
    }
    const isDonation = selectedContribution.type === 'DONATION';
    if (!isDonation && !selectedInstallmentId) {
      showToast('Please select an installment.', 'warning');
      return;
    }
    if (isDonation && (!Number.isInteger(Number(amount)) || Number(amount) <= 0)) {
      showToast('Enter a positive whole-number donation amount in XAF.', 'warning');
      return;
    }
    setSubmitting(true);

    try {
      const payload = {
        ...(selectedInstallmentId ? { installmentId: selectedInstallmentId } : {}),
        ...(isDonation ? { amount: Number(amount) } : {}),
        phone: normalizedPhone,
        redirectUrl: redirectUrl || `${window.location.origin}/alumni/profile`,
        message,
      };

      const result = await apiFetch<any>(`/contributions/${selectedContribution.id}/payments/initiate`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }, true);

      const checkoutLink = result?.link || result?.redirectUrl || result?.data?.link || result?.data?.redirectUrl;
      const transId = result?.transId || result?.data?.transId || result?.transactionId || result?.data?.transactionId;

      if (checkoutLink) {
        showToast('Fapshi checkout link ready. Redirecting...', 'success');
        window.location.assign(checkoutLink);
        return;
      }

      if (transId) {
        showToast(`Payment initiated successfully. Reference: ${transId}`, 'success');
        return;
      }

      showToast('Payment initiated. Please follow the payment instructions.', 'success');
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Unable to initiate payment', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 16px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%)',
        borderRadius: '20px',
        padding: '32px 28px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,43,107,0.15)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(200,150,12,0.15) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(240,192,64,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <CreditCard size={28} color="var(--gold2)" />
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '28px', 
                fontWeight: 800, 
                color: '#fff',
                letterSpacing: '-0.5px'
              }}>
                Contributions
              </h1>
              <p style={{ 
                margin: '4px 0 0', 
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Pay for contributions in installments and track your payment history
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '16px',
          color: 'var(--navy)',
          fontWeight: '600'
        }}>
          <div className="loading-spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
          <span>Loading contributions...</span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }} className="contributions-grid">
          <div>
            {contributions.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: 64, 
                color: 'var(--gray)',
                background: '#fff',
                borderRadius: '20px',
                border: '1px solid var(--lgray)'
              }}>
                <Gift size={48} style={{ color: 'var(--navy)', marginBottom: '16px' }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>No available contributions at this time.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 16 }}>
                {contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    style={{
                      border: selectedContribution?.id === contribution.id ? '2px solid var(--navy)' : '1px solid var(--lgray)',
                      borderRadius: '20px',
                      padding: '24px',
                      background: selectedContribution?.id === contribution.id ? 'rgba(0,43,107,0.03)' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      boxShadow: selectedContribution?.id === contribution.id ? '0 4px 20px rgba(0,43,107,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                    onClick={() => handleSelectContribution(contribution)}
                    className="contribution-card"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)' }}>{contribution.title}</div>
                      <div style={{ 
                        padding: '6px 14px', 
                        borderRadius: '999', 
                        fontSize: '13px', 
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        background: contribution.status === 'ACTIVE' ? 'rgba(52, 211, 153, 0.12)' : 'rgba(156, 163, 175, 0.12)',
                        color: contribution.status === 'ACTIVE' ? '#10b981' : '#6b7280'
                      }}>
                        {contribution.status?.toLowerCase()}
                      </div>
                    </div>
                    <div style={{ fontSize: '15px', color: 'var(--gray)', marginBottom: 16, lineHeight: '1.5' }}>{contribution.description || 'No description provided.'}</div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px', 
                        fontWeight: 700, 
                        color: 'var(--navy)'
                      }}>
                        {contribution.type === 'DONATION' ? <Gift size={16} /> : <Calendar size={16} />}
                        {contribution.type === 'DONATION' ? 'Voluntary amount' : `${contribution.installments?.length || 0} installment(s)`}
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px', 
                        color: 'var(--gray)'
                      }}>
                        <Clock size={16} />
                        {contribution.type === 'DONATION' ? 'Give any amount' : `Total: ${contribution.installments?.reduce((sum, inst) => sum + (inst.amount || 0), 0).toLocaleString()} XAF`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div ref={paymentPanelRef} style={{ 
            border: '1px solid var(--lgray)', 
            borderRadius: '20px', 
            padding: '28px', 
            background: '#fff', 
            position: 'sticky', 
            top: 20,
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }} className="payment-panel">
            {selectedContribution ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CreditCard size={24} color="#fff" />
                  </div>
                  <div>
                    <h2 style={{ marginTop: 0, fontSize: '20px', fontWeight: 800, color: 'var(--navy)' }}>Pay: {selectedContribution.title}</h2>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--gray)' }}>
                      {selectedContribution.type === 'DONATION' ? 'Make a donation' : 'Select an installment to pay'}
                    </p>
                  </div>
                </div>
                {selectedContribution.type !== 'DONATION' && <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', marginBottom: 10, fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>Installment</label>
                  <HeroSelect
                    value={selectedInstallmentId}
                    onChange={(value) => {
                      setSelectedInstallmentId(value);
                      const installment = selectedContribution.installments?.find((inst) => inst.id === value);
                      if (installment) {
                        setAmount(installment.amount?.toString() || '');
                      }
                    }}
                    ariaLabel="Installment"
                    style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid var(--lgray)', fontSize: 15, fontWeight: 500 }}
                    options={(selectedContribution.installments || []).map((installment) => ({
                      value: installment.id,
                      label: `${installment.label} — ${installment.amount?.toLocaleString()} XAF${installment.dueDate ? ` (Due ${formatDate(installment.dueDate)})` : ''}`,
                    }))}
                  />
                </div>}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', marginBottom: 10, fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>{selectedContribution.type === 'DONATION' ? 'Donation amount (XAF)' : 'Amount (XAF)'}</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(e) => selectedContribution.type === 'DONATION' && setAmount(e.target.value)}
                    readOnly={selectedContribution.type !== 'DONATION'}
                    aria-readonly={selectedContribution.type !== 'DONATION'}
                    tabIndex={selectedContribution.type === 'DONATION' ? 0 : -1}
                    placeholder={selectedContribution.type === 'DONATION' ? 'Enter any amount' : undefined}
                    style={{ 
                      width: '100%', 
                      padding: '14px 16px', 
                      borderRadius: 12, 
                      border: '1.5px solid var(--lgray)', 
                      fontSize: 15, 
                      fontWeight: 500,
                      background: selectedContribution.type === 'DONATION' ? '#fff' : '#f9fafb', 
                      color: 'var(--dark)', 
                      cursor: selectedContribution.type === 'DONATION' ? 'text' : 'not-allowed'
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', marginBottom: 10, fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>Phone number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(normalizeCameroonPhone(e.target.value).slice(0, 9))}
                    placeholder="681778976"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={18}
                    aria-describedby="payment-phone-format"
                    style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid var(--lgray)', fontSize: 15, fontWeight: 500 }}
                  />
                  <div id="payment-phone-format" style={{ marginTop: 8, color: phone && !isValidCameroonPhone(phone) ? 'var(--err)' : 'var(--gray)', fontSize: 13 }}>
                    Use exactly 9 digits, starting with 6.
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', marginBottom: 10, fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>Message (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a note for this payment"
                    rows={3}
                    style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid var(--lgray)', resize: 'vertical', fontSize: 15, fontWeight: 500 }}
                  />
                </div>
                <button
                  onClick={handleInitiate}
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    boxShadow: '0 4px 16px rgba(0,43,107,0.25)',
                    transition: 'all 0.2s'
                  }}
                >
                  {submitting ? 'Processing...' : 'Pay Now'}
                </button>
              </>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                color: 'var(--gray)', 
                padding: 48,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}>
                <CreditCard size={48} style={{ color: 'var(--navy)' }} />
                <span style={{ fontSize: '15px', fontWeight: 600 }}>Select a contribution to make a payment</span>
              </div>
            )}
          </div>
        </div>
      )}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}
