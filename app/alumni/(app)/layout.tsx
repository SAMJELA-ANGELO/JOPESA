'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import AlumniSidebar from '@/components/alumni/AlumniSidebar';
import { AlumniAccessContext } from '@/components/alumni/AlumniAccessContext';
import { apiFetch, getAlumniToken } from '@/lib/api';
import { RegistrationOverview } from '@/types';

export default function AlumniAppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registrationPaid, setRegistrationPaid] = useState(false);
  const [isSystemAdmin, setIsSystemAdmin] = useState(false);
  const [registrationChecked, setRegistrationChecked] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const refreshRegistrationStatus = useCallback(async () => {
    try {
      const overview = await apiFetch<RegistrationOverview>('/contributions/registration/overview', {}, true);
      setRegistrationPaid(overview.hasPaidRegistration);
      setIsSystemAdmin(overview.isSystemAdmin === true);
      setRegistrationError('');
      return overview.hasPaidRegistration;
    } catch (error) {
      setRegistrationError(error instanceof Error ? error.message : 'Unable to verify your registration payment.');
      return false;
    } finally {
      setRegistrationChecked(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.add('alumni-portal');
    return () => document.body.classList.remove('alumni-portal');
  }, []);

  useEffect(() => {
    const token = getAlumniToken();
    if (!token) {
      router.replace('/alumni/login');
      return;
    }
    let mounted = true;
    const timer = window.setTimeout(() => {
      refreshRegistrationStatus().finally(() => {
        if (mounted) setReady(true);
      });
    }, 0);
    return () => {
      mounted = false;
      window.clearTimeout(timer);
    };
  }, [router, refreshRegistrationStatus]);

  useEffect(() => {
    const permittedWhileUnpaid = ['/alumni/dashboard', '/alumni/batch-finder', '/alumni/chapters', '/alumni/registration'];
    const permitted = permittedWhileUnpaid.some((href) => pathname === href || pathname.startsWith(`${href}/`));
    if (registrationChecked && !registrationPaid && !isSystemAdmin && !permitted) {
      router.replace(`/alumni/registration?locked=1${registrationError ? '&verification=failed' : ''}`);
    }
  }, [pathname, registrationChecked, registrationPaid, isSystemAdmin, registrationError, router]);

  useEffect(() => {
    const handleRegistrationStatus = (event: Event) => {
      const paid = (event as CustomEvent<boolean>).detail;
      if (typeof paid === 'boolean') setRegistrationPaid(paid);
    };
    window.addEventListener('jopesa:registration-status', handleRegistrationStatus);
    return () => window.removeEventListener('jopesa:registration-status', handleRegistrationStatus);
  }, []);

  useEffect(() => {
    if (registrationPaid || isSystemAdmin) return;
    const interval = window.setInterval(() => {
      void refreshRegistrationStatus();
    }, 10000);
    const handleFocus = () => void refreshRegistrationStatus();
    window.addEventListener('focus', handleFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [registrationPaid, isSystemAdmin, refreshRegistrationStatus]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSidebarOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!ready) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--off)',
          color: 'var(--navy)',
          fontWeight: 700,
        }}
      >
        Loading alumni portal...
      </div>
    );
  }

  return (
    <AlumniAccessContext.Provider value={{ hasFullAccess: registrationPaid || isSystemAdmin, isSystemAdmin }}>
    <div className="alumni-app" style={{ minHeight: '100vh', display: 'flex', background: 'var(--off)' }}>
      <AlumniSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} registrationPaid={registrationPaid || isSystemAdmin} />

      <div className="alumni-main" style={{ flex: 1, marginLeft: 260, minWidth: 0 }}>
        <header
          className="alumni-topbar"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 12,
            padding: '14px 16px',
            background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
            color: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              color: '#fff',
              borderRadius: 8,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--gold2)', fontSize: 15 }}>JOPESA Alumni</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Member dashboard</div>
          </div>
        </header>

        <main style={{ padding: '24px 28px 40px', maxWidth: 1100 }}>{children}</main>
      </div>
    </div>
    </AlumniAccessContext.Provider>
  );
}
