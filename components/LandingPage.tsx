'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  GraduationCap,
  MapPin,
  Megaphone,
  Users,
  FileText,
  Globe,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Batch Finder',
    desc: 'Discover your graduation batch and year from your entry class.',
    href: '/alumni/batch-finder',
  },
  {
    icon: Users,
    title: 'Alumni Network',
    desc: 'Connect with ex-students across batches and chapters worldwide.',
    href: '/alumni/register',
  },
  {
    icon: CalendarDays,
    title: 'Events & Reunions',
    desc: 'Stay updated on reunions, gatherings, and alumni meetups.',
    href: '/alumni/events',
  },
  {
    icon: Megaphone,
    title: 'Announcements',
    desc: 'News, opportunities, and updates from the JOPESA community.',
    href: '/alumni/announcements',
  },
  {
    icon: FileText,
    title: 'Documents',
    desc: 'Access alumni resources, forms, and shared documents.',
    href: '/alumni/documents',
  },
  {
    icon: Globe,
    title: 'Chapters',
    desc: 'Find and join regional alumni chapters and branches.',
    href: '/alumni/chapters',
  },
];

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-bg" />
        <div className="landing-hero-content">
          <img src="/logo.png" alt="JOPESA" className="landing-logo" />
          <p className="landing-eyebrow">JOPACC Ex-Students Association</p>
          <h1 className="landing-headline">
            Reconnect. <span className="landing-gold">Remember.</span> Rise together.
          </h1>
          <p className="landing-tagline">
            The official alumni platform for John Paul II Comprehensive College, Wum — empowering minds and impacting lives since 2007.
          </p>
          <div className="landing-cta-row animate-float-in" style={{ animationDelay: '120ms' }}>
            <Link href="/alumni/register" className="landing-btn landing-btn-primary">
              Join the network <ArrowRight size={18} />
            </Link>
            <Link href="/alumni/login" className="landing-btn landing-btn-ghost">
              Sign in
            </Link>
          </div>
          <p className="landing-motto">Lux Mundi Et Sal Terrae</p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="landing-stats">
        <div className="landing-stat">
          <span className="landing-stat-num">2007</span>
          <span className="landing-stat-label">Founded</span>
        </div>
        <div className="landing-stat-divider" />
        <div className="landing-stat">
          <span className="landing-stat-num">Wum</span>
          <span className="landing-stat-label">North West, CM</span>
        </div>
        <div className="landing-stat-divider" />
        <div className="landing-stat">
          <span className="landing-stat-num">JOPACC</span>
          <span className="landing-stat-label">Our Alma Mater</span>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section">
        <div className="landing-section-head animate-float-in" style={{ animationDelay: '160ms' }}>
          <Sparkles size={20} className="landing-gold-icon" />
          <h2>Everything you need to stay connected</h2>
          <p>One platform for alumni — events, news, documents, and your batch community.</p>
        </div>
        <div className="landing-features animate-stagger">
          {features.map(({ icon: Icon, title, desc, href }, idx) => (
            <Link
              key={title}
              href={href}
              className={`landing-feature-card animate-float-in`}
              style={{ animationDelay: `${80 + idx * 80}ms` }}
            >
              <div className="landing-feature-icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="landing-feature-link">
                Explore <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="landing-section landing-about">
        <div className="landing-about-card">
          <div className="landing-about-text">
            <h2>About JOPESA Connect</h2>
            <p>
              JOPESA Connect brings together ex-students of John Paul II Comprehensive College. Whether you graduated in the first batch or the latest, this is your home to find classmates, attend reunions, and stay part of the JOPACC family.
            </p>
            <div className="landing-about-meta">
              <span><MapPin size={14} /> Wum, North West Region, Cameroon</span>
              <span><GraduationCap size={14} /> Est. 2007/2008</span>
            </div>
          </div>
          <div className="landing-about-visual">
            <div className="landing-about-badge">Batch 1 → Present</div>
            <p className="landing-about-quote">&ldquo;Empowering minds and Impacting lives&rdquo;</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="landing-cta-banner">
        <h2>Ready to reconnect with your batch?</h2>
        <p>Create your alumni profile in minutes and join the community.</p>
        <Link href="/alumni/register" className="landing-btn landing-btn-gold">
          Get started — it&apos;s free <ArrowRight size={18} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <img src="/logo.png" alt="" className="landing-footer-logo" />
        <p>JOPESA Connect · JOPACC Wum Alumni Platform</p>
        <p className="landing-footer-sub">© {new Date().getFullYear()} JOPACC Ex-Students Association</p>
      </footer>
    </div>
  );
}
