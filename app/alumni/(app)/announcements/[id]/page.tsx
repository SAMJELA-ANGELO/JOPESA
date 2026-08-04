'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import DetailPageLayout from '@/components/alumni/DetailPageLayout';
import { Announcement } from '@/types';
import { apiFetch, formatDate } from '@/lib/api';
import { downloadFile } from '@/lib/download';

export default function AlumniAnnouncementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id || '');
  const [item, setItem] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await apiFetch<Announcement>(`/announcements/${id}`);
        setItem({
          ...payload,
          imageUrl: payload.imageUrl || payload.image,
          createdBy: payload.createdBy || 'Admin',
        });
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unable to load announcement');
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  if (loading) return <div style={{ color: 'var(--gray)' }}>Loading announcement...</div>;

  if (error || !item) {
    return (
      <div>
        <button className="alumni-back-btn" onClick={() => router.push('/alumni/announcements')}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className="alumni-card" style={{ color: 'var(--err)' }}>{error || 'Announcement not found'}</div>
      </div>
    );
  }

  const image = item.imageUrl || item.image;

  return (
    <DetailPageLayout
      backLabel="Back to announcements"
      backHref="/alumni/announcements"
      title={item.title}
      image={image}
      imageAlt={item.title}
      shareTitle={item.title}
      shareText={`JOPESA announcement: ${item.title}`}
      meta={
        <>
          <span className="detail-type-badge">{item.type}</span>
          {item.isPinned && <span className="detail-pinned-badge">Pinned</span>}
          <span>{formatDate(item.createdAt)} · {item.createdBy}</span>
        </>
      }
      description={item.content}
      actions={
        image ? (
          <button
            className="alumni-btn alumni-btn-ghost detail-action-full"
            onClick={() => downloadFile(image, `${item.title}.jpg`)}
          >
            <Download size={15} /> Download image
          </button>
        ) : null
      }
    />
  );
}
