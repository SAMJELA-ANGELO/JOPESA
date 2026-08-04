'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SplashScreen from '@/components/SplashScreen';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen />}
      <header className="landing-header">
        <div className="landing-header-inner">
          <Link href="/" className="landing-header-brand">
            <img src="/logo.png" alt="JOPESA" />
            <span>JOPESA Connect</span>
          </Link>
          <nav className="landing-header-nav">
            <Link href="/alumni/login">Sign in</Link>
            <Link href="/alumni/register" className="landing-header-cta">
              Join now
            </Link>
          </nav>
        </div>
      </header>
      <main className="landing-main">
        <LandingPage />
      </main>
    </>
  );
}
