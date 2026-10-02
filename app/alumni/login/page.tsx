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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

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
    >
      <div className="fg" style={{ marginBottom: '16px' }}>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your alumni email"
          required
        />
      </div>

      <div className="fg" style={{ marginBottom: '24px' }}>
        <label>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          required
        />
        <Button isIconOnly type="button" variant="tertiary" aria-label={showPassword ? 'Hide password' : 'Show password'} onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>
    </AuthCard>
  );
}
