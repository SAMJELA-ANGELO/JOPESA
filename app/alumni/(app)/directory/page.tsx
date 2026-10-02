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
    <div className="directory-page">
      <div className="directory-header">
        <div>
          <h1 className="directory-title">Alumni Directory</h1>
          <p className="directory-subtitle">Search and connect with fellow JOPESA alumni</p>
        </div>
      </div>

      <div className="directory-search-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <HeroSelect
          value={selectedBranch}
          onChange={setSelectedBranch}
          ariaLabel="Filter by chapter"
          className="filter-select"
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
          className="filter-select"
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
        <div className="directory-loading">Loading alumni directory...</div>
      ) : (
        <div className="directory-content">
          {filteredMembers.length === 0 ? (
            <div className="directory-empty">
              <div className="directory-empty-icon">
                <Search size={48} />
              </div>
              <div className="directory-empty-title">No alumni found</div>
              <div className="directory-empty-sub">Try adjusting your search or filters</div>
            </div>
          ) : (
            <div className="directory-grid">
              {filteredMembers.map((member) => (
                <div
                  key={member.id || member.user?.id}
                  className="directory-card"
                  onClick={() => router.push(`/alumni/directory/${member.id || member.user?.id}`)}
                >
                  <div className="directory-card-header">
                    <div className="directory-avatar">
                      {(member.profileImage || member.user?.profileImage) ? (
                        <img src={resolveMediaUrl(member.profileImage || member.user.profileImage)} alt={member.user.firstName || 'Alumni member'} />
                      ) : (
                        <div className="directory-avatar-placeholder">
                          {member.user?.firstName?.[0] || '?'}
                        </div>
                      )}
                    </div>
                    <div className="directory-card-info">
                      <div className="directory-name">
                        {member.user?.firstName} {member.user?.lastName}
                      </div>
                    </div>
                    {member.membershipBadge && (
                      <div className={`directory-badge directory-badge-${member.membershipBadge.toLowerCase()}`}>
                        <Shield size={12} /> {member.membershipBadge}
                      </div>
                    )}
                  </div>
                  <div className="directory-member-details">
                    {member.relationshipStatus && <div><Heart size={13} /> {member.relationshipStatus}</div>}
                    {member.currentRole && <div><Briefcase size={13} /> {member.currentRole}</div>}
                    {member.currentCompany && <div><Building2 size={13} /> {member.currentCompany}</div>}
                    {member.user?.phone && <div><Phone size={13} /> {member.user.phone}</div>}
                    {member.branch?.name && <div><MapPin size={13} /> {member.branch.name}</div>}
                    {(member.linkedIn || member.website || member.twitter || member.instagram) && (
                      <div className="directory-member-links">
                        {[
                          ['LinkedIn', member.linkedIn],
                          ['Website', member.website],
                          ['X / Twitter', member.twitter],
                          ['Instagram', member.instagram],
                        ].filter((link): link is [string, string] => !!link[1]).map(([label, href]) => (
                          <a key={label} href={socialProfileUrl(label, href)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                            <Link2 size={12} /> {label}
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
