'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@heroui/react';
import AuthCard from '@/components/AuthCard';

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

  return 'Unable to sign in. Please verify your credentials.';
};

export default function AlumniLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

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
      localStorage.setItem('jopesa_alumni_token', data.accessToken);
      localStorage.setItem('jopesa_user', JSON.stringify(data.user));
      router.push('/alumni/dashboard');
    } catch (err) {
      console.error('Alumni login failed:', err);
      setError(err instanceof Error && err.message ? err.message : 'Unable to sign in. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Alumni Login"
      subtitle="Access the JOPESA community with your alumni account."
      submitLabel="Sign In →"
      footerText="New here?"
      footerHref="/alumni/register"
      footerLabel="Create an account"
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <div style={{ marginBottom: '4px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '13px', 
          fontWeight: '700', 
          color: 'var(--navy)', 
          marginBottom: '6px' 
        }}>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your alumni email"
          required
          style={{
            width: '100%',
            padding: '14px 16px',
            border: '2px solid var(--lgray)',
            borderRadius: '12px',
            fontSize: '15px',
            fontFamily: 'inherit',
            color: 'var(--dark)',
            background: '#fff',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--navy)';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,43,107,0.08)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--lgray)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      <div style={{ marginBottom: '4px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '13px', 
          fontWeight: '700', 
          color: 'var(--navy)', 
          marginBottom: '6px' 
        }}>Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              paddingRight: '48px',
              border: '2px solid var(--lgray)',
              borderRadius: '12px',
              fontSize: '15px',
              fontFamily: 'inherit',
              color: 'var(--dark)',
              background: '#fff',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--navy)';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,43,107,0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--lgray)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <Button 
            isIconOnly 
            type="button" 
            variant="tertiary" 
            aria-label={showPassword ? 'Hide password' : 'Show password'} 
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: 'var(--gray)',
              transition: 'color 0.15s'
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}
