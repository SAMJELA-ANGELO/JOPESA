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

  useEffect(() => {
    const timer = window.setTimeout(() => setCurrentTime(Date.now()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const timer = window.setTimeout(() => setWelcomeVisible(false), 3000);
    return () => window.clearTimeout(timer);
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
      <div className="dashboard-loading">
        <div className="loading-spinner" />
        <span>Loading your dashboard...</span>
      </div>
    );
  }

  return (
    <div className="animate-float-in">
      {welcomeVisible && (
        <div className="page-header page-header-dashboard welcome-temporary">
          <div className="page-header-icon">
            <CalendarDays size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 className="page-header-title">Welcome back</h1>
            <p className="page-header-subtitle">
              Explore events, announcements, documents, and more from the JOPESA alumni network
            </p>
            <div className="welcome-timeout-track" aria-label="Welcome message disappears in three seconds">
              <div className="welcome-timeout-progress" />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alumni-card animate-float-in" style={{ marginBottom: 16, color: 'var(--err)' }}>
          {error}
        </div>
      )}

      <section style={{ marginBottom: 28 }} className="animate-float-in animate-delay-1">
        <PhotoCarousel slides={carouselSlides} />
      </section>

      {!hasFullAccess && (
        <div className="dashboard-locked-notice">
          Pay at least one registration installment to view the rest of your dashboard.
        </div>
      )}
      <div className={!hasFullAccess ? 'dashboard-locked-content' : undefined}>
      <section style={{ marginBottom: 28 }} className="animate-float-in animate-delay-2">
        <SectionHeader
          title="Events"
          subtitle="Upcoming and past events from the alumni network"
          href="/alumni/events"
        />
        {dashboardEvents.length === 0 ? (
          <div className="alumni-card">No events yet.</div>
        ) : (
          <div className="alumni-grid-2">
            {dashboardEvents.map((event, index) => {
              const cover = eventCover(event.id);
              const past = isPastEvent(event, currentTime);
              return (
                <div
                  key={event.id}
                  className={`alumni-card clickable animate-float-in animate-delay-${Math.min(index + 3, 5)}`}
                  onClick={() => router.push(`/alumni/events/${event.id}`)}
                  style={{ padding: 0, overflow: 'hidden' }}
                >
                  {cover ? (
                    <img src={cover} alt={event.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                  ) : (
                    <div
                      style={{
                        height: 140,
                        background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--gold2)',
                      }}
                    >
                      <CalendarDays size={32} />
                    </div>
                  )}
                  <div style={{ padding: 16 }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 9px',
                      borderRadius: 999,
                      background: past ? 'rgba(107, 114, 128, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                      color: past ? '#6b7280' : '#047857',
                      fontSize: 11,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}>
                      {past ? 'Past' : 'Upcoming'}
                    </span>
                    <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: 16, marginBottom: 8 }}>
                      {event.title}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--gray)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <CalendarDays size={14} /> {formatDateRange(event.startDate, event.endDate)}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={14} /> {event.location || 'Location TBA'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section style={{ marginBottom: 28 }} className="animate-float-in animate-delay-3">
        <SectionHeader title="Announcements" subtitle="Pinned updates and community news" href="/alumni/announcements" />
        {pinnedOrRecentNews.length === 0 ? (
          <div className="alumni-card">No announcements yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pinnedOrRecentNews.map((item, index) => (
              <div
                key={item.id}
                className={`alumni-card clickable animate-float-in animate-delay-${Math.min(index + 4, 5)}`}
                onClick={() => router.push(`/alumni/announcements/${item.id}`)}
                style={{ display: 'flex', gap: 14, alignItems: 'center' }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: 'rgba(0,43,107,0.08)',
                    color: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Megaphone size={18} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{item.title}</div>
                    {item.isPinned && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase' }}>
                        Pinned
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
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

      <section style={{ marginBottom: 28 }} className="animate-float-in animate-delay-4">
        <SectionHeader title="Documents" subtitle="Downloadable resources for alumni" href="/alumni/documents" />
        {documents.length === 0 ? (
          <div className="alumni-card">No documents available yet.</div>
        ) : (
          <div className="alumni-grid-3">
            {documents.slice(0, 6).map((doc, index) => (
              <div 
                key={doc.id} 
                className={`alumni-card animate-float-in animate-delay-${Math.min(index + 5, 5)}`}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <div
                  className="clickable"
                  onClick={() => router.push(`/alumni/documents/${doc.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--navy)' }}>
                    <FileText size={16} />
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray)' }}>
                      {doc.type || doc.fileType || 'File'}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{doc.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray)' }}>{doc.category || 'General'}</div>
                </div>
                <button
                  onClick={() => downloadFile(doc.fileUrl, doc.title, doc.fileType || doc.type)}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid var(--lgray)',
                    background: 'var(--off)',
                    color: 'var(--navy)',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  <Download size={14} /> Download
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginBottom: 12 }} className="animate-float-in animate-delay-5">
        <SectionHeader title="Explore more" subtitle="Everything the alumni platform offers" />
        <div className="alumni-grid-3">
          <Link href="/alumni/gallery" className="alumni-card clickable animate-float-in animate-delay-1" style={{ textDecoration: 'none', display: 'block' }}>
            <Images size={22} color="var(--navy)" />
            <div style={{ fontWeight: 800, color: 'var(--navy)', marginTop: 10 }}>Photo Gallery</div>
            <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 4 }}>
              {photos.length > 0
                ? `${photos.length} photo${photos.length === 1 ? '' : 's'} from admin uploads`
                : 'Browse and download event photos'}
            </div>
          </Link>
          <Link href="/alumni/batch-finder" className="alumni-card clickable animate-float-in animate-delay-2" style={{ textDecoration: 'none', display: 'block' }}>
            <Search size={22} color="var(--navy)" />
            <div style={{ fontWeight: 800, color: 'var(--navy)', marginTop: 10 }}>Batch Finder</div>
            <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 4 }}>
              Discover your batch and graduation year
            </div>
          </Link>
          <Link href="/alumni/chapters" className="alumni-card clickable animate-float-in animate-delay-3" style={{ textDecoration: 'none', display: 'block' }}>
            <Building2 size={22} color="var(--navy)" />
            <div style={{ fontWeight: 800, color: 'var(--navy)', marginTop: 10 }}>Chapters</div>
            <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 4 }}>
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
