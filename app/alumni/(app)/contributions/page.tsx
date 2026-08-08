'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch, formatDate, getApiBase, getAlumniToken, unwrapList } from '@/lib/api';
import { Contribution } from '@/types';

export default function AlumniContributionsPage() {
  const router = useRouter();
  const paymentPanelRef = useRef<HTMLDivElement>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [selectedInstallmentId, setSelectedInstallmentId] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('jopesa_user') || '{}') : {};
    if (storedUser?.phone) {
      setPhone(storedUser.phone);
    }

    const loadContributions = async () => {
      setLoading(true);
      setError('');
      try {
        const payload = await apiFetch<Contribution[]>('/contributions?skip=0&take=100');
        const contributionsList = unwrapList<Contribution>(payload);
        setContributions(contributionsList);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unable to load contributions');
      } finally {
        setLoading(false);
      }
    };

    loadContributions();
  }, []);

  // Handle pre-selected contribution from event registration
  useEffect(() => {
    if (contributions.length > 0) {
      const preSelectedId = typeof window !== 'undefined' ? localStorage.getItem('selectedContributionId') : null;
      if (preSelectedId) {
        const preSelected = contributions.find(c => c.id === preSelectedId);
        if (preSelected) {
          setSelectedContribution(preSelected);
          setSelectedInstallmentId(preSelected.installments?.[0]?.id || '');
          setAmount(preSelected.installments?.[0]?.amount?.toString() || '');
          setMessage(`Payment for ${preSelected.title}`);
          localStorage.removeItem('selectedContributionId');
        }
      }
    }
  }, [contributions]);

  const handleSelectContribution = (contribution: Contribution) => {
    setSelectedContribution(contribution);
    setSelectedInstallmentId(contribution.installments?.[0]?.id || '');
    setAmount(contribution.installments?.[0]?.amount?.toString() || '');
    setMessage(`Payment for ${contribution.title}`);
    setSuccess('');
    setError('');
    
    // Scroll to payment form on mobile
    if (window.innerWidth < 768 && paymentPanelRef.current) {
      paymentPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInitiate = async () => {
    if (!selectedContribution) return;
    if (!selectedInstallmentId) {
      setError('Please select an installment.');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        installmentId: selectedInstallmentId,
        amount: Number(amount),
        phone,
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
        setSuccess('Fapshi checkout link ready. Redirecting…');
        window.location.assign(checkoutLink);
        return;
      }

      if (transId) {
        setSuccess(`Payment initiated successfully. Reference: ${transId}`);
        return;
      }

      setSuccess('Payment initiated. Please follow the payment instructions.');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unable to initiate payment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Contributions</h1>
          <p style={{ margin: '8px 0 0', color: 'var(--gray)' }}>
            Pay for contributions in installments and track your payment history.
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>Loading contributions...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }} className="contributions-grid">
          <div>
            {error && <div style={{ marginBottom: 16, color: 'var(--err)', padding: 12, background: '#fee2e2', borderRadius: 8 }}>{error}</div>}
            {contributions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--gray)' }}>No available contributions at this time.</div>
            ) : (
              <div style={{ display: 'grid', gap: 16 }}>
                {contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    style={{
                      border: '1px solid var(--lgray)',
                      borderRadius: 16,
                      padding: 20,
                      background: selectedContribution?.id === contribution.id ? 'rgba(200,150,12,0.08)' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => handleSelectContribution(contribution)}
                    className="contribution-card"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 16, fontWeight: 800 }}>{contribution.title}</div>
                      <div style={{ 
                        padding: '4px 12px', 
                        borderRadius: 20, 
                        fontSize: 12, 
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        background: contribution.status === 'ACTIVE' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                        color: contribution.status === 'ACTIVE' ? '#34d399' : '#9ca3af'
                      }}>
                        {contribution.status?.toLowerCase()}
                      </div>
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 12 }}>{contribution.description || 'No description provided.'}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>
                        {contribution.installments?.length || 0} installment(s)
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--gray)' }}>
                        Total: {contribution.installments?.reduce((sum, inst) => sum + (inst.amount || 0), 0).toLocaleString()} XAF
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div ref={paymentPanelRef} style={{ border: '1px solid var(--lgray)', borderRadius: 16, padding: 20, background: '#fff', position: 'sticky', top: 20 }} className="payment-panel">
            {selectedContribution ? (
              <>
                <h2 style={{ marginTop: 0, fontSize: 20, marginBottom: 16 }}>Pay: {selectedContribution.title}</h2>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700 }}>Installment</label>
                  <select
                    value={selectedInstallmentId}
                    onChange={(e) => {
                      setSelectedInstallmentId(e.target.value);
                      const installment = selectedContribution.installments?.find((inst) => inst.id === e.target.value);
                      if (installment) {
                        setAmount(installment.amount?.toString() || '');
                      }
                    }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--lgray)', fontSize: 14 }}
                  >
                    {selectedContribution.installments?.map((installment) => (
                      <option key={installment.id} value={installment.id}>
                        {installment.label} — {installment.amount?.toLocaleString()} XAF{installment.dueDate ? ` (Due ${formatDate(installment.dueDate)})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700 }}>Amount (XAF)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--lgray)', fontSize: 14 }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700 }}>Phone number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +237 650 000 000"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--lgray)', fontSize: 14 }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700 }}>Message (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a note for this payment"
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--lgray)', resize: 'vertical', fontSize: 14 }}
                  />
                </div>
                {error && <div style={{ marginBottom: 12, color: 'var(--err)', fontSize: 13, padding: 10, background: '#fee2e2', borderRadius: 8 }}>{error}</div>}
                {success && <div style={{ marginBottom: 12, color: 'var(--succ)', fontSize: 13, padding: 10, background: '#dcfce7', borderRadius: 8 }}>{success}</div>}
                <button
                  onClick={handleInitiate}
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'var(--navy)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Processing...' : 'Pay Now'}
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>
                Select a contribution to make a payment
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
