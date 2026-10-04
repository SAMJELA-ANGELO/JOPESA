'use client';

import Link from 'next/link';
import { ReactNode, FormEvent } from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  submitLabel: string;
  footerText: string;
  footerHref: string;
  footerLabel: string;
  error?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  isSubmitting?: boolean;
}

export default function AuthCard({
  title,
  subtitle,
  submitLabel,
  footerText,
  footerHref,
  footerLabel,
  error,
  onSubmit,
  children,
  isSubmitting = false,
}: AuthCardProps) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, var(--off) 0%, #E8E4DC 100%)', 
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(200,150,12,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0,43,107,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="card" style={{ 
        maxWidth: '480px', 
        width: '100%', 
        padding: '40px 32px',
        boxShadow: '0 8px 32px rgba(0,43,107,0.12)',
        border: '1px solid rgba(0,43,107,0.08)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{
            position: 'relative',
            marginBottom: '20px'
          }}>
            <img
              src="/logo.png"
              alt="JOPESA Logo"
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                border: '3px solid var(--gold)', 
                objectFit: 'cover',
                boxShadow: '0 4px 20px rgba(200,150,12,0.3)'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '2px solid rgba(200,150,12,0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          </div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '800', 
            color: 'var(--navy)', 
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>{title}</h1>
          <p style={{ 
            fontSize: '15px', 
            color: 'var(--gray)', 
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: '320px'
          }}>{subtitle}</p>
        </div>

        {error && (
          <div className="msg-box msg-err show" style={{ 
            marginBottom: '20px',
            padding: '14px 16px',
            fontSize: '14px',
            borderRadius: '12px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {children}
          <button 
            type="submit" 
            className="btn btn-navy" 
            disabled={isSubmitting}
            style={{ 
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '700',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
              boxShadow: '0 4px 16px rgba(0,43,107,0.25)',
              transition: 'all 0.2s ease',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting && (
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ animation: 'spin 1s linear infinite' }}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.3" />
                <path 
                  d="M12 2C6.48 2 2 6.48 2 12" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
              </svg>
            )}
            {isSubmitting ? 'Processing...' : submitLabel}
          </button>
        </form>

        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center', 
          fontSize: '14px', 
          color: 'var(--gray)',
          paddingTop: '20px',
          borderTop: '1px solid var(--lgray)'
        }}>
          {footerText}{' '}
          <Link 
            href={footerHref} 
            style={{ 
              color: 'var(--navy)', 
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'color 0.15s'
            }}
          >
            {footerLabel}
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 640px) {
          .card {
            padding: 32px 24px !important;
          }
        }
        
        @media (max-width: 480px) {
          .card {
            padding: 28px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
