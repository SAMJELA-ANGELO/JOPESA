'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Images, CheckSquare, Square, Trash2 } from 'lucide-react';
import { Photo } from '@/types';
import { apiFetch, unwrapList } from '@/lib/api';
import { downloadFile } from '@/lib/download';

export default function AlumniGalleryPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await apiFetch(`/photos?skip=0&take=200`);
        setPhotos(
          unwrapList<Photo>(payload).map((photo) => ({
            ...photo,
            eventTitle: photo.event?.title || photo.eventTitle || 'Event photo',
          })),
        );
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
    setSelectedPhotos(new Set(photos.map((photo) => photo.id)));
  };

  const deselectAllPhotos = () => {
    setSelectedPhotos(new Set());
  };

  const downloadSelectedPhotos = () => {
    selectedPhotos.forEach((photoId) => {
      const photo = photos.find((p) => p.id === photoId);
      if (photo) {
        const title = photo.event?.title || photo.eventTitle || 'Event media';
        const isVideo = /\.(mp4|mov|webm|m4v|avi|mkv|ogg|3gp)(\?.*)?$/i.test(photo.url) || photo.url.includes('/video/');
        const fileExt = isVideo ? 'mp4' : 'jpg';
        downloadFile(photo.url, `${title}.${fileExt}`);
      }
    });
  };

  const downloadAllPhotos = () => {
    photos.forEach((photo) => {
      const title = photo.event?.title || photo.eventTitle || 'Event media';
      const isVideo = /\.(mp4|mov|webm|m4v|avi|mkv|ogg|3gp)(\?.*)?$/i.test(photo.url) || photo.url.includes('/video/');
      const fileExt = isVideo ? 'mp4' : 'jpg';
      downloadFile(photo.url, `${title}.${fileExt}`);
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
            Media uploaded from the admin Photos tab. Click a media item to open its event
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
      
      {!loading && !error && photos.length === 0 && (
        <div className="gallery-empty">
          <div className="gallery-empty-icon">
            <Images size={48} />
          </div>
          <h3>No photos yet</h3>
          <p>Photos will appear here after admins upload them from the Photos section.</p>
        </div>
      )}

      {!loading && !error && photos.length > 0 && (
        <>
          {/* Selection Controls */}
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
                disabled={selectedPhotos.size === photos.length}
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

          <div className="gallery-grid">
            {photos.map((photo) => {
              const title = photo.event?.title || photo.eventTitle || 'Event media';
              const isVideo = /\.(mp4|mov|webm|m4v|avi|mkv|ogg|3gp)(\?.*)?$/i.test(photo.url) || photo.url.includes('/video/');
              const fileExt = isVideo ? 'mp4' : 'jpg';
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
                    <video
                      src={photo.url}
                      controls
                      onClick={() => router.push(`/alumni/events/${photo.eventId}`)}
                      className="gallery-media"
                    />
                  ) : (
                    <img
                      src={photo.url}
                      alt={title}
                      onClick={() => router.push(`/alumni/events/${photo.eventId}`)}
                      className="gallery-media"
                    />
                  )}
                  
                  <div className="gallery-item-info">
                    <div
                      onClick={() => router.push(`/alumni/events/${photo.eventId}`)}
                      className="gallery-item-title"
                    >
                      {title}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadFile(photo.url, `${title}.${fileExt}`);
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
        </>
      )}
    </div>
  );
}
