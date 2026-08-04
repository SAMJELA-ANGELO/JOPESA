'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Event } from '@/types';
import { apiFetch, eventImages, formatDateRange, unwrapList } from '@/lib/api';

export default function AlumniEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await apiFetch(`/events?skip=0&take=100&status=PUBLISHED`);
        const list = unwrapList<Event>(payload).sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
        setEvents(list);
      } catch (err) {
        console.error(err);
        setError('Unable to load events.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="events-page">
      <div className="page-header">
        <div className="page-header-icon">
          <CalendarDays size={32} />
        </div>
        <div>
          <h1 className="page-header-title">Events</h1>
          <p className="page-header-subtitle">
            Browse reunions, gatherings, and alumni programs. Click an event to view details and register
          </p>
        </div>
      </div>

      {loading && (
        <div className="events-loading">
          <div className="loading-spinner" />
          <span>Loading events...</span>
        </div>
      )}
      
      {error && (
        <div className="events-error">
          <CalendarDays size={24} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="events-empty">
          <div className="events-empty-icon">
            <CalendarDays size={48} />
          </div>
          <h3>No published events yet</h3>
          <p>Check back later for upcoming reunions and gatherings.</p>
        </div>
      )}

      <div className="events-list">
        {events.map((event) => {
          const cover = eventImages(event)[0];
          const attendees = event._count?.attendees;
          return (
            <div
              key={event.id}
              className="event-card"
              onClick={() => router.push(`/alumni/events/${event.id}`)}
            >
              <div className="event-card-header">
                {cover ? (
                  <img src={cover} alt={event.title} className="event-card-image" />
                ) : (
                  <div className="event-card-image-placeholder">
                    <CalendarDays size={32} />
                  </div>
                )}
                <div className="event-card-date-badge">
                  <CalendarDays size={12} />
                  <span>{formatDateRange(event.startDate, event.endDate)}</span>
                </div>
              </div>
              <div className="event-card-body">
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-description">
                  {event.description}
                </p>
                <div className="event-card-footer">
                  <div className="event-card-location">
                    <MapPin size={14} />
                    <span>{event.location || 'TBA'}</span>
                  </div>
                  {typeof attendees === 'number' && (
                    <div className="event-card-attendees">
                      <Users size={14} />
                      <span>{attendees}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
