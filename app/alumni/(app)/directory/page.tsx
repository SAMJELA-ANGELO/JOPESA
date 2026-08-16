'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Phone, Shield } from 'lucide-react';
import { apiFetch, unwrapList } from '@/lib/api';
import { User, Branch, Batch } from '@/types';

interface AlumniMember {
  id?: string;
  user: User;
  branch: Branch | null;
  batch: Batch | null;
  membershipBadge: 'ACTIVE' | 'PASSIVE' | 'INACTIVE' | 'DORMANT' | null;
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
    const matchesSearch = fullName.includes(searchLower) || phone.includes(searchLower);
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
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="filter-select"
        >
          <option value="">All Chapters</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.name}>{branch.name}</option>
          ))}
        </select>
        <select
          value={selectedBadge}
          onChange={(e) => setSelectedBadge(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PASSIVE">Passive</option>
          <option value="INACTIVE">Inactive</option>
          <option value="DORMANT">Dormant</option>
        </select>
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
                      {member.user?.profileImage ? (
                        <img src={member.user.profileImage || undefined} alt={member.user.firstName || 'Alumni member'} />
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
                      <div className="directory-meta">
                        {member.user?.phone && (
                          <span className="directory-phone">
                            <Phone size={12} /> {member.user.phone}
                          </span>
                        )}
                        {member.branch?.name && (
                          <span className="directory-branch">
                            <MapPin size={12} /> {member.branch.name}
                          </span>
                        )}
                      </div>
                    </div>
                    {member.membershipBadge && (
                      <div className={`directory-badge directory-badge-${member.membershipBadge.toLowerCase()}`}>
                        <Shield size={12} /> {member.membershipBadge}
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
