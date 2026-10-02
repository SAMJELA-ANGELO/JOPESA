'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Images, CheckSquare, Square, Expand, X } from 'lucide-react';
import { Event, Photo } from '@/types';
import { apiFetch, resolveMediaUrl, unwrapList } from '@/lib/api';
import { downloadFile } from '@/lib/download';

interface GalleryGroup {
  eventId: string;
  eventTitle: string;
  items: Photo[];
}

export default function AlumniGalleryPage() {
  const router = useRouter();
  const [galleryItems, setGalleryItems] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const groupedItems = useMemo<GalleryGroup[]>(() => {
    const map = new Map<string, GalleryGroup>();
    galleryItems.forEach((photo) => {
      const eventId = photo.eventId || photo.event?.id || photo.eventTitle || 'general';
      const eventTitle = photo.event?.title || photo.eventTitle || 'Event gallery';
      const key = `${eventId}-${eventTitle}`;
      if (!map.has(key)) {
        map.set(key, { eventId, eventTitle, items: [] });
      }
      map.get(key)!.items.push(photo);
    });
    return Array.from(map.values());
  }, [galleryItems]);

  useEffect(() => {
    const load = async () => {
      try {
        const [photosPayload, eventsPayload] = await Promise.all([
          apiFetch(`/photos?skip=0&take=200`),
          apiFetch(`/events?skip=0&take=200`),
        ]);

        const uploadedPhotos = unwrapList<Photo>(photosPayload).map((photo) => ({
          ...photo,
          url: resolveMediaUrl(photo.url),
          eventTitle: photo.event?.title || photo.eventTitle || 'Event photo',
        }));

        const eventPhotos = unwrapList<Event>(eventsPayload).flatMap((event) => {
          const urls = Array.from(new Set([
            ...(event.image ? [event.image] : []),
            ...(Array.isArray(event.images) ? event.images : []),
          ].filter(Boolean) as string[]));

          return urls.map((url, index) => ({
            id: `event-${event.id}-${index}`,
            eventId: event.id,
            url: resolveMediaUrl(url),
            uploadedAt: event.startDate || '',
            eventTitle: event.title,
            event: { id: event.id, title: event.title },
          } as Photo));
        });

        setGalleryItems([...eventPhotos, ...uploadedPhotos]);
      } catch (err) {
        console.error(err);
        setError('Unable to load gallery.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  const selectAllPhotos = () => {
    setSelectedPhotos(new Set(galleryItems.map((photo) => photo.id)));
  };

  const deselectAllPhotos = () => {
    setSelectedPhotos(new Set());
  };

  useEffect(() => {
    if (!previewPhoto) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewPhoto]);

  const isVideoPhoto = (photo: Photo) => /\.(mp4|mov|webm|m4v|avi|mkv|ogg|3gp)(?:$|[?#])/i.test(photo.url) || /\/video\//i.test(photo.url);

  const getDownloadName = (photo: Photo) => {
    const title = (photo.event?.title || photo.eventTitle || 'Event media').replace(/[\\/:*?"<>|]/g, '-');
    const extension = photo.url.match(/\.([a-z0-9]{2,5})(?:$|[?#])/i)?.[1] || (isVideoPhoto(photo) ? 'mp4' : 'jpg');
    return `${title}.${extension}`;
  };

  const downloadSelectedPhotos = () => {
    selectedPhotos.forEach((photoId) => {
      const photo = galleryItems.find((p) => p.id === photoId);
      if (photo) {
        downloadFile(photo.url, getDownloadName(photo));
      }
    });
  };

  const downloadAllPhotos = () => {
    galleryItems.forEach((photo) => {
      downloadFile(photo.url, getDownloadName(photo));
    });
  };

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div className="page-header-icon">
          <Images size={32} />
        </div>
        <div>
          <h1 className="page-header-title">Gallery</h1>
          <p className="page-header-subtitle">
            Event images and uploaded event media grouped by event.
          </p>
        </div>
      </div>

      {loading && (
        <div className="gallery-loading">
          <div className="loading-spinner" />
          <span>Loading gallery...</span>
        </div>
      )}
      
      {error && (
        <div className="gallery-error">
          <Images size={24} />
          <span>{error}</span>
        </div>
      )}
      
      {!loading && !error && galleryItems.length === 0 && (
        <div className="gallery-empty">
          <div className="gallery-empty-icon">
            <Images size={48} />
          </div>
          <h3>No photos yet</h3>
          <p>Photos will appear here after admins upload them or add event media.</p>
        </div>
      )}

      {!loading && !error && galleryItems.length > 0 && (
        <>
          <div className="gallery-controls">
            <div className="gallery-selection-info">
              {selectedPhotos.size > 0 && (
                <span className="gallery-selected-count">
                  {selectedPhotos.size} selected
                </span>
              )}
            </div>
            <div className="gallery-actions">
              <button
                onClick={selectAllPhotos}
                className="gallery-action-btn"
                disabled={selectedPhotos.size === galleryItems.length}
              >
                <CheckSquare size={16} /> Select All
              </button>
              <button
                onClick={deselectAllPhotos}
                className="gallery-action-btn"
                disabled={selectedPhotos.size === 0}
              >
                <Square size={16} /> Deselect All
              </button>
              <button
                onClick={downloadSelectedPhotos}
                className="gallery-action-btn gallery-action-btn-primary"
                disabled={selectedPhotos.size === 0}
              >
                <Download size={16} /> Download Selected
              </button>
              <button
                onClick={downloadAllPhotos}
                className="gallery-action-btn gallery-action-btn-primary"
              >
                <Download size={16} /> Download All
              </button>
            </div>
          </div>

          {groupedItems.map((group) => (
            <div key={group.eventId} style={{ marginBottom: 26 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy)', margin: '18px 0 12px' }}>{group.eventTitle}</div>
              <div className="gallery-grid">
                {group.items.map((photo) => {
                  const title = photo.event?.title || photo.eventTitle || 'Event media';
                  const isVideo = isVideoPhoto(photo);
                  const isSelected = selectedPhotos.has(photo.id);

                  return (
                    <div
                      key={photo.id}
                      className={`gallery-item ${isSelected ? 'gallery-item-selected' : ''}`}
                    >
                      <div className="gallery-item-checkbox">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePhotoSelection(photo.id);
                          }}
                          className="gallery-checkbox-btn"
                        >
                          {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                        </button>
                      </div>

                      {isVideo ? (
                        <video src={photo.url} controls playsInline className="gallery-media" />
                      ) : (
                        <img src={photo.url} alt={title} onClick={() => setPreviewPhoto(photo)} className="gallery-media" />
                      )}

                      <div className="gallery-item-info">
                        <div onClick={() => router.push(`/alumni/events/${photo.eventId || photo.event?.id}`)} className="gallery-item-title">
                          {title}
                        </div>
                        <button type="button" onClick={() => setPreviewPhoto(photo)} className="gallery-download-btn">
                          <Expand size={14} /> Preview
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(photo.url, getDownloadName(photo));
                          }}
                          className="gallery-download-btn"
                        >
                          <Download size={14} /> Download
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}

      {previewPhoto && (
        <div className="gallery-preview-backdrop" role="dialog" aria-modal="true" aria-label={`${previewPhoto.eventTitle || 'Event media'} preview`} onClick={() => setPreviewPhoto(null)}>
          <div className="gallery-preview-panel" onClick={(event) => event.stopPropagation()}>
            <div className="gallery-preview-header">
              <div>
                <h2>{previewPhoto.event?.title || previewPhoto.eventTitle || 'Event media'}</h2>
                <button type="button" onClick={() => router.push(`/alumni/events/${previewPhoto.eventId || previewPhoto.event?.id}`)} className="gallery-preview-event-link">View event details</button>
              </div>
              <button type="button" onClick={() => setPreviewPhoto(null)} aria-label="Close preview" className="gallery-preview-close"><X size={20} /></button>
            </div>
            {isVideoPhoto(previewPhoto) ? (
              <video src={previewPhoto.url} controls autoPlay playsInline className="gallery-preview-media" />
            ) : (
              <img src={previewPhoto.url} alt={previewPhoto.event?.title || previewPhoto.eventTitle || 'Event photo'} className="gallery-preview-media" />
            )}
            <div className="gallery-preview-actions">
              <button type="button" onClick={() => downloadFile(previewPhoto.url, getDownloadName(previewPhoto))} className="gallery-action-btn gallery-action-btn-primary">
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
