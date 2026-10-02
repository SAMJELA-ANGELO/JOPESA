'use client';

import { useEffect, useState } from 'react';
import { Shield, Lock, Mail, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const getApiErrorMessage = (payload: any): string => {
  if (Array.isArray(payload?.message)) {
    return payload.message.flat(Infinity).filter(Boolean).join(' ');
  }

  if (typeof payload?.message === 'string' && payload.message.trim()) {
    return payload.message;
  }

  if (typeof payload?.error === 'string' && payload.error.trim()) {
    return payload.error;
  }

  return 'Invalid credentials or backend unavailable';
};

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('jopesa_admin_token')) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(getApiErrorMessage(payload));
      }

      const data = await response.json();
      localStorage.setItem('jopesa_admin_token', data.accessToken);
      router.replace('/admin/dashboard');
    } catch (err) {
      console.error('Admin login failed:', err);
      setError(err instanceof Error && err.message ? err.message : 'Invalid credentials or backend unavailable');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--off)', padding: '20px' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '32px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <img 
            src="/logo.png" 
            alt="JOPESA Logo" 
            style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--gold)', objectFit: 'cover', marginBottom: '16px' }}
          />
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--navy)', marginBottom: '4px' }}>Admin Login</h1>
          <p style={{ fontSize: '14px', color: 'var(--gray)', textAlign: 'center' }}>JOPESA Connect Administration</p>
        </div>

        {error && (
          <div className="msg-box msg-err show" style={{ marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="fg" style={{ marginBottom: '16px' }}>
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                style={{ paddingLeft: '42px' }}
                required
              />
            </div>
          </div>

          <div className="fg" style={{ marginBottom: '24px' }}>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: '42px', paddingRight: '42px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray)', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-navy" disabled={isLoggingIn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {isLoggingIn ? <><LoaderCircle size={16} className="loading-spinner" /> Signing in...</> : <>Sign In →</>}
          </button>
        </form>
      </div>
    </div>
  );
}
