'use client';

import { ReactNode, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Link2, Share2, X } from 'lucide-react';

interface DetailPageLayoutProps {
  backLabel: string;
  backHref: string;
  title: string;
  image?: string;
  imageAlt?: string;
  meta?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  extra?: ReactNode;
  shareTitle?: string;
  shareText?: string;
}

export default function DetailPageLayout({
  backLabel,
  backHref,
  title,
  image,
  imageAlt,
  meta,
  description,
  actions,
  extra,
  shareTitle,
  shareText,
}: DetailPageLayoutProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showMobileShare, setShowMobileShare] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const sharePayload = {
    title: shareTitle || title,
    text: shareText || title,
    url: shareUrl,
  };

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share(sharePayload);
      } catch {
        /* user cancelled */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [sharePayload, shareUrl]);

  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${sharePayload.title}\n${shareUrl}`)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(sharePayload.title)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="detail-page">
      <button className="alumni-back-btn" onClick={() => router.push(backHref)}>
        <ArrowLeft size={16} /> {backLabel}
      </button>

      <h1 className="detail-page-title">{title}</h1>

      <div className="detail-page-grid">
        <div className="detail-page-main">
          {description && (
            <div className="detail-card">
              <h2 className="detail-card-label">Description</h2>
              <div className="detail-body">{description}</div>
            </div>
          )}

          {extra}
        </div>

        <aside className="detail-page-aside">
          {meta && (
            <div className="detail-card">
              <h2 className="detail-card-label">Details</h2>
              <div className="detail-meta">{meta}</div>
            </div>
          )}

          {image && (
            <div className="detail-card detail-image-card">
              <h2 className="detail-card-label">Image</h2>
              <div className="detail-image-wrap">
                <img src={image} alt={imageAlt || title} />
              </div>
            </div>
          )}

          {actions && (
            <div className="detail-card detail-actions-card">
              <h2 className="detail-card-label">Actions</h2>
              <div className="detail-actions">{actions}</div>
            </div>
          )}

          <div className="detail-card detail-share-card">
            <h2 className="detail-card-label">Share</h2>
            <p className="detail-share-hint">Share this with fellow alumni</p>
            <div className="detail-share-btns">
              <button type="button" className="detail-share-btn" onClick={handleShare}>
                {copied ? <Check size={16} /> : <Share2 size={16} />}
                {copied ? 'Link copied!' : 'Share'}
              </button>
              <a
                href={whatsappShare}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-share-btn detail-share-wa"
              >
                WhatsApp
              </a>
              <a
                href={twitterShare}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-share-btn detail-share-x"
              >
                X / Twitter
              </a>
              <button
                type="button"
                className="detail-share-btn detail-share-copy"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch { /* noop */ }
                }}
              >
                <Link2 size={16} /> Copy link
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Floating Share Button */}
      <button
        className="mobile-share-fab"
        onClick={() => setShowMobileShare(!showMobileShare)}
        onTouchStart={() => setShowMobileShare(!showMobileShare)}
      >
        <Share2 size={24} />
      </button>

      {/* Mobile Share Overlay */}
      {showMobileShare && (
        <div className="mobile-share-overlay show" onClick={() => setShowMobileShare(false)}>
          <div className="mobile-share-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-share-header">
              <h3>Share</h3>
              <button onClick={() => setShowMobileShare(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="mobile-share-options">
              <button
                className="mobile-share-option"
                onClick={handleShare}
                onTouchStart={handleShare}
              >
                <Share2 size={24} />
                <span>Share</span>
              </button>
              <a
                href={whatsappShare}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-share-option"
              >
                <span style={{ fontSize: 24, fontWeight: 700 }}>W</span>
                <span>WhatsApp</span>
              </a>
              <a
                href={twitterShare}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-share-option"
              >
                <span style={{ fontSize: 24, fontWeight: 700 }}>X</span>
                <span>X / Twitter</span>
              </a>
              <button
                className="mobile-share-option"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                    setShowMobileShare(false);
                  } catch { /* noop */ }
                }}
                onTouchStart={async () => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                    setShowMobileShare(false);
                  } catch { /* noop */ }
                }}
              >
                <Link2 size={24} />
                <span>{copied ? 'Copied!' : 'Copy link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
