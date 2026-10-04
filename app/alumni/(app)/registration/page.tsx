'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BadgeCheck, CreditCard, LockKeyhole, RefreshCw, Users } from 'lucide-react';
import { apiFetch, formatDate, getAlumniUser, isValidCameroonPhone, normalizeCameroonPhone } from '@/lib/api';
import { RegistrationOverview } from '@/types';

interface InitiatePaymentResponse {
  link?: string;
  redirectUrl?: string;
  transId?: string;
  transactionId?: string;
  data?: {
    link?: string;
    redirectUrl?: string;
    transId?: string;
    transactionId?: string;
  };
}

export default function AlumniRegistrationPage() {
  const [overview, setOverview] = useState<RegistrationOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedContributionId, setSelectedContributionId] = useState('');
  const [selectedInstallmentId, setSelectedInstallmentId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  const loadOverview = useCallback(async () => {
    try {
      const result = await apiFetch<RegistrationOverview>('/contributions/registration/overview', {}, true);
      setOverview(result);
      setSelectedContributionId((current) => current || result.contributions.find((item) => item.status === 'ACTIVE')?.id || '');
      window.dispatchEvent(new CustomEvent('jopesa:registration-status', { detail: result.hasPaidRegistration }));
      setError('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load registration information.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initTimer = window.setTimeout(() => {
      const user = getAlumniUser<{ phone?: string }>();
      if (user?.phone) setPhone(normalizeCameroonPhone(user.phone));
      const params = new URLSearchParams(window.location.search);
      if (params.get('locked') === '1') {
        setNotice('Please pay at least one registration installment to unlock the rest of the alumni portal.');
      } else if (params.get('verification') === 'failed') {
        setNotice('We could not verify your registration status. Please try refreshing this page.');
      }
      void loadOverview();
    }, 0);
    const interval = window.setInterval(() => void loadOverview(), 8000);
    const handleFocus = () => void loadOverview();
    window.addEventListener('focus', handleFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      window.clearTimeout(initTimer);
    };
  }, [loadOverview]);

  const selectedContribution = overview?.contributions.find((item) => item.id === selectedContributionId);
  const installments = selectedContribution?.installments || [];
  const completedLabels = new Set(
    selectedContribution?.payments
      ?.filter((payment) => payment.status === 'COMPLETED')
      .map((payment) => payment.installmentLabel) || [],
  );
  const payableInstallments = installments.filter((item) => !completedLabels.has(item.label));
  const selectedInstallment = payableInstallments.find((item) => item.id === selectedInstallmentId)
    || payableInstallments[0];
  const totalPaid = useMemo(() => (overview?.contributions || []).reduce(
    (total, contribution) => total + (contribution.payments || [])
      .filter((payment) => payment.status === 'COMPLETED')
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
    0,
  ), [overview]);

  const initiatePayment = async () => {
    if (!selectedContribution || !selectedInstallment) return;
    const normalizedPhone = normalizeCameroonPhone(phone);
    if (!isValidCameroonPhone(normalizedPhone)) {
      setError('Enter a valid 9-digit Cameroon phone number starting with 6.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const result = await apiFetch<InitiatePaymentResponse>(
        `/contributions/${selectedContribution.id}/payments/initiate`,
        {
          method: 'POST',
          body: JSON.stringify({
            installmentId: selectedInstallment.id,
            phone: normalizedPhone,
            redirectUrl: `${window.location.origin}/alumni/registration`,
            message: `Registration fee: ${selectedInstallment.label}`,
          }),
        },
        true,
      );
      const checkoutLink = result?.link || result?.redirectUrl || result?.data?.link || result?.data?.redirectUrl;
      if (checkoutLink) {
        window.location.assign(checkoutLink);
        return;
      }
      setNotice('Payment started. Your portal access will update after the payment provider confirms the transaction.');
      await loadOverview();
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : 'Unable to initiate payment.');
    } finally {
      setSubmitting(false);
    }
  };

  const payments = (overview?.contributions || []).flatMap((contribution) =>
    (contribution.payments || []).map((payment) => ({ ...payment, contributionTitle: contribution.title })),
  ).sort((a, b) => new Date(b.paymentDate || b.createdAt || '').getTime() - new Date(a.paymentDate || a.createdAt || '').getTime());

  if (loading) {
    return (
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
        <span>Loading registration details...</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%)',
        borderRadius: '20px',
        padding: '36px 32px',
        marginBottom: '32px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,43,107,0.2)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(200,150,12,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '18px',
            background: 'rgba(200,150,12,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <BadgeCheck size={36} color="var(--gold2)" />
          </div>
          <div>
            <h1 style={{ 
              fontSize: 'clamp(24px, 4vw, 32px)', 
              fontWeight: '800', 
              marginBottom: '8px',
              letterSpacing: '-0.5px'
            }}>
              Alumni Registration
            </h1>
            <p style={{ 
              fontSize: '15px', 
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '500px',
              lineHeight: 1.6
            }}>
              Complete your registration to unlock full access to the alumni portal
            </p>
          </div>
        </div>
      </div>

      {notice && (
        <div 
          style={{ 
            marginBottom: 24, 
            padding: '18px 22px',
            color: overview?.hasPaidRegistration ? '#047857' : 'var(--navy)',
            background: overview?.hasPaidRegistration 
              ? 'linear-gradient(135deg, rgba(4,120,87,0.1), rgba(4,120,87,0.05))' 
              : 'linear-gradient(135deg, rgba(0,43,107,0.1), rgba(200,150,12,0.05))',
            border: overview?.hasPaidRegistration 
              ? '2px solid rgba(4,120,87,0.25)' 
              : '2px solid rgba(200,150,12,0.25)',
            borderRadius: '16px',
            fontWeight: '600',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {overview?.hasPaidRegistration ? <BadgeCheck size={22} /> : <LockKeyhole size={22} />}
          {notice}
        </div>
      )}
      {error && (
        <div 
          style={{ 
            marginBottom: 24, 
            padding: '18px 22px',
            color: 'var(--err)',
            background: 'linear-gradient(135deg, rgba(185,28,28,0.1), rgba(185,28,28,0.05))',
            border: '2px solid rgba(185,28,28,0.25)',
            borderRadius: '16px',
            fontWeight: '600',
            fontSize: '15px'
          }}
        >
          {error}
        </div>
      )}

      {/* Status Card */}
      <div style={{ 
        background: overview?.hasPaidRegistration 
          ? 'linear-gradient(135deg, rgba(4,120,87,0.08), #fff)' 
          : 'linear-gradient(135deg, rgba(200,150,12,0.08), #fff)',
        padding: '32px',
        borderRadius: '20px',
        border: overview?.hasPaidRegistration 
          ? '2px solid rgba(4,120,87,0.2)' 
          : '2px solid rgba(200,150,12,0.2)',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0,43,107,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: overview?.hasPaidRegistration 
              ? 'rgba(4,120,87,0.15)' 
              : 'rgba(200,150,12,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {overview?.hasPaidRegistration 
              ? <BadgeCheck size={24} color="#047857" />
              : <LockKeyhole size={24} color="#b45309" />
            }
          </div>
          <div>
            <h2 style={{ 
              margin: '0 0 8px', 
              color: overview?.hasPaidRegistration ? '#047857' : '#b45309',
              fontSize: '22px',
              fontWeight: '800'
            }}>
              {overview?.hasPaidRegistration ? 'Registration Complete' : 'Registration Pending'}
            </h2>
            <p style={{ 
              margin: 0,
              color: 'var(--gray)',
              fontSize: '15px'
            }}>
              {overview?.hasPaidRegistration 
                ? 'Your portal access is fully unlocked' 
                : 'Complete payment to unlock full access'}
            </p>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--lgray)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Batch</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)' }}>
              {overview?.batch?.name || (overview?.batch?.year ? `Batch ${overview.batch.year}` : 'Not assigned')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Paid</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--navy)' }}>
              {totalPaid.toLocaleString()} XAF
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              color: overview?.hasPaidRegistration ? '#047857' : '#b45309' 
            }}>
              {overview?.hasPaidRegistration ? 'Active' : 'Pending'}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div style={{ 
        background: '#fff',
        padding: '32px',
        borderRadius: '20px',
        border: '1px solid rgba(0,43,107,0.08)',
        boxShadow: '0 4px 20px rgba(0,43,107,0.08)',
        marginBottom: '32px'
      }}>
        <h2 style={{ margin: '0 0 24px', color: 'var(--navy)', fontSize: '22px', fontWeight: '800' }}>
          Make a Payment
        </h2>
        {!overview?.contributions.length ? (
          <div style={{
            padding: '48px 24px',
            background: 'var(--off)',
            borderRadius: '16px',
            border: '2px dashed var(--lgray)',
            textAlign: 'center',
            color: 'var(--gray)'
          }}>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>No registration fee is currently available. Please check back later.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>
                Select Fee
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={selectedContributionId}
                  onChange={(event) => {
                    setSelectedContributionId(event.target.value);
                    setSelectedInstallmentId('');
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '16px 18px', 
                    border: '2px solid var(--lgray)', 
                    borderRadius: '14px', 
                    fontSize: '16px',
                    background: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--navy)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(0,43,107,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--lgray)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {overview.contributions.map((contribution) => (
                    <option key={contribution.id} value={contribution.id}>{contribution.title} ({contribution.status?.toLowerCase()})</option>
                  ))}
                </select>
                <div style={{
                  position: 'absolute',
                  right: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--gray)',
                  fontSize: '14px'
                }}>▼</div>
              </div>
              {selectedContribution?.description && (
                <p style={{ color: 'var(--gray)', fontSize: '15px', marginTop: '12px', lineHeight: 1.6, padding: '16px', background: 'var(--off)', borderRadius: '12px' }}>
                  {selectedContribution.description}
                </p>
              )}
            </div>

            {!installments.length ? (
              <div style={{
                padding: '20px 24px',
                background: 'rgba(180,83,9,0.08)',
                borderRadius: '14px',
                border: '1px solid rgba(180,83,9,0.2)',
                color: '#b45309',
                fontSize: '15px',
                fontWeight: '600'
              }}>
                Installments have not been configured for this registration fee yet. Please contact an administrator.
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>
                    Select Installment
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={selectedInstallment?.id || ''}
                      onChange={(event) => setSelectedInstallmentId(event.target.value)}
                      disabled={payableInstallments.length === 0 || selectedContribution?.status !== 'ACTIVE'}
                      style={{ 
                        width: '100%', 
                        padding: '16px 18px', 
                        border: '2px solid var(--lgray)', 
                        borderRadius: '14px', 
                        fontSize: '16px',
                        background: '#fff',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        appearance: 'none',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--navy)';
                        e.target.style.boxShadow = '0 0 0 4px rgba(0,43,107,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--lgray)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {payableInstallments.length ? payableInstallments.map((installment) => (
                        <option key={installment.id} value={installment.id}>
                          {installment.label} — {Number(installment.amount).toLocaleString()} XAF
                        </option>
                      )) : <option value="">All installments paid</option>}
                    </select>
                    <div style={{
                      position: 'absolute',
                      right: '18px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: 'var(--gray)',
                      fontSize: '14px'
                    }}>▼</div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>
                    Mobile Money Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="6XXXXXXXX"
                    style={{ 
                      width: '100%', 
                      padding: '16px 18px', 
                      border: '2px solid var(--lgray)', 
                      borderRadius: '14px', 
                      fontSize: '16px',
                      background: '#fff',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--navy)';
                      e.target.style.boxShadow = '0 0 0 4px rgba(0,43,107,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--lgray)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={initiatePayment}
                  disabled={submitting || !selectedInstallment || selectedContribution?.status !== 'ACTIVE'}
                  style={{ 
                    width: '100%', 
                    padding: '18px',
                    fontSize: '17px',
                    fontWeight: '700',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
                    boxShadow: '0 6px 24px rgba(0,43,107,0.3)',
                    transition: 'all 0.2s ease',
                    border: 'none',
                    color: '#fff',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}
                >
                  {submitting ? (
                    <>
                      <svg 
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ animation: 'spin 1s linear infinite' }}
                      >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.3" />
                        <path 
                          d="M12 2C6.48 2 2 6.48 2 12" 
                          stroke="currentColor" 
                          strokeWidth="4" 
                          strokeLinecap="round"
                        />
                      </svg>
                      Starting payment...
                    </>
                  ) : (
                    <>
                      <CreditCard size={22} />
                      {selectedInstallment ? `Pay ${Number(selectedInstallment.amount).toLocaleString()} XAF` : 'No installment due'}
                    </>
                  )}
                </button>
                <p style={{ 
                  color: 'var(--gray)', 
                  fontSize: '14px', 
                  marginTop: '16px',
                  textAlign: 'center',
                  lineHeight: 1.6
                }}>
                  Access unlocks once the payment provider confirms at least one installment.
                </p>
              </>
            )}
          </>
        )}
      </div>

      {/* Payment History */}
      <div style={{ 
        background: '#fff',
        padding: '32px',
        borderRadius: '20px',
        border: '1px solid rgba(0,43,107,0.08)',
        boxShadow: '0 4px 20px rgba(0,43,107,0.08)',
        marginBottom: '32px'
      }}>
        <h2 style={{ margin: '0 0 24px', color: 'var(--navy)', fontSize: '22px', fontWeight: '800' }}>
          Payment History
        </h2>
        {!payments.length ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '48px 24px',
            color: 'var(--gray)',
            background: 'var(--off)',
            borderRadius: '16px',
            border: '2px dashed var(--lgray)'
          }}>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>No registration payments yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid var(--lgray)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ 
                  textAlign: 'left', 
                  borderBottom: '2px solid var(--lgray)',
                  background: 'var(--off)'
                }}>
                  <th style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>Contribution</th>
                  <th style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>Installment</th>
                  <th style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>Amount</th>
                  <th style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>Date</th>
                  <th style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>Status</th>
                </tr>
              </thead>
              <tbody>{payments.map((payment) => (
                <tr key={payment.id} style={{ borderBottom: '1px solid var(--lgray)' }}>
                  <td style={{ padding: '16px 20px', fontSize: '15px', color: 'var(--dark)' }}>{payment.contributionTitle}</td>
                  <td style={{ padding: '16px 20px', fontSize: '15px', color: 'var(--dark)' }}>{payment.installmentLabel || '—'}</td>
                  <td style={{ padding: '16px 20px', fontSize: '15px', fontWeight: '700', color: 'var(--navy)' }}>{Number(payment.amount).toLocaleString()} XAF</td>
                  <td style={{ padding: '16px 20px', fontSize: '15px', color: 'var(--gray)' }}>{formatDate(payment.paymentDate || payment.createdAt)}</td>
                  <td style={{ padding: '16px 20px' }}><span className={`status-badge ${String(payment.status || 'PENDING').toLowerCase()}`}>{String(payment.status || 'PENDING').toLowerCase()}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>

      {/* Batch Members */}
      <div style={{ 
        background: '#fff',
        padding: '32px',
        borderRadius: '20px',
        border: '1px solid rgba(0,43,107,0.08)',
        boxShadow: '0 4px 20px rgba(0,43,107,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '14px', 
            background: 'linear-gradient(135deg, rgba(0,43,107,0.1), rgba(200,150,12,0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={28} color="var(--navy)" />
          </div>
          <div>
            <h2 style={{ margin: 0, color: 'var(--navy)', fontSize: '22px', fontWeight: '800' }}>Your Batch</h2>
            <span style={{ color: 'var(--gray)', fontSize: '14px', fontWeight: '600' }}>{overview?.members.length || 0} members</span>
          </div>
        </div>
        {!overview?.batch && <p style={{ color: 'var(--gray)', fontSize: '15px' }}>Your batch has not been assigned yet.</p>}
        {overview?.batch && !overview.members.length && <p style={{ color: 'var(--gray)', fontSize: '15px' }}>There are no members in this batch yet.</p>}
        {!!overview?.members.length && (
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid var(--lgray)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr style={{ 
                  textAlign: 'left', 
                  borderBottom: '2px solid var(--lgray)',
                  background: 'var(--off)'
                }}>
                  <th style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>Member</th>
                  <th style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>Registration</th>
                  <th style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>Membership badge</th>
                </tr>
              </thead>
              <tbody>{overview.members.map((member) => (
                <tr key={member.id} style={{ borderBottom: '1px solid var(--lgray)' }}>
                  <td style={{ padding: '16px 20px', fontSize: '15px', color: 'var(--dark)', fontWeight: '600' }}>{member.name}</td>
                  <td style={{ padding: '16px 20px' }}><span className={`status-badge ${member.registrationStatus.toLowerCase()}`}>{member.registrationStatus === 'REGISTERED' ? 'Registered' : 'Pending'}</span></td>
                  <td style={{ padding: '16px 20px' }}><span className={`status-badge ${member.membershipBadge.toLowerCase()}`}>{member.membershipBadge}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
