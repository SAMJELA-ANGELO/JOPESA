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
    return <div className="alumni-card" style={{ padding: 32 }}>Loading registration details...</div>;
  }

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-header-icon"><BadgeCheck size={30} /></div>
        <div>
          <h1 className="page-header-title">Alumni Registration</h1>
          <p className="page-header-subtitle">Pay your registration fee, see your payment history, and follow your batch&apos;s registration progress.</p>
        </div>
      </div>

      {notice && <div className="alumni-card" style={{ marginBottom: 18, color: overview?.hasPaidRegistration ? '#047857' : 'var(--navy)' }}>{notice}</div>}
      {error && <div className="alumni-card" role="alert" style={{ marginBottom: 18, color: 'var(--err)' }}>{error}</div>}

      <div className="alumni-grid-2" style={{ alignItems: 'start', marginBottom: 26 }}>
        <section className="alumni-card" style={{ padding: 22 }}>
          <h2 style={{ margin: '0 0 14px', color: 'var(--navy)' }}>Your registration status</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            {overview?.hasPaidRegistration
              ? <BadgeCheck size={22} color="#047857" />
              : <LockKeyhole size={22} color="#b45309" />}
            <strong style={{ color: overview?.hasPaidRegistration ? '#047857' : '#b45309' }}>
              {overview?.hasPaidRegistration ? 'Registered — portal access unlocked' : 'Registration payment required'}
            </strong>
          </div>
          <div style={{ color: 'var(--gray)', fontSize: 14, marginBottom: 6 }}>
            Batch: <strong style={{ color: 'var(--navy)' }}>{overview?.batch?.name || (overview?.batch?.year ? `Batch ${overview.batch.year}` : 'Not assigned')}</strong>
          </div>
          <div style={{ color: 'var(--gray)', fontSize: 14 }}>Confirmed registration payments: <strong style={{ color: 'var(--navy)' }}>{totalPaid.toLocaleString()} XAF</strong></div>
        </section>

        <section className="alumni-card" style={{ padding: 22 }}>
          <h2 style={{ margin: '0 0 8px', color: 'var(--navy)' }}>Registration fee</h2>
          {!overview?.contributions.length ? (
            <p style={{ color: 'var(--gray)', marginBottom: 0 }}>No registration fee is currently available. Please check back later.</p>
          ) : (
            <>
              <label htmlFor="registration-contribution" style={{ display: 'block', margin: '12px 0 6px', fontSize: 13, fontWeight: 700 }}>Fee</label>
              <select
                id="registration-contribution"
                value={selectedContributionId}
                onChange={(event) => {
                  setSelectedContributionId(event.target.value);
                  setSelectedInstallmentId('');
                }}
                style={{ width: '100%', padding: 11, border: '1px solid var(--lgray)', borderRadius: 8, marginBottom: 12 }}
              >
                {overview.contributions.map((contribution) => (
                  <option key={contribution.id} value={contribution.id}>{contribution.title} ({contribution.status?.toLowerCase()})</option>
                ))}
              </select>
              {selectedContribution?.description && <p style={{ color: 'var(--gray)', fontSize: 13 }}>{selectedContribution.description}</p>}
              {!installments.length ? (
                <p style={{ color: '#b45309', fontSize: 13 }}>Installments have not been configured for this registration fee yet. Please contact an administrator.</p>
              ) : (
                <>
                  <label htmlFor="registration-installment" style={{ display: 'block', margin: '10px 0 6px', fontSize: 13, fontWeight: 700 }}>Installment</label>
                  <select
                    id="registration-installment"
                    value={selectedInstallment?.id || ''}
                    onChange={(event) => setSelectedInstallmentId(event.target.value)}
                    disabled={payableInstallments.length === 0 || selectedContribution?.status !== 'ACTIVE'}
                    style={{ width: '100%', padding: 11, border: '1px solid var(--lgray)', borderRadius: 8, marginBottom: 12 }}
                  >
                    {payableInstallments.length ? payableInstallments.map((installment) => (
                      <option key={installment.id} value={installment.id}>
                        {installment.label} — {Number(installment.amount).toLocaleString()} XAF
                      </option>
                    )) : <option value="">All installments paid</option>}
                  </select>
                  <label htmlFor="registration-phone" style={{ display: 'block', margin: '10px 0 6px', fontSize: 13, fontWeight: 700 }}>Mobile money phone</label>
                  <input
                    id="registration-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="6XXXXXXXX"
                    style={{ width: '100%', padding: 11, border: '1px solid var(--lgray)', borderRadius: 8, marginBottom: 12 }}
                  />
                  <button
                    type="button"
                    className="btn btn-navy"
                    onClick={initiatePayment}
                    disabled={submitting || !selectedInstallment || selectedContribution?.status !== 'ACTIVE'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {submitting ? <RefreshCw size={16} /> : <CreditCard size={16} />}
                    {submitting ? 'Starting payment...' : selectedInstallment ? `Pay ${Number(selectedInstallment.amount).toLocaleString()} XAF` : 'No installment due'}
                  </button>
                  <p style={{ color: 'var(--gray)', fontSize: 12, marginBottom: 0, marginTop: 10 }}>
                    Access unlocks once the payment provider confirms at least one installment.
                  </p>
                </>
              )}
            </>
          )}
        </section>
      </div>

      <section className="alumni-card" style={{ padding: 22, marginBottom: 26 }}>
        <h2 style={{ margin: '0 0 14px', color: 'var(--navy)' }}>Payment history</h2>
        {!payments.length ? <p style={{ color: 'var(--gray)', marginBottom: 0 }}>No registration payments yet.</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead><tr style={{ textAlign: 'left', borderBottom: '2px solid var(--lgray)' }}>
                <th style={{ padding: 10 }}>Contribution</th><th style={{ padding: 10 }}>Installment</th><th style={{ padding: 10 }}>Amount</th><th style={{ padding: 10 }}>Date</th><th style={{ padding: 10 }}>Status</th>
              </tr></thead>
              <tbody>{payments.map((payment) => (
                <tr key={payment.id} style={{ borderBottom: '1px solid var(--lgray)' }}>
                  <td style={{ padding: 10 }}>{payment.contributionTitle}</td>
                  <td style={{ padding: 10 }}>{payment.installmentLabel || '—'}</td>
                  <td style={{ padding: 10 }}>{Number(payment.amount).toLocaleString()} XAF</td>
                  <td style={{ padding: 10 }}>{formatDate(payment.paymentDate || payment.createdAt)}</td>
                  <td style={{ padding: 10 }}><span className={`status-badge ${String(payment.status || 'PENDING').toLowerCase()}`}>{String(payment.status || 'PENDING').toLowerCase()}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>

      <section className="alumni-card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
          <Users size={20} color="var(--navy)" />
          <h2 style={{ margin: 0, color: 'var(--navy)' }}>Your batch</h2>
          <span style={{ color: 'var(--gray)', fontSize: 13 }}>{overview?.members.length || 0} members</span>
        </div>
        {!overview?.batch && <p style={{ color: 'var(--gray)' }}>Your batch has not been assigned yet.</p>}
        {overview?.batch && !overview.members.length && <p style={{ color: 'var(--gray)' }}>There are no members in this batch yet.</p>}
        {!!overview?.members.length && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
              <thead><tr style={{ textAlign: 'left', borderBottom: '2px solid var(--lgray)' }}>
                <th style={{ padding: 10 }}>Member</th><th style={{ padding: 10 }}>Registration</th><th style={{ padding: 10 }}>Membership badge</th>
              </tr></thead>
              <tbody>{overview.members.map((member) => (
                <tr key={member.id} style={{ borderBottom: '1px solid var(--lgray)' }}>
                  <td style={{ padding: 10 }}>{member.name}</td>
                  <td style={{ padding: 10 }}><span className={`status-badge ${member.registrationStatus.toLowerCase()}`}>{member.registrationStatus === 'REGISTERED' ? 'Registered' : 'Pending'}</span></td>
                  <td style={{ padding: 10 }}><span className={`status-badge ${member.membershipBadge.toLowerCase()}`}>{member.membershipBadge}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
