'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Briefcase, Building2, CalendarDays, GraduationCap, Link2, Mail, MapPin, Phone, Shield, UserRound } from 'lucide-react';
import DetailPageLayout from '@/components/alumni/DetailPageLayout';
import { apiFetch } from '@/lib/api';

interface PublicMemberProfile {
  id: string;
  bio?: string | null;
  profileImage?: string | null;
  coverImage?: string | null;
  currentRole?: string | null;
  currentCompany?: string | null;
  location?: string | null;
  linkedIn?: string | null;
  website?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  membershipBadge?: 'ACTIVE' | 'PASSIVE' | 'INACTIVE' | 'DORMANT' | null;
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    role?: string | null;
    fullName?: string | null;
    contributionPayments?: Array<Record<string, unknown>>;
  };
  batch?: { id: string; name?: string | null; year?: number | null } | null;
  branch?: { id: string; name?: string | null; code?: string | null } | null;
}

export default function AlumniDirectoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id || '');
  const [member, setMember] = useState<PublicMemberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Alumni profile not found');
      return;
    }

    const loadMember = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await apiFetch<PublicMemberProfile>(`/alumni/members/${id}`);
        setMember(result);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unable to load alumni profile');
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [id]);

  if (loading) {
    return <div style={{ color: 'var(--gray)' }}>Loading alumni profile...</div>;
  }

  if (error || !member) {
    return (
      <div>
        <button className="alumni-back-btn" onClick={() => router.push('/alumni/directory')}>
          <ArrowLeft size={16} /> Back to directory
        </button>
        <div className="alumni-card" style={{ color: 'var(--err)' }}>{error || 'Alumni profile not found'}</div>
      </div>
    );
  }

  const displayName = member.user?.fullName || `${member.user?.firstName || ''} ${member.user?.lastName || ''}`.trim() || 'Alumni Member';
  const socialLinks = [
    { label: 'LinkedIn', href: member.linkedIn },
    { label: 'Website', href: member.website },
    { label: 'X / Twitter', href: member.twitter },
    { label: 'Instagram', href: member.instagram },
  ].filter((item) => !!item.href);

  return (
    <DetailPageLayout
      backLabel="Back to directory"
      backHref="/alumni/directory"
      title={displayName}
      image={member.profileImage || undefined}
      imageAlt={displayName}
      meta={
        <>
          {member.membershipBadge && (
            <div className="detail-meta-row">
              <Shield size={14} />
              <span>{member.membershipBadge} member</span>
            </div>
          )}
          {member.user?.email && (
            <div className="detail-meta-row">
              <Mail size={14} />
              <span>{member.user.email}</span>
            </div>
          )}
          {member.user?.phone && (
            <div className="detail-meta-row">
              <Phone size={14} />
              <span>{member.user.phone}</span>
            </div>
          )}
          {member.batch?.name && (
            <div className="detail-meta-row">
              <GraduationCap size={14} />
              <span>{member.batch.name}</span>
            </div>
          )}
          {member.branch?.name && (
            <div className="detail-meta-row">
              <Building2 size={14} />
              <span>{member.branch.name}</span>
            </div>
          )}
          {member.location && (
            <div className="detail-meta-row">
              <MapPin size={14} />
              <span>{member.location}</span>
            </div>
          )}
        </>
      }
      description={
        <div>
          {member.bio ? (
            <p style={{ margin: 0, lineHeight: 1.7, color: 'var(--navy)' }}>{member.bio}</p>
          ) : (
            <p style={{ margin: 0, color: 'var(--gray)' }}>No bio added yet.</p>
          )}
        </div>
      }
      actions={
        <>
          {member.user?.email && (
            <a className="alumni-btn alumni-btn-primary" href={`mailto:${member.user.email}`}>
              <Mail size={16} /> Email
            </a>
          )}
          {member.user?.phone && (
            <a className="alumni-btn alumni-btn-ghost" href={`tel:${member.user.phone}`}>
              <Phone size={16} /> Call
            </a>
          )}
        </>
      }
      extra={
        <div style={{ display: 'grid', gap: '16px' }}>
          {(member.currentRole || member.currentCompany) && (
            <div className="detail-card">
              <h2 className="detail-card-label">Professional</h2>
              <div className="detail-body" style={{ display: 'grid', gap: '12px' }}>
                {member.currentRole && (
                  <div className="detail-meta-row">
                    <Briefcase size={14} />
                    <span>{member.currentRole}</span>
                  </div>
                )}
                {member.currentCompany && (
                  <div className="detail-meta-row">
                    <Building2 size={14} />
                    <span>{member.currentCompany}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="detail-card">
              <h2 className="detail-card-label">Connect</h2>
              <div className="detail-body" style={{ display: 'grid', gap: '10px' }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href!}
                    target="_blank"
                    rel="noreferrer"
                    className="directory-social-link"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Link2 size={14} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="detail-card">
            <h2 className="detail-card-label">About this alumnus</h2>
            <div className="detail-body" style={{ display: 'grid', gap: '10px' }}>
              <div className="detail-meta-row">
                <UserRound size={14} />
                <span>{displayName}</span>
              </div>
              <div className="detail-meta-row">
                <CalendarDays size={14} />
                <span>{member.batch?.name || 'Batch not set'}</span>
              </div>
            </div>
          </div>
        </div>
      }
      shareTitle={`${displayName} - JOPESA Alumni`}
      shareText={`Meet ${displayName} on the JOPESA alumni directory.`}
    />
  );
}
