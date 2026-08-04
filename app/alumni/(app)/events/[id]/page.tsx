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

} from 'lucide-react';

import DetailPageLayout from '@/components/alumni/DetailPageLayout';

import EventRegistrationModal from '@/components/alumni/EventRegistrationModal';

import { Event, FormField, Photo } from '@/types';

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

      const [eventPayload, photosPayload, registrationPayload] = await Promise.all([

        apiFetch<Event>(`/events/${eventId}`),

        apiFetch(`/photos?skip=0&take=100&eventId=${eventId}`),

        apiFetch<{ registered: boolean }>(`/events/${eventId}/registration/me`, {}, true).catch(() => ({

          registered: false,

        })),

      ]);

      setEvent(eventPayload);

      setPhotos(unwrapList<Photo>(photosPayload));

      setRegistered(!!registrationPayload.registered);

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

      />



      {toast && <div className="alumni-toast">{toast}</div>}

    </>

  );

}

