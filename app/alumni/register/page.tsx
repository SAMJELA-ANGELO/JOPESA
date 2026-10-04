'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
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

  return 'Registration failed. Please try again.';
};

export default function AlumniRegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [batchId, setBatchId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [batchOptions, setBatchOptions] = useState<Array<{ id: string; name?: string; year?: number }>>([]);
  const [branchOptions, setBranchOptions] = useState<Array<{ id: string; name?: string }>>([]);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [batchResponse, branchResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/batch?skip=0&take=100`),
          fetch(`${apiBaseUrl}/branch?skip=0&take=100`),
        ]);

        if (batchResponse.ok) {
          const batchPayload = await batchResponse.json();
          const batchData = Array.isArray(batchPayload?.data) ? batchPayload.data : Array.isArray(batchPayload) ? batchPayload : [];
          setBatchOptions(batchData);
          if (batchData[0]?.id) {
            setBatchId(batchData[0].id);
          }
        }

        if (branchResponse.ok) {
          const branchPayload = await branchResponse.json();
          const branchData = Array.isArray(branchPayload?.data) ? branchPayload.data : Array.isArray(branchPayload) ? branchPayload : [];
          setBranchOptions(branchData);
          if (branchData[0]?.id) {
            setBranchId(branchData[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load batch and branch options:', err);
      }
    };

    loadOptions();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/alumni`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, phone, batchId, branchId }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(getApiErrorMessage(payload));
      }

      await response.json();

      const loginResponse = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        router.push('/alumni/login');
        return;
      }

      const loginData = await loginResponse.json();
      localStorage.setItem('jopesa_alumni_token', loginData.accessToken);
      localStorage.setItem('jopesa_user', JSON.stringify(loginData.user));
      router.push('/alumni/dashboard');
    } catch (err) {
      console.error('Alumni registration failed:', err);
      setError(err instanceof Error && err.message ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Create Alumni Account"
      subtitle="Join the JOPESA network and access alumni resources."
      submitLabel="Create Account →"
      footerText="Already have an account?"
      footerHref="/alumni/login"
      footerLabel="Sign in"
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
        }}>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="Enter your first name"
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
        }}>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Enter your last name"
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
        }}>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
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
        }}>Phone Number <span style={{ color: 'var(--gray)', fontWeight: '400' }}>(Optional)</span></label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Optional phone number"
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
        }}>Batch</label>
        <div style={{ position: 'relative' }}>
          <select 
            aria-label="Batch" 
            value={batchId} 
            onChange={(event) => setBatchId(event.target.value)} 
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
              transition: 'border-color 0.2s, box-shadow 0.2s',
              appearance: 'none',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--navy)';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,43,107,0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--lgray)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="" disabled>Select a batch</option>
            {batchOptions.map((batch) => (
              <option key={batch.id} value={batch.id}>{batch.name || `Batch ${batch.year ?? ''}`}</option>
            ))}
          </select>
          <div style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--gray)',
            fontSize: '12px'
          }}>▼</div>
        </div>
      </div>

      <div style={{ marginBottom: '4px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '13px', 
          fontWeight: '700', 
          color: 'var(--navy)', 
          marginBottom: '6px' 
        }}>Branch</label>
        <div style={{ position: 'relative' }}>
          <select 
            aria-label="Branch" 
            value={branchId} 
            onChange={(event) => setBranchId(event.target.value)} 
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
              transition: 'border-color 0.2s, box-shadow 0.2s',
              appearance: 'none',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--navy)';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,43,107,0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--lgray)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="" disabled>Select a branch</option>
            {branchOptions.map((branch) => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
          <div style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--gray)',
            fontSize: '12px'
          }}>▼</div>
        </div>
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
            placeholder="Create a password"
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
