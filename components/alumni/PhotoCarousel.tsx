'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  id: string;
  url: string;
  title: string;
  eventId: string;
  status?: 'Past' | 'Upcoming';
  date?: string;
  location?: string;
}

interface PhotoCarouselProps {
  slides: CarouselSlide[];
}

export default function PhotoCarousel({ slides }: PhotoCarouselProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 300);
      }, 200);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <div
        className="alumni-carousel empty"
        style={{
          height: 280,
          borderRadius: 18,
          background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
        }}
      >
        Events will appear here once available
      </div>
    );
  }

  const activeIndex = index % slides.length;
  const slide = slides[activeIndex];

  return (
    <div
      className="alumni-carousel"
      style={{
        position: 'relative',
        height: 300,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,43,107,0.18)',
        cursor: 'pointer',
      }}
      onClick={() => router.push(`/alumni/events/${slide.eventId}`)}
    >
      {slides.map((item, i) => (
        item.url ? (
          <img
            key={item.id}
            src={item.url}
            alt={item.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: i === activeIndex ? 1 : 0,
              transform: i === activeIndex 
                ? (isAnimating ? 'scale(1.02)' : 'scale(1)') 
                : 'scale(1.1)',
              transition: i === activeIndex 
                ? 'opacity 0.5s ease, transform 2s ease' 
                : 'opacity 0.5s ease, transform 2s ease',
            }}
          />
        ) : (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
              color: 'var(--gold2)',
              opacity: i === activeIndex ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <CalendarDays size={64} />
          </div>
        )
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,43,107,0.78) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 22,
          color: '#fff',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: 999,
            background: slide.status === 'Past' ? 'rgba(107,114,128,0.92)' : 'rgba(4,120,87,0.92)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.4,
            marginBottom: 10,
          }}
        >
          {slide.status || 'Event'}
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            textShadow: '0 2px 12px rgba(0,0,0,0.35)',
            lineHeight: 1.2,
          }}
        >
          {slide.title}
        </div>
        {(slide.date || slide.location) && (
          <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>
            {[slide.date, slide.location].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex((prev) => (prev - 1 + slides.length) % slides.length);
            }}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: 'var(--navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 3,
              transition: 'all 0.2s ease',
            }}
            aria-label="Previous photo"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex((prev) => (prev + 1) % slides.length);
            }}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: 'var(--navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 3,
              transition: 'all 0.2s ease',
            }}
            aria-label="Next photo"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={18} />
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 6,
              zIndex: 3,
            }}
          >
            {slides.map((item, i) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                style={{
                  width: i === activeIndex ? 18 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: 'none',
                  background: i === activeIndex ? 'var(--gold2)' : 'rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
