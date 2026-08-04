'use client';

import { useEffect, useMemo, useState } from 'react';
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

export default function AlumniDashboardPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [eventsPayload, photosPayload, announcementsPayload, documentsPayload, branchesPayload] =
          await Promise.all([
            apiFetch(`/events?skip=0&take=50&status=PUBLISHED`),
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
    return photos.slice(0, 12).map((photo) => ({
      id: photo.id,
      url: photo.url,
      title: photo.event?.title || photo.eventTitle || 'Event photo',
      eventId: photo.eventId,
    }));
  }, [photos]);

  const upcomingEvents = useMemo(() => {
    const now = Date.now();
    return [...events]
      .filter((event) => {
        const start = new Date(event.startDate).getTime();
        return !Number.isNaN(start) ? start >= now : event.status !== 'COMPLETED' && event.status !== 'past';
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 4);
  }, [events]);

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
      <div className="page-header page-header-dashboard">
        <div className="page-header-icon">
          <CalendarDays size={32} />
        </div>
        <div>
          <h1 className="page-header-title">Welcome back</h1>
          <p className="page-header-subtitle">
            Explore events, announcements, documents, and more from the JOPESA alumni network
          </p>
        </div>
      </div>

      {error && (
        <div className="alumni-card animate-float-in" style={{ marginBottom: 16, color: 'var(--err)' }}>
          {error}
        </div>
      )}

      <section style={{ marginBottom: 28 }} className="animate-float-in animate-delay-1">
        <PhotoCarousel slides={carouselSlides} />
      </section>

      <section style={{ marginBottom: 28 }} className="animate-float-in animate-delay-2">
        <SectionHeader
          title="Upcoming events"
          subtitle="Register and stay connected with campus reunions"
          href="/alumni/events"
        />
        {upcomingEvents.length === 0 ? (
          <div className="alumni-card">No upcoming events right now. Check back soon.</div>
        ) : (
          <div className="alumni-grid-2">
            {upcomingEvents.map((event, index) => {
              const cover = eventCover(event.id);
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
                  onClick={() => downloadFile(doc.fileUrl, doc.title)}
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
  );
}
