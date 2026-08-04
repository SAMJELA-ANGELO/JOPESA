'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Download, X, ExternalLink } from 'lucide-react';
import { Event, Photo } from '@/types';

interface EventsProps {
  events: Event[];
}

export default function Events({ events }: EventsProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const savedPhotos = localStorage.getItem('jopesa_photos');
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
  }, []);

  const handleDownload = (photoUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `jopesa-event-photo-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="sec active" id="sec-events">
      <div className="pg-title">Events</div>
      <div className="pg-sub">View upcoming and past events.</div>
      {!events.length ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
            <Calendar size={48} style={{ color: 'var(--navy)' }} />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No events yet</div>
          <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Events will be added by the administrator</div>
        </div>
      ) : (
        <div className="events-list">
          {events.map(event => {
            const eventPhotos = photos.filter(p => p.eventId === event.id);
            return (
              <div key={event.id} className="card">
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 5 }}>{event.title}</div>
                <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8 }}>{event.description}</div>
                <div style={{ display: 'flex', gap: 15, fontSize: 12, color: 'var(--gray)', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {event.startDate} - {event.endDate}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {event.location}</span>
                </div>
                <div style={{ marginTop: 10 }}>
                  <span className={`status-badge ${event.status}`}>{event.status}</span>
                </div>
                {event.externalGalleryUrl && (
                  <a
                    href={event.externalGalleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 12,
                      padding: '8px 16px',
                      background: 'var(--navy)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={14} /> View External Gallery
                  </a>
                )}
                {eventPhotos.length > 0 && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--lgray)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--navy)', marginBottom: '12px' }}>Photos ({eventPhotos.length})</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                      {eventPhotos.map((photo, index) => {
                        const isVideo = /\.(mp4|mov|webm|m4v|avi|mkv|ogg|3gp)(\?.*)?$/i.test(photo.url) || photo.url.includes('/video/');
                        return (
                          <div key={photo.id} style={{ position: 'relative' }}>
                            {isVideo ? (
                              <video
                                src={photo.url}
                                controls
                                style={{
                                  width: '100%',
                                  height: '100px',
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  background: '#000'
                                }}
                                onClick={() => setSelectedPhoto(photo.url)}
                              />
                            ) : (
                              <img 
                                src={photo.url} 
                                alt={`Event photo ${index + 1}`} 
                                style={{ 
                                  width: '100%', 
                                  height: '100px', 
                                  objectFit: 'cover', 
                                  borderRadius: '6px',
                                  cursor: 'pointer'
                                }}
                                onClick={() => setSelectedPhoto(photo.url)}
                              />
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDownload(photo.url, index); }}
                              style={{
                                position: 'absolute',
                                bottom: '4px',
                                right: '4px',
                                background: 'rgba(0,0,0,0.7)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px 6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Download size={10} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedPhoto && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.95)', 
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <img 
            src={selectedPhoto} 
            alt="Full size photo" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>
      )}
    </section>
  );
}
