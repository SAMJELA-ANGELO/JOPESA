'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Images, CheckSquare, Square, Expand, X, ChevronLeft, ChevronRight, Maximize2, Play, Pause } from 'lucide-react';
import { Event, Photo } from '@/types';
import { apiFetch, formatDate, resolveMediaUrl, unwrapList } from '@/lib/api';
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
  const [slideshowPlaying, setSlideshowPlaying] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const previewMediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
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

        const events = unwrapList<Event>(eventsPayload);
        const eventDates = new Map(events.map((event) => [event.id, event.startDate]));
        const uploadedPhotos = unwrapList<Photo>(photosPayload).map((photo) => ({
          ...photo,
          url: resolveMediaUrl(photo.url),
          eventTitle: photo.event?.title || photo.eventTitle || 'Event photo',
          eventDate: eventDates.get(photo.eventId) || photo.uploadedAt,
        }));

        const eventPhotos = events.flatMap((event) => {
          const urls = Array.from(new Set([
            ...(event.image ? [event.image] : []),
            ...(Array.isArray(event.images) ? event.images : []),
          ].filter(Boolean) as string[]));

          return urls.map((url, index) => ({
            id: `event-${event.id}-${index}`,
            eventId: event.id,
            url: resolveMediaUrl(url),
            uploadedAt: event.startDate || '',
            eventDate: event.startDate || '',
            eventTitle: event.title,
            event: { id: event.id, title: event.title },
          } as Photo));
        });

        setGalleryItems([...eventPhotos, ...uploadedPhotos].sort((a, b) => {
          const aDate = new Date(a.eventDate || a.uploadedAt).getTime();
          const bDate = new Date(b.eventDate || b.uploadedAt).getTime();
          return (Number.isNaN(bDate) ? 0 : bDate) - (Number.isNaN(aDate) ? 0 : aDate);
        }));
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

  const movePreview = useCallback((direction: number) => {
    if (!galleryItems.length) return;
    const currentIndex = galleryItems.findIndex((photo) => photo.id === previewPhoto?.id);
    const nextIndex = (Math.max(currentIndex, 0) + direction + galleryItems.length) % galleryItems.length;
    setPreviewPhoto(galleryItems[nextIndex]);
  }, [galleryItems, previewPhoto]);

  const [previewAnimating, setPreviewAnimating] = useState(false);

  useEffect(() => {
    if (!previewPhoto) return;
    setPreviewAnimating(true);
    const timer = setTimeout(() => setPreviewAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [previewPhoto]);

  useEffect(() => {
    if (!previewPhoto) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewPhoto(null);
      if (event.key === 'ArrowLeft') movePreview(-1);
      if (event.key === 'ArrowRight') movePreview(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewPhoto, movePreview]);

  useEffect(() => {
    if (!slideshowPlaying || galleryItems.length < 2) return;
    const timer = window.setInterval(() => movePreview(1), 2000);
    return () => window.clearInterval(timer);
  }, [slideshowPlaying, galleryItems.length, movePreview]);

  const isVideoPhoto = (photo: Photo) => /\.(mp4|mov|webm|m4v|avi|mkv|ogg|3gp)(?:$|[?#])/i.test(photo.url) || /\/video\//i.test(photo.url);

  const startSlideshow = () => {
    if (!previewPhoto && galleryItems.length) setPreviewPhoto(galleryItems[0]);
    setSlideshowPlaying(true);
  };

  const toggleFullscreen = async () => {
    const media = previewMediaRef.current;
    if (!media) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (media.requestFullscreen) {
        await media.requestFullscreen();
      } else {
        setError('Fullscreen viewing is not supported by this browser.');
      }
    } catch (fullscreenError) {
      console.error(fullscreenError);
      setError('Unable to open fullscreen viewing.');
    }
  };

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
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%)',
        borderRadius: '20px',
        padding: '36px 32px',
        marginBottom: '32px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,43,107,0.2)'
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
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '18px',
            background: 'rgba(200,150,12,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Images size={36} color="var(--gold2)" />
          </div>
          <div>
            <h1 style={{ 
              fontSize: 'clamp(24px, 4vw, 32px)', 
              fontWeight: '800', 
              marginBottom: '8px',
              letterSpacing: '-0.5px'
            }}>
              Photo Gallery
            </h1>
            <p style={{ 
              fontSize: '15px', 
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '500px',
              lineHeight: 1.6
            }}>
              Browse and download photos from alumni events
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ 
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          color: 'var(--navy)',
          fontWeight: '600'
        }}>
          <div className="loading-spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
          <span>Loading gallery...</span>
        </div>
      )}
      
      {error && (
        <div style={{ 
          padding: '24px 28px',
          background: 'linear-gradient(135deg, rgba(185,28,28,0.08), rgba(185,28,28,0.04))',
          border: '2px solid rgba(185,28,28,0.2)',
          borderRadius: '16px',
          color: 'var(--err)',
          fontWeight: '600',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px'
        }}>
          <Images size={24} />
          <span>{error}</span>
        </div>
      )}
      
      {!loading && !error && galleryItems.length === 0 && (
        <div style={{ 
          padding: '64px 32px',
          background: 'var(--off)',
          borderRadius: '20px',
          border: '2px dashed var(--lgray)',
          textAlign: 'center',
          color: 'var(--gray)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(0,43,107,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Images size={40} color="var(--navy)" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--navy)', marginBottom: '8px' }}>No photos yet</h3>
          <p style={{ fontSize: '15px', marginBottom: 0 }}>Photos will appear here after admins upload them or add event media.</p>
        </div>
      )}

      {!loading && !error && galleryItems.length > 0 && (
        <>
          {/* Controls */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '20px 24px',
            background: '#fff',
            borderRadius: '16px',
            marginBottom: '24px',
            border: '1px solid rgba(0,43,107,0.08)',
            boxShadow: '0 2px 12px rgba(0,43,107,0.06)',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {selectedPhotos.size > 0 && (
                <span style={{
                  background: 'rgba(200,150,12,0.15)',
                  color: 'var(--gold)',
                  padding: '8px 16px',
                  borderRadius: '999',
                  fontSize: '14px',
                  fontWeight: '700'
                }}>
                  {selectedPhotos.size} selected
                </span>
              )}
              <span style={{ fontSize: '15px', color: 'var(--gray)', fontWeight: '600' }}>
                {galleryItems.length} photos
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={selectAllPhotos}
                disabled={selectedPhotos.size === galleryItems.length}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--lgray)',
                  background: '#fff',
                  color: 'var(--navy)',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <CheckSquare size={16} /> Select All
              </button>
              <button
                onClick={deselectAllPhotos}
                disabled={selectedPhotos.size === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--lgray)',
                  background: '#fff',
                  color: 'var(--navy)',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Square size={16} /> Deselect All
              </button>
              <button
                onClick={downloadSelectedPhotos}
                disabled={selectedPhotos.size === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--navy)',
                  background: 'var(--navy)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Download size={16} /> Download Selected
              </button>
              <button
                onClick={downloadAllPhotos}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--navy)',
                  background: 'var(--navy)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Download size={16} /> Download All
              </button>
              <button
                onClick={slideshowPlaying ? () => setSlideshowPlaying(false) : startSlideshow}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--navy)',
                  background: 'var(--navy)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {slideshowPlaying ? <Pause size={16} /> : <Play size={16} />}
                {slideshowPlaying ? 'Stop slideshow' : 'Start slideshow'}
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          {groupedItems.map((group, groupIndex) => (
            <div key={group.eventId} style={{ marginBottom: '40px' }}>
              <div style={{ 
                fontSize: '22px', 
                fontWeight: '800', 
                color: 'var(--navy)', 
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Images size={20} color="var(--gold2)" />
                </div>
                {group.eventTitle}
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
                gap: '20px' 
              }}>
                {group.items.map((photo, index) => {
                  const title = photo.event?.title || photo.eventTitle || 'Event media';
                  const isVideo = isVideoPhoto(photo);
                  const isSelected = selectedPhotos.has(photo.id);

                  return (
                    <div
                      key={photo.id}
                      style={{
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: '#fff',
                        boxShadow: '0 4px 20px rgba(0,43,107,0.1)',
                        border: '2px solid transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        animation: `galleryItemFadeIn 0.4s ease backwards ${Math.min(index * 50, 300)}ms`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,43,107,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,43,107,0.1)';
                      }}
                    >
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          zIndex: 10,
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: 'var(--gold)',
                          border: '2px solid var(--gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(200,150,12,0.3)'
                        }}>
                          <CheckSquare size={18} color="#fff" />
                        </div>
                      )}
                      
                      {!isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePhotoSelection(photo.id);
                          }}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            zIndex: 10,
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.95)',
                            border: '2px solid var(--lgray)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            opacity: 0,
                            transform: 'scale(0.9)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '0';
                            e.currentTarget.style.transform = 'scale(0.9)';
                          }}
                        >
                          <Square size={18} color="var(--navy)" />
                        </button>
                      )}

                      {isVideo ? (
                        <video src={photo.url} controls playsInline style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <img 
                          src={photo.url} 
                          alt={title} 
                          onClick={() => setPreviewPhoto(photo)} 
                          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} 
                        />
                      )}

                      <div style={{ padding: '16px' }}>
                        <div 
                          onClick={() => router.push(`/alumni/events/${photo.eventId || photo.event?.id}`)} 
                          style={{ 
                            fontWeight: '700', 
                            color: 'var(--navy)', 
                            fontSize: '15px', 
                            marginBottom: '8',
                            cursor: 'pointer',
                            lineHeight: 1.3,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {title}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '12' }}>
                          {formatDate(photo.eventDate || photo.uploadedAt)}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            type="button" 
                            onClick={() => setPreviewPhoto(photo)} 
                            style={{
                              flex: 1,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: '1px solid var(--lgray)',
                              background: 'var(--off)',
                              color: 'var(--navy)',
                              fontSize: '13px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <Expand size={14} /> Preview
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadFile(photo.url, getDownloadName(photo));
                            }}
                            style={{
                              flex: 1,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: '1px solid var(--lgray)',
                              background: 'var(--off)',
                              color: 'var(--navy)',
                              fontSize: '13px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <Download size={14} /> Download
                          </button>
                        </div>
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
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(8,16,30,0.95)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.3s ease'
          }}
          role="dialog" 
          aria-modal="true" 
          aria-label={`${previewPhoto.eventTitle || 'Event media'} preview`} 
          onClick={() => { setPreviewPhoto(null); setSlideshowPlaying(false); }}
        >
          <div 
            style={{
              width: 'min(1000px, 100%)',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '20px',
              background: '#fff',
              borderRadius: '20px',
              boxShadow: '0 20px 70px rgba(0,0,0,0.4)',
              animation: 'slideUp 0.3s ease'
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <h2 style={{ margin: 0, color: 'var(--navy)', fontSize: '18px', fontWeight: '800' }}>
                  {previewPhoto.event?.title || previewPhoto.eventTitle || 'Event media'}
                </h2>
                <button 
                  type="button" 
                  onClick={() => router.push(`/alumni/events/${previewPhoto.eventId || previewPhoto.event?.id}`)} 
                  style={{ 
                    padding: '4px 0', 
                    border: 'none', 
                    background: 'none', 
                    color: 'var(--gray)', 
                    font: 'inherit', 
                    fontSize: '13px', 
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  View event details
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8' }}>
                <button 
                  type="button" 
                  onClick={toggleFullscreen} 
                  aria-label="View fullscreen" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    display: 'grid', 
                    placeItems: 'center', 
                    border: '1px solid var(--lgray)', 
                    borderRadius: '10px', 
                    background: '#fff', 
                    color: 'var(--navy)', 
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Maximize2 size={18} />
                </button>
                <button 
                  type="button" 
                  onClick={() => { setPreviewPhoto(null); setSlideshowPlaying(false); }} 
                  aria-label="Close preview" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    display: 'grid', 
                    placeItems: 'center', 
                    border: '1px solid var(--lgray)', 
                    borderRadius: '10px', 
                    background: '#fff', 
                    color: 'var(--navy)', 
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                background: '#050505',
                borderRadius: '14px',
                overflow: 'hidden',
                touchAction: 'pan-y'
              }}
              onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
              onTouchEnd={(event) => {
                if (touchStartX === null) return;
                const distance = event.changedTouches[0].clientX - touchStartX;
                if (Math.abs(distance) > 45) movePreview(distance > 0 ? -1 : 1);
                setTouchStartX(null);
              }}
            >
              <button 
                type="button" 
                onClick={() => movePreview(-1)} 
                aria-label="Previous media" 
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '52px',
                  border: 0,
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  left: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={28} />
              </button>
              {isVideoPhoto(previewPhoto) ? (
                <video 
                  ref={(node) => { previewMediaRef.current = node; }} 
                  src={previewPhoto.url} 
                  controls 
                  autoPlay 
                  playsInline 
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    maxHeight: 'calc(90vh - 180px)', 
                    objectFit: 'contain', 
                    background: '#050505',
                    opacity: previewAnimating ? 0.5 : 1, 
                    transition: 'opacity 0.3s ease' 
                  }}
                />
              ) : (
                <img 
                  ref={(node) => { previewMediaRef.current = node; }} 
                  src={previewPhoto.url} 
                  alt={previewPhoto.event?.title || previewPhoto.eventTitle || 'Event photo'} 
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    maxHeight: 'calc(90vh - 180px)', 
                    objectFit: 'contain', 
                    background: '#050505',
                    opacity: previewAnimating ? 0.5 : 1, 
                    transition: 'opacity 0.3s ease' 
                  }}
                />
              )}
              <button 
                type="button" 
                onClick={() => movePreview(1)} 
                aria-label="Next media" 
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '52px',
                  border: 0,
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  right: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronRight size={28} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
              <span style={{ marginRight: 'auto', color: 'var(--gray)', fontSize: '14px', fontWeight: '600' }}>
                {galleryItems.findIndex((photo) => photo.id === previewPhoto.id) + 1} / {galleryItems.length}
              </span>
              <button 
                type="button" 
                onClick={slideshowPlaying ? () => setSlideshowPlaying(false) : () => setSlideshowPlaying(true)} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--lgray)',
                  background: '#fff',
                  color: 'var(--navy)',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {slideshowPlaying ? <Pause size={16} /> : <Play size={16} />}
                {slideshowPlaying ? 'Pause' : 'Slideshow'}
              </button>
              <button 
                type="button" 
                onClick={() => downloadFile(previewPhoto.url, getDownloadName(previewPhoto))} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--navy)',
                  background: 'var(--navy)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
