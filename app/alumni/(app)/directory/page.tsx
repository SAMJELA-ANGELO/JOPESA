'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Phone, Shield, Briefcase, Heart, Link2, Building2 } from 'lucide-react';
import HeroSelect from '@/components/HeroSelect';
import { apiFetch, resolveMediaUrl, unwrapList } from '@/lib/api';
import { User, Branch, Batch } from '@/types';

interface AlumniMember {
  id?: string;
  user: User;
  branch: Branch | null;
  batch: Batch | null;
  membershipBadge: 'ACTIVE' | 'PASSIVE' | 'INACTIVE' | 'DORMANT' | null;
  profileImage?: string | null;
  relationshipStatus?: string | null;
  currentRole?: string | null;
  currentCompany?: string | null;
  linkedIn?: string | null;
  website?: string | null;
  twitter?: string | null;
  instagram?: string | null;
}

function socialProfileUrl(label: string, value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  const handle = value.replace(/^@/, '');
  if (label === 'LinkedIn') return `https://www.linkedin.com/in/${handle}`;
  if (label === 'Instagram') return `https://www.instagram.com/${handle}`;
  if (label === 'X / Twitter') return `https://x.com/${handle}`;
  return `https://${value}`;
}

export default function AlumniDirectoryPage() {
  const router = useRouter();
  const [members, setMembers] = useState<AlumniMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [membersPayload, branchesPayload] = await Promise.all([
          apiFetch('/alumni/members'),
          apiFetch('/branch?skip=0&take=100'),
        ]);
        
        // Handle different response formats
        let membersList: AlumniMember[] = [];
        if (Array.isArray(membersPayload)) {
          membersList = membersPayload as AlumniMember[];
        } else if (membersPayload && typeof membersPayload === 'object' && Array.isArray((membersPayload as { data?: unknown }).data)) {
          membersList = (membersPayload as { data: AlumniMember[] }).data;
        }
        
        // Calculate badges for each member if not provided by backend
        const membersWithBadges = membersList.map(member => {
          if (!member.membershipBadge) {
            const annualPayments = member.user?.contributionPayments?.filter((p: any) => 
              p.contribution?.type === 'ANNUAL_FEE' || p.contribution?.title?.toLowerCase().includes('annual')
            ) || [];
            
            let badge: 'ACTIVE' | 'PASSIVE' | 'INACTIVE' | 'DORMANT' = 'DORMANT';
            
            if (annualPayments.length > 0) {
              const hasPaidThisYear = annualPayments.some((p: any) => {
                const paymentDate = new Date(p.paymentDate);
                const currentYear = new Date().getFullYear();
                return paymentDate.getFullYear() === currentYear && p.status === 'COMPLETED';
              });
              
              badge = hasPaidThisYear ? 'ACTIVE' : 'PASSIVE';
            } else if (member.user?.contributionPayments && member.user.contributionPayments.length > 0) {
              badge = 'INACTIVE';
            }
            
            return { ...member, membershipBadge: badge };
          }
          return member;
        });
        
        setMembers(membersWithBadges);
        setBranches(unwrapList<Branch>(branchesPayload));
      } catch (err) {
        console.error('Failed to load directory:', err);
        // If the endpoint doesn't exist yet, show empty state
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredMembers = members.filter(member => {
    const fullName = `${member.user?.firstName || ''} ${member.user?.lastName || ''}`.toLowerCase();
    const phone = member.user?.phone || '';
    const badge = member.membershipBadge || '';
    const branchName = member.branch?.name || '';
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = `${fullName} ${phone} ${member.currentRole || ''} ${member.currentCompany || ''}`.toLowerCase().includes(searchLower);
    const matchesBranch = !selectedBranch || branchName === selectedBranch;
    const matchesBadge = !selectedBadge || badge === selectedBadge;
    
    return matchesSearch && matchesBranch && matchesBadge;
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%)',
        borderRadius: '20px',
        padding: '32px 28px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,43,107,0.15)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(200,150,12,0.15) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(240,192,64,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <Search size={28} color="var(--gold2)" />
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '28px', 
                fontWeight: 800, 
                color: '#fff',
                letterSpacing: '-0.5px'
              }}>
                Alumni Directory
              </h1>
              <p style={{ 
                margin: '4px 0 0', 
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Search and connect with fellow JOPESA alumni
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        border: '1px solid rgba(0,43,107,0.08)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <div style={{ 
          flex: 1, 
          minWidth: '250px',
          position: 'relative'
        }}>
          <Search size={18} style={{ 
            position: 'absolute', 
            left: '14px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'var(--gray)'
          }} />
          <input
            type="text"
            placeholder="Search by name or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 42px',
              borderRadius: '12px',
              border: '1.5px solid var(--lgray)',
              fontSize: '15px',
              fontWeight: '500',
              outline: 'none',
              transition: 'all 0.2s'
            }}
          />
        </div>
        <HeroSelect
          value={selectedBranch}
          onChange={setSelectedBranch}
          ariaLabel="Filter by chapter"
          style={{ 
            minWidth: '180px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1.5px solid var(--lgray)',
            fontSize: '15px',
            fontWeight: '500'
          }}
          placeholder="All Chapters"
          options={[
            { value: '', label: 'All Chapters' },
            ...branches.map((branch) => ({ value: branch.name, label: branch.name })),
          ]}
        />
        <HeroSelect
          value={selectedBadge}
          onChange={setSelectedBadge}
          ariaLabel="Filter by membership status"
          style={{ 
            minWidth: '150px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1.5px solid var(--lgray)',
            fontSize: '15px',
            fontWeight: '500'
          }}
          placeholder="All Status"
          options={[
            { value: '', label: 'All Status' },
            { value: 'ACTIVE', label: 'Active' },
            { value: 'PASSIVE', label: 'Passive' },
            { value: 'INACTIVE', label: 'Inactive' },
            { value: 'DORMANT', label: 'Dormant' },
          ]}
        />
      </div>

      {loading ? (
        <div style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '16px',
          color: 'var(--navy)',
          fontWeight: '600'
        }}>
          <div className="loading-spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
          <span>Loading alumni directory...</span>
        </div>
      ) : (
        <div>
          {filteredMembers.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: 64, 
              color: 'var(--gray)',
              background: '#fff',
              borderRadius: '20px',
              border: '1px solid var(--lgray)'
            }}>
              <Search size={48} style={{ color: 'var(--navy)', marginBottom: '16px' }} />
              <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>No alumni found</p>
              <p style={{ fontSize: '14px' }}>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '16px' 
            }}>
              {filteredMembers.map((member) => (
                <div
                  key={member.id || member.user?.id}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    border: '1px solid rgba(0,43,107,0.08)',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                  onClick={() => router.push(`/alumni/directory/${member.id || member.user?.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,43,107,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(0,43,107,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(0,43,107,0.08)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden'
                    }}>
                      {(member.profileImage || member.user?.profileImage) ? (
                        <img 
                          src={resolveMediaUrl(member.profileImage || member.user.profileImage)} 
                          alt={member.user.firstName || 'Alumni member'} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>
                          {member.user?.firstName?.[0] || '?'}
                        </span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: '700', 
                        color: 'var(--navy)',
                        marginBottom: '4px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {member.user?.firstName} {member.user?.lastName}
                      </div>
                      {member.membershipBadge && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '999',
                          fontSize: '11px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px',
                          background: member.membershipBadge === 'ACTIVE' 
                            ? 'rgba(4,120,87,0.12)' 
                            : member.membershipBadge === 'PASSIVE'
                            ? 'rgba(200,150,12,0.12)'
                            : 'rgba(107,114,128,0.12)',
                          color: member.membershipBadge === 'ACTIVE' 
                            ? '#047857' 
                            : member.membershipBadge === 'PASSIVE'
                            ? '#b45309'
                            : '#6b7280'
                        }}>
                          <Shield size={10} />
                          {member.membershipBadge}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {member.relationshipStatus && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--gray)',
                        fontWeight: '500'
                      }}>
                        <Heart size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                        {member.relationshipStatus}
                      </div>
                    )}
                    {member.currentRole && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--gray)',
                        fontWeight: '500'
                      }}>
                        <Briefcase size={14} style={{ color: 'var(--navy)', flexShrink: 0 }} />
                        {member.currentRole}
                      </div>
                    )}
                    {member.currentCompany && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--gray)',
                        fontWeight: '500'
                      }}>
                        <Building2 size={14} style={{ color: 'var(--navy)', flexShrink: 0 }} />
                        {member.currentCompany}
                      </div>
                    )}
                    {member.user?.phone && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--gray)',
                        fontWeight: '500'
                      }}>
                        <Phone size={14} style={{ color: 'var(--navy)', flexShrink: 0 }} />
                        {member.user.phone}
                      </div>
                    )}
                    {member.branch?.name && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--gray)',
                        fontWeight: '500'
                      }}>
                        <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                        {member.branch.name}
                      </div>
                    )}
                    {(member.linkedIn || member.website || member.twitter || member.instagram) && (
                      <div style={{ 
                        display: 'flex', 
                        gap: '12px',
                        marginTop: '4px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--lgray)'
                      }}>
                        {[
                          ['LinkedIn', member.linkedIn],
                          ['Website', member.website],
                          ['X / Twitter', member.twitter],
                          ['Instagram', member.instagram],
                        ].filter((link): link is [string, string] => !!link[1]).map(([label, href]) => (
                          <a 
                            key={label} 
                            href={socialProfileUrl(label, href)} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={(event) => event.stopPropagation()}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px',
                              color: 'var(--navy)',
                              fontWeight: '600',
                              textDecoration: 'none',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              background: 'rgba(0,43,107,0.06)',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(0,43,107,0.12)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(0,43,107,0.06)';
                            }}
                          >
                            <Link2 size={12} />
                            {label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
