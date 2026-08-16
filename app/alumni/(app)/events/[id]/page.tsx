'use client';



import { useEffect, useMemo, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import {

  ArrowLeft,

  CalendarDays,

  Download,

  MapPin,

  Users,

  Video,

  CreditCard,

  X,

} from 'lucide-react';

import DetailPageLayout from '@/components/alumni/DetailPageLayout';

import EventRegistrationModal from '@/components/alumni/EventRegistrationModal';

import { Event, FormField, Photo, Contribution } from '@/types';

import { apiFetch, eventImages, formatDateRange, unwrapList } from '@/lib/api';

import { downloadFile } from '@/lib/download';



export default function AlumniEventDetailPage() {

  const params = useParams();

  const router = useRouter();

  const eventId = String(params.id || '');



  const [event, setEvent] = useState<Event | null>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);

  const [registered, setRegistered] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [showRegister, setShowRegister] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [contributions, setContributions] = useState<Contribution[]>([]);

  const [selectedContributionId, setSelectedContributionId] = useState('');

  const [toast, setToast] = useState('');



  const images = useMemo(() => {

    if (photos.length > 0) return photos.map((photo) => photo.url);

    return event ? eventImages(event) : [];

  }, [event, photos]);



  const formFields = useMemo<FormField[]>(() => {

    if (!event || !Array.isArray(event.registrationForm)) return [];

    return event.registrationForm as FormField[];

  }, [event]);



  const loadEvent = async () => {

    setLoading(true);

    setError('');

    try {

      const [eventPayload, photosPayload, registrationPayload, contributionsPayload] = await Promise.all([

        apiFetch<Event>(`/events/${eventId}`),

        apiFetch(`/photos?skip=0&take=100&eventId=${eventId}`),

        apiFetch<{ registered: boolean }>(`/events/${eventId}/registration/me`, {}, true).catch(() => ({

          registered: false,

        })),

        apiFetch<Contribution[]>(`/contributions?skip=0&take=100`).catch(() => []),

      ]);

      setEvent(eventPayload);

      setPhotos(unwrapList<Photo>(photosPayload));

      setRegistered(!!registrationPayload.registered);

      // Filter contributions for event registration type (backend doesn't support eventId yet)
      const eventContributions = unwrapList<Contribution>(contributionsPayload).filter(
        (c: Contribution) => c.type === 'EVENT_REGISTRATION'
      );
      setContributions(eventContributions);

    } catch (err) {

      console.error(err);

      setError(err instanceof Error ? err.message : 'Unable to load event');

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    if (eventId) loadEvent();

  }, [eventId]);



  useEffect(() => {

    if (!toast) return;

    const timer = window.setTimeout(() => setToast(''), 2800);

    return () => window.clearTimeout(timer);

  }, [toast]);



  if (loading) {

    return <div style={{ color: 'var(--gray)' }}>Loading event...</div>;

  }



  if (error || !event) {

    return (

      <div>

        <button className="alumni-back-btn" onClick={() => router.push('/alumni/events')}>

          <ArrowLeft size={16} /> Back to events

        </button>

        <div className="alumni-card" style={{ color: 'var(--err)' }}>{error || 'Event not found'}</div>

      </div>

    );

  }



  const canRegister =

    event.status === 'PUBLISHED' ||

    event.status === 'upcoming' ||

    !['CANCELLED', 'COMPLETED', 'past'].includes(String(event.status));



  return (

    <>

      <DetailPageLayout

        backLabel="Back to events"

        backHref="/alumni/events"

        title={event.title}

        image={images[0]}

        imageAlt={event.title}

        shareTitle={event.title}

        shareText={`Check out this JOPESA event: ${event.title}`}

        meta={

          <>

            <span><CalendarDays size={15} /> {formatDateRange(event.startDate, event.endDate)}</span>

            <span><MapPin size={15} /> {event.location || 'Location TBA'}</span>

            {typeof event._count?.attendees === 'number' && (

              <span><Users size={15} /> {event._count.attendees} registered</span>

            )}

            {event.isVirtual && event.meetLink && (

              <a href={event.meetLink} target="_blank" rel="noopener noreferrer">

                <Video size={15} /> Join virtual meeting

              </a>

            )}

          </>

        }

        description={event.description}

        actions={
          canRegister ? (
            registered ? (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button className="alumni-btn alumni-btn-success detail-action-full" disabled>
                  You are registered
                </button>
                <button className="alumni-btn alumni-btn-ghost" onClick={() => setShowRegister(true)}>
                  Update registration
                </button>
              </div>
            ) : (
              <button
                className="alumni-btn alumni-btn-primary detail-action-full"
                onClick={() => setShowRegister(true)}
              >
                Register for this event
              </button>
            )
          ) : null
        }

        extra={

          images.length > 1 ? (

            <div className="detail-card">

              <h2 className="detail-card-label">Event gallery</h2>

              <div className="alumni-gallery-grid">

                {images.map((url, index) => (

                  <div key={`${url}-${index}`} className="alumni-gallery-item">

                    <img src={url} alt={`${event.title} ${index + 1}`} />

                    <button

                      className="alumni-download-chip"

                      onClick={() => downloadFile(url, `${event.title}-${index + 1}.jpg`)}

                    >

                      <Download size={13} /> Download

                    </button>

                  </div>

                ))}

              </div>

            </div>

          ) : undefined

        }

      />



      <EventRegistrationModal

        open={showRegister}

        eventId={event.id}

        eventTitle={event.title}

        fields={formFields}

        onClose={() => setShowRegister(false)}

        onSuccess={() => {

          setRegistered(true);

          setToast('Registration submitted successfully.');

          loadEvent();

        }}

        onPaymentClick={() => { setShowRegister(false); setShowPaymentModal(true); }}

        hasPayment={contributions.length > 0}

      />



      {showPaymentModal && contributions.length > 0 && (
        <div className="alumni-modal-backdrop" onClick={() => setShowPaymentModal(false)}>
          <div className="alumni-modal payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="alumni-modal-header">
              <div className="alumni-modal-icon payment-icon">
                <CreditCard size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="alumni-modal-title">Complete Your Registration</div>
                <div className="alumni-modal-sub">{event.title}</div>
              </div>
              <button className="alumni-icon-btn" onClick={() => setShowPaymentModal(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="payment-modal-body">
              <div className="payment-info-box">
                <div className="payment-info-label">Payment Options</div>
                <div className="payment-info-sub">Select your preferred payment plan below</div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>Select Contribution</label>
                <select
                  className="payment-select"
                  value={selectedContributionId}
                  onChange={(e) => setSelectedContributionId(e.target.value)}
                >
                  <option value="">Choose a payment option</option>
                  {contributions.map((contribution) => (
                    <option key={contribution.id} value={contribution.id}>
                      {contribution.title} - {contribution.installments?.reduce((sum, inst) => sum + (inst.amount || 0), 0).toLocaleString()} XAF
                    </option>
                  ))}
                </select>
              </div>

              {selectedContributionId && (() => {
                const selectedContribution = contributions.find(c => c.id === selectedContributionId);
                return (
                  <div className="payment-details">
                    <div className="payment-detail-item">
                      <span className="payment-detail-label">Contribution</span>
                      <span className="payment-detail-value">{selectedContribution?.title}</span>
                    </div>
                    <div className="payment-detail-item">
                      <span className="payment-detail-label">Total Amount</span>
                      <span className="payment-detail-value payment-amount">
                        {selectedContribution?.installments?.reduce((sum, inst) => sum + (inst.amount || 0), 0).toLocaleString()} XAF
                      </span>
                    </div>
                    <div className="payment-detail-item">
                      <span className="payment-detail-label">Installments</span>
                      <span className="payment-detail-value">{selectedContribution?.installments?.length || 0} payment(s)</span>
                    </div>
                  </div>
                );
              })()}

              <div className="payment-note">
                <span style={{ fontSize: 14 }}>💳</span>
                <span>Secure payment powered by Fapshi. You will be redirected to complete your payment.</span>
              </div>
            </div>

            <div className="alumni-form-actions">
              <button type="button" className="alumni-btn alumni-btn-ghost" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </button>
              <button 
                type="button" 
                className="alumni-btn alumni-btn-primary"
                onClick={() => {
                  if (selectedContributionId) {
                    localStorage.setItem('selectedContributionId', selectedContributionId);
                  }
                  window.location.href = `/alumni/contributions`;
                }}
                disabled={!selectedContributionId}
              >
                <CreditCard size={16} style={{ marginRight: 6 }} /> Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="alumni-toast">{toast}</div>}

    </>

  );

}

