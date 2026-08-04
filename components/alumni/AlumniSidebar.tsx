'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Megaphone,
  FileText,
  Images,
  Search,
  Building2,
  LogOut,
  X,
  UserRound,
} from 'lucide-react';
import { clearAlumniSession, getAlumniUser } from '@/lib/api';

const NAV_ITEMS = [
  { href: '/alumni/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/alumni/events', label: 'Events', icon: CalendarDays },
  { href: '/alumni/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/alumni/documents', label: 'Documents', icon: FileText },
  { href: '/alumni/gallery', label: 'Gallery', icon: Images },
  { href: '/alumni/batch-finder', label: 'Batch Finder', icon: Search },
  { href: '/alumni/chapters', label: 'Chapters', icon: Building2 },
  { href: '/alumni/profile', label: 'My Profile', icon: UserRound },
];

interface AlumniSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AlumniSidebar({ open, onClose }: AlumniSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getAlumniUser<{ firstName?: string; lastName?: string; email?: string }>();

  const handleLogout = () => {
    clearAlumniSession();
    router.push('/alumni/login');
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="alumni-sidebar-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 199,
          }}
        />
      )}

      <aside
        className={`alumni-sidebar ${open ? 'open' : ''}`}
        style={{
          width: 260,
          background: 'linear-gradient(180deg, var(--navy), var(--navy2))',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 14px',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 200,
          boxShadow: '4px 0 24px rgba(0,43,107,0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 28, padding: '0 6px' }}>
          <img 
            src="/logo.png" 
            alt="JOPESA Logo" 
            style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--gold)', objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--gold2)', letterSpacing: '0.8px', margin: 0 }}>JOPESA</h1>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Alumni Portal</div>
          </div>
          <button
            onClick={onClose}
            className="alumni-sidebar-close"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
            {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Alumni Member'}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email || 'Welcome back'}
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  background: active ? 'rgba(200,150,12,0.2)' : 'transparent',
                  color: active ? 'var(--gold2)' : 'rgba(255,255,255,0.65)',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            borderRadius: 10,
            border: 'none',
            background: 'transparent',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
}
