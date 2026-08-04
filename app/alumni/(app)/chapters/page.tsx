'use client';

import { useEffect, useState } from 'react';
import { Building2, MapPin, Users, Globe } from 'lucide-react';
import { Branch } from '@/types';
import { apiFetch, unwrapList } from '@/lib/api';

export default function AlumniChaptersPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await apiFetch(`/branch?skip=0&take=100`);
        setBranches(
          unwrapList<Branch>(payload).map((branch) => ({
            ...branch,
            region: branch.region || (branch as Branch & { description?: string }).description || '',
            memberCount: branch.memberCount ?? 0,
            createdAt: branch.createdAt || '',
          })),
        );
      } catch (err) {
        console.error(err);
        setError('Unable to load chapters.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="chapters-page">
      <div className="chapters-header">
        <div className="chapters-icon">
          <Building2 size={32} />
        </div>
        <div>
          <h1 className="chapters-title">Chapters</h1>
          <p className="chapters-subtitle">Regional JOPESA chapters and communities</p>
        </div>
      </div>

      {loading && (
        <div className="chapters-loading">
          <div className="loading-spinner" />
          <span>Loading chapters...</span>
        </div>
      )}
      
      {error && (
        <div className="chapters-error">
          <Building2 size={24} />
          <span>{error}</span>
        </div>
      )}
      
      {!loading && !error && branches.length === 0 && (
        <div className="chapters-empty">
          <div className="chapters-empty-icon">
            <Building2 size={48} />
          </div>
          <h3>No chapters yet</h3>
          <p>Chapters will appear here once added by the administrator.</p>
        </div>
      )}

      {!loading && !error && branches.length > 0 && (
        <div className="chapters-grid">
          {branches.map((branch) => (
            <div key={branch.id} className="chapter-card">
              <div className="chapter-card-header">
                <div className="chapter-icon">
                  <Globe size={20} />
                </div>
                <h3 className="chapter-name">{branch.name}</h3>
              </div>
              
              <p className="chapter-description">
                {(branch as Branch & { description?: string }).description || branch.region || 'Regional chapter'}
              </p>
              
              <div className="chapter-stats">
                <div className="chapter-stat">
                  <Users size={16} />
                  <span>{branch.memberCount || 0} members</span>
                </div>
                {branch.region && (
                  <div className="chapter-stat">
                    <MapPin size={16} />
                    <span>{branch.region}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
