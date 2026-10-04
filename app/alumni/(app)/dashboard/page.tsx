'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  MapPin,
  Megaphone,
  FileText,
  Images,
  Building2,
  Search,
  Download,
} from 'lucide-react';
import PhotoCarousel, { CarouselSlide } from '@/components/alumni/PhotoCarousel';
import SectionHeader from '@/components/alumni/SectionHeader';
import { Announcement, Document, Event, Branch, Photo } from '@/types';
import { apiFetch, formatDateRange, unwrapList } from '@/lib/api';
import { downloadFile } from '@/lib/download';
import { AlumniAccessContext } from '@/components/alumni/AlumniAccessContext';

const isPastEvent = (event: Event, currentTime: number | null) => {
  if (event.status === 'COMPLETED' || event.status === 'CANCELLED' || event.status === 'past') return true;
  const endDate = new Date(event.endDate || event.startDate);
  if (Number.isNaN(endDate.getTime())) return false;
  endDate.setHours(23, 59, 59, 999);
  return currentTime !== null && endDate.getTime() < currentTime;
};

export default function AlumniDashboardPage() {
  const router = useRouter();
  const { hasFullAccess } = useContext(AlumniAccessContext);
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [welcomeProgress, setWelcomeProgress] = useState(100);

  useEffect(() => {
    const timer = window.setTimeout(() => setCurrentTime(Date.now()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    setWelcomeProgress(100);
    const startTime = Date.now();
    const duration = 3000;
    
    const progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setWelcomeProgress(remaining);
      
      if (elapsed >= duration) {
        clearInterval(progressInterval);
        setWelcomeVisible(false);
      }
    }, 16);
    
    return () => window.clearInterval(progressInterval);
  }, [loading]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [eventsPayload, photosPayload, announcementsPayload, documentsPayload, branchesPayload] =
          await Promise.all([
            apiFetch(`/events?skip=0&take=100&status=PUBLISHED,COMPLETED`),
            apiFetch(`/photos?skip=0&take=100`),
            apiFetch(`/announcements?skip=0&take=20`),
            apiFetch(`/documents?skip=0&take=12`),
            apiFetch(`/branch?skip=0&take=12`),
          ]);

        setEvents(unwrapList<Event>(eventsPayload));
        setPhotos(
          unwrapList<Photo>(photosPayload).map((photo) => ({
            ...photo,
            eventTitle: photo.event?.title || photo.eventTitle,
            uploadedAt: photo.uploadedAt || '',
          })),
        );
        setAnnouncements(
          unwrapList<Announcement>(announcementsPayload).map((item) => ({
            ...item,
            imageUrl: item.imageUrl || item.image,
            createdBy: item.createdBy || 'Admin',
            createdAt: item.createdAt || '',
          })),
        );
        setDocuments(
          unwrapList<Document>(documentsPayload).map((doc) => ({
            ...doc,
            type: (doc.fileType || doc.type || 'OTHER').toLowerCase(),
            uploadedAt: doc.uploadedAt || (doc as Document & { createdAt?: string }).createdAt || '',
            uploadedBy: doc.uploadedBy || doc.category || 'Admin',
          })),
        );
        setBranches(
          unwrapList<Branch>(branchesPayload).map((branch) => ({
            ...branch,
            region: branch.region || (branch as Branch & { description?: string }).description || '',
            memberCount: branch.memberCount || 0,
            createdAt: branch.createdAt || '',
          })),
        );
      } catch (err) {
        console.error(err);
        setError('Unable to load dashboard content. Please try again shortly.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const carouselSlides = useMemo<CarouselSlide[]>(() => {
    return events.map((event) => ({
      id: event.id,
      url: event.image || event.images?.[0] || photos.find((photo) => photo.eventId === event.id)?.url || '',
      title: event.title,
      eventId: event.id,
      status: isPastEvent(event, currentTime) ? 'Past' : 'Upcoming',
      date: formatDateRange(event.startDate, event.endDate),
      location: event.location || 'Location TBA',
    }));
  }, [events, photos, currentTime]);

  const dashboardEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const aPast = isPastEvent(a, currentTime);
      const bPast = isPastEvent(b, currentTime);
      if (aPast !== bPast) return aPast ? 1 : -1;
      const aStart = new Date(a.startDate).getTime();
      const bStart = new Date(b.startDate).getTime();
      return aPast ? bStart - aStart : aStart - bStart;
    });
  }, [events, currentTime]);

  const pinnedOrRecentNews = useMemo(() => {
    return [...announcements]
      .sort((a, b) => Number(!!b.isPinned) - Number(!!a.isPinned))
      .slice(0, 4);
  }, [announcements]);

  const eventCover = (eventId: string) => photos.find((photo) => photo.eventId === eventId)?.url;

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
        <span>Loading your dashboard...</span>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Welcome Banner */}
      {welcomeVisible && (
        <div style={{
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 50%, rgba(200,150,12,0.15) 100%)',
          borderRadius: '20px',
          padding: '32px 36px',
          marginBottom: '32px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,43,107,0.2)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          opacity: welcomeVisible ? 1 : 0,
          transform: welcomeVisible ? 'translateY(0)' : 'translateY(-20px)'
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
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ 
              fontSize: 'clamp(24px, 4vw, 32px)', 
              fontWeight: '800', 
              marginBottom: '8px',
              letterSpacing: '-0.5px'
            }}>
              Welcome to JOPESA Alumni
            </h1>
            <p style={{ 
              fontSize: '15px', 
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '600px',
              lineHeight: 1.6
            }}>
              Your gateway to events, announcements, documents, and connections within the alumni network
            </p>
            <div style={{
              marginTop: '20px',
              height: '4px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${welcomeProgress}%`,
                background: 'var(--gold2)',
                borderRadius: '2px',
                transition: 'width 0.016s linear'
              }} />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ 
          marginBottom: 24, 
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(185,28,28,0.08), rgba(185,28,28,0.04))',
          border: '1px solid rgba(185,28,28,0.2)',
          borderRadius: '14px',
          color: 'var(--err)',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {/* Carousel */}
      <section style={{ marginBottom: '36px' }}>
        <PhotoCarousel slides={carouselSlides} />
      </section>

      {!hasFullAccess && (
        <div style={{
          marginBottom: '32px',
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(200,150,12,0.1), rgba(200,150,12,0.05))',
          border: '2px solid rgba(200,150,12,0.3)',
          borderRadius: '16px',
          color: 'var(--navy)',
          fontWeight: '700',
          fontSize: '15px',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(200,150,12,0.15)'
        }}>
          Pay at least one registration installment to view the rest of your dashboard.
        </div>
      )}
      <div style={!hasFullAccess ? { filter: 'blur(4px)', userSelect: 'none', pointerEvents: 'none' } : undefined}>
      
      {/* Events Section */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              color: 'var(--navy)', 
              margin: 0 
            }}>Events</h2>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--gray)', 
              margin: '4px 0 0' 
            }}>Upcoming and past events from the alumni network</p>
          </div>
          <Link 
            href="/alumni/events"
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'var(--navy)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            View All
          </Link>
        </div>
        {dashboardEvents.length === 0 ? (
          <div style={{
            padding: '48px 24px',
            background: 'var(--off)',
            borderRadius: '16px',
            border: '2px dashed var(--lgray)',
            textAlign: 'center',
            color: 'var(--gray)'
          }}>
            No events yet.
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {dashboardEvents.map((event) => {
              const cover = eventCover(event.id);
              const past = isPastEvent(event, currentTime);
              return (
                <div
                  key={event.id}
                  onClick={() => router.push(`/alumni/events/${event.id}`)}
                  style={{
                    background: '#fff',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,43,107,0.08)',
                    boxShadow: '0 4px 20px rgba(0,43,107,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,43,107,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,43,107,0.08)';
                  }}
                >
                  {cover ? (
                    <img src={cover} alt={event.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  ) : (
                    <div
                      style={{
                        height: 180,
                        background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--gold2)',
                      }}
                    >
                      <CalendarDays size={48} />
                    </div>
                  )}
                  <div style={{ padding: '20px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '999',
                      background: past ? 'rgba(107, 114, 128, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                      color: past ? '#6b7280' : '#047857',
                      fontSize: '12px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {past ? 'Past' : 'Upcoming'}
                    </span>
                    <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '18px', marginBottom: '12', lineHeight: 1.3 }}>
                      {event.title}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--gray)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <CalendarDays size={16} /> {formatDateRange(event.startDate, event.endDate)}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={16} /> {event.location || 'Location TBA'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Announcements Section */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              color: 'var(--navy)', 
              margin: 0 
            }}>Announcements</h2>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--gray)', 
              margin: '4px 0 0' 
            }}>Pinned updates and community news</p>
          </div>
          <Link 
            href="/alumni/announcements"
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'var(--navy)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            View All
          </Link>
        </div>
        {pinnedOrRecentNews.length === 0 ? (
          <div style={{
            padding: '48px 24px',
            background: 'var(--off)',
            borderRadius: '16px',
            border: '2px dashed var(--lgray)',
            textAlign: 'center',
            color: 'var(--gray)'
          }}>
            No announcements yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pinnedOrRecentNews.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/alumni/announcements/${item.id}`)}
                style={{
                  background: '#fff',
                  padding: '20px 24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,43,107,0.08)',
                  boxShadow: '0 2px 12px rgba(0,43,107,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.borderColor = 'var(--navy)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = 'rgba(0,43,107,0.08)';
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(0,43,107,0.1), rgba(200,150,12,0.1))',
                    color: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Megaphone size={24} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6', flexWrap: 'wrap' }}>
                    <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '16px' }}>{item.title}</div>
                    {item.isPinned && (
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: '700', 
                        color: 'var(--gold)', 
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        background: 'rgba(200,150,12,0.15)',
                        borderRadius: '999',
                        letterSpacing: '0.5px'
                      }}>
                        Pinned
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: 'var(--gray)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Documents Section */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              color: 'var(--navy)', 
              margin: 0 
            }}>Documents</h2>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--gray)', 
              margin: '4px 0 0' 
            }}>Downloadable resources for alumni</p>
          </div>
          <Link 
            href="/alumni/documents"
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'var(--navy)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            View All
          </Link>
        </div>
        {documents.length === 0 ? (
          <div style={{
            padding: '48px 24px',
            background: 'var(--off)',
            borderRadius: '16px',
            border: '2px dashed var(--lgray)',
            textAlign: 'center',
            color: 'var(--gray)'
          }}>
            No documents available yet.
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '16px' 
          }}>
            {documents.slice(0, 6).map((doc) => (
              <div 
                key={doc.id} 
                style={{
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,43,107,0.08)',
                  boxShadow: '0 2px 12px rgba(0,43,107,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,43,107,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,43,107,0.06)';
                }}
              >
                <div
                  onClick={() => router.push(`/alumni/documents/${doc.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    marginBottom: '12', 
                    color: 'var(--navy)',
                    padding: '8px 12px',
                    background: 'var(--off)',
                    borderRadius: '10px'
                  }}>
                    <FileText size={18} />
                    <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--gray)', letterSpacing: '0.5px' }}>
                      {doc.type || doc.fileType || 'File'}
                    </span>
                  </div>
                  <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '15px', marginBottom: '6', lineHeight: 1.4 }}>{doc.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--gray)' }}>{doc.category || 'General'}</div>
                </div>
                <button
                  onClick={() => downloadFile(doc.fileUrl, doc.title, doc.fileType || doc.type)}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--lgray)',
                    background: 'var(--off)',
                    color: 'var(--navy)',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--navy)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'var(--navy)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--off)';
                    e.currentTarget.style.color = 'var(--navy)';
                    e.currentTarget.style.borderColor = 'var(--lgray)';
                  }}
                >
                  <Download size={16} /> Download
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Links Section */}
      <section style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '800', 
            color: 'var(--navy)', 
            margin: 0 
          }}>Explore More</h2>
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--gray)', 
            margin: '4px 0 0' 
          }}>Everything the alumni platform offers</p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '16px' 
        }}>
          <Link 
            href="/alumni/gallery" 
            style={{
              textDecoration: 'none',
              display: 'block',
              background: 'linear-gradient(135deg, rgba(0,43,107,0.05), #fff)',
              padding: '28px 24px',
              borderRadius: '18px',
              border: '1px solid rgba(0,43,107,0.1)',
              boxShadow: '0 2px 12px rgba(0,43,107,0.06)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,43,107,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,43,107,0.06)';
            }}
          >
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '14px', 
              background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Images size={28} color="var(--gold2)" />
            </div>
            <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '18px', marginBottom: '8' }}>Photo Gallery</div>
            <div style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.5 }}>
              {photos.length > 0
                ? `${photos.length} photo${photos.length === 1 ? '' : 's'} from admin uploads`
                : 'Browse and download event photos'}
            </div>
          </Link>
          <Link 
            href="/alumni/batch-finder" 
            style={{
              textDecoration: 'none',
              display: 'block',
              background: 'linear-gradient(135deg, rgba(200,150,12,0.05), #fff)',
              padding: '28px 24px',
              borderRadius: '18px',
              border: '1px solid rgba(200,150,12,0.1)',
              boxShadow: '0 2px 12px rgba(200,150,12,0.06)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,150,12,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(200,150,12,0.06)';
            }}
          >
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '14px', 
              background: 'linear-gradient(135deg, var(--gold), var(--gold2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Search size={28} color="var(--navy)" />
            </div>
            <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '18px', marginBottom: '8' }}>Batch Finder</div>
            <div style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.5 }}>
              Discover your batch and graduation year
            </div>
          </Link>
          <Link 
            href="/alumni/chapters" 
            style={{
              textDecoration: 'none',
              display: 'block',
              background: 'linear-gradient(135deg, rgba(4,120,87,0.05), #fff)',
              padding: '28px 24px',
              borderRadius: '18px',
              border: '1px solid rgba(4,120,87,0.1)',
              boxShadow: '0 2px 12px rgba(4,120,87,0.06)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(4,120,87,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(4,120,87,0.06)';
            }}
          >
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '14px', 
              background: 'linear-gradient(135deg, #047857, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Building2 size={28} color="#fff" />
            </div>
            <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '18px', marginBottom: '8' }}>Chapters</div>
            <div style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.5 }}>
              {branches.length > 0
                ? `${branches.length} chapter${branches.length === 1 ? '' : 's'} available`
                : 'Find your regional chapter'}
            </div>
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
