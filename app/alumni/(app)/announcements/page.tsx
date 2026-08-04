'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Megaphone } from 'lucide-react';
import { Announcement } from '@/types';
import { apiFetch, formatDate, unwrapList } from '@/lib/api';

export default function AlumniAnnouncementsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await apiFetch(`/announcements?skip=0&take=100`);
        const list = unwrapList<Announcement>(payload).map((item) => ({
          ...item,
          imageUrl: item.imageUrl || item.image,
          createdBy: item.createdBy || 'Admin',
        }));
        list.sort((a, b) => Number(!!b.isPinned) - Number(!!a.isPinned));
        setItems(list);
      } catch (err) {
        console.error(err);
        setError('Unable to load announcements.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="announcements-page">
      <div className="page-header">
        <div className="page-header-icon">
          <Megaphone size={32} />
        </div>
        <div>
          <h1 className="page-header-title">Announcements</h1>
          <p className="page-header-subtitle">
            Stay up to date with news, opportunities, and important updates
          </p>
        </div>
      </div>

      {loading && (
        <div className="announcements-loading">
          <div className="loading-spinner" />
          <span>Loading announcements...</span>
        </div>
      )}
      
      {error && (
        <div className="announcements-error">
          <Megaphone size={24} />
          <span>{error}</span>
        </div>
      )}
      
      {!loading && !error && items.length === 0 && (
        <div className="announcements-empty">
          <div className="announcements-empty-icon">
            <Megaphone size={48} />
          </div>
          <h3>No announcements yet</h3>
          <p>Check back later for news and updates from the JOPESA community.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="announcements-list">
          {items.map((item) => (
            <div
              key={item.id}
              className="announcement-card"
              onClick={() => router.push(`/alumni/announcements/${item.id}`)}
            >
              {(item.imageUrl || item.image) ? (
                <img
                  src={item.imageUrl || item.image}
                  alt={item.title}
                  className="announcement-card-image"
                />
              ) : (
                <div className="announcement-card-image-placeholder">
                  <Megaphone size={28} />
                </div>
              )}
              <div className="announcement-card-content">
                <div className="announcement-card-header">
                  <h3 className="announcement-card-title">{item.title}</h3>
                  {item.isPinned && (
                    <span className="announcement-card-pinned">Pinned</span>
                  )}
                </div>
                <div className="announcement-card-meta">
                  {item.type} · {formatDate(item.createdAt)}
                </div>
                <p className="announcement-card-excerpt">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
