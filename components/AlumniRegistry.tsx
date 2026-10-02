'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Search, Trash2, GraduationCap } from 'lucide-react';
import HeroSelect from '@/components/HeroSelect';
import { getBatchInfo, maxClass, updateYearHint, CLASS_NAMES, SY } from '@/lib/batchUtils';
import { Alumni, Branch } from '@/types';

interface AlumniRegistryProps {
  alumni: Alumni[];
  branches: Branch[];
  onAlumniChange: (alumni: Alumni[]) => void;
  onShowToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
  prefillData?: { year: string; classNum: number | '' };
}

export default function AlumniRegistry({ alumni, branches, onAlumniChange, onShowToast, prefillData }: AlumniRegistryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showRegPanel, setShowRegPanel] = useState(true);
  const [regName, setRegName] = useState('');
  const [regYear, setRegYear] = useState('');
  const [regClass, setRegClass] = useState<number | ''>('');
  const [regBranchId, setRegBranchId] = useState('');
  const [regError, setRegError] = useState('');

  useEffect(() => {
    if (prefillData && (prefillData.year || prefillData.classNum)) {
      setRegYear(prefillData.year);
      setRegClass(prefillData.classNum);
      setShowRegPanel(true);
    }
  }, [prefillData]);

  const registerAlumni = () => {
    setRegError('');

    const name = regName.trim();
    const year = parseInt(regYear);
    const cVal = parseInt(String(regClass));
    const CY = new Date().getFullYear();

    if (!name) return setRegError('Please enter a full name.');
    if (!year || isNaN(year)) return setRegError('Please enter your year of entry (e.g. 2008 for 2008/2009).');
    if (year < SY) return setRegError(`Year ${year} is before JOPACC was founded (2007/2008).`);
    if (year > CY) return setRegError(`Year ${year}/${year+1} is in the future.`);
    if (!cVal) return setRegError('Please select a class.');
    if (!regBranchId) return setRegError('Please select a branch.');

    const mx = maxClass(year);
    if (cVal > mx) {
      const openYear = SY + (cVal - 1);
      return setRegError(`${CLASS_NAMES[cVal]} did not exist at JOPACC in ${year}/${year+1}. It opened in ${openYear}/${openYear+1}.`);
    }

    const info = getBatchInfo(year, cVal);
    if (info.batch < 1) return setRegError('Invalid entry combination.');

    const newAlumni: Alumni = {
      id: Date.now(),
      name,
      year,
      classNum: cVal,
      className: info.className,
      batch: info.batch,
      acadYear: info.acadYear,
      f1AcadYear: info.f1AcadYear,
      gradYear: info.gradYear,
      branchId: regBranchId || undefined,
      date: new Date().toLocaleDateString(),
    };

    onAlumniChange([newAlumni, ...alumni]);
    setRegName('');
    setRegYear('');
    setRegClass('');
    setRegBranchId('');
    setShowRegPanel(false);
    onShowToast(`${name} registered as Batch ${info.batch}!`, 'success');
  };

  const deleteAlumni = (id: number) => {
    if (confirm('Delete this record from the registry?')) {
      onAlumniChange(alumni.filter(a => a.id !== id));
      onShowToast('Record deleted.');
    }
  };

  const filteredAlumni = alumni.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || String(a.batch) === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const batches = [...new Set(alumni.map(a => a.batch))].sort((a, b) => b - a);

  const getInitials = (name: string) => {
    return name.split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2);
  };

  return (
    <section className="sec active" id="sec-alumni">
      <div className="stats-row">
        <div className="stat-cell"><div className="stat-num">{alumni.length}</div><div className="stat-lbl">Alumni</div></div>
        <div className="stat-cell"><div className="stat-num">{batches.length}</div><div className="stat-lbl">Batches</div></div>
        <div className="stat-cell"><div className="stat-num">{batches.length ? batches[0] : '—'}</div><div className="stat-lbl">Latest</div></div>
      </div>
      <div className="search-wrap">
        <Search className="search-ico" size={16} />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name…" />
      </div>
      <div className="filter-row">
        <div className={`f-chip ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</div>
        {batches.map(b => (
          <div key={b} className={`f-chip ${String(b) === String(activeFilter) ? 'active' : ''}`} onClick={() => setActiveFilter(String(b))}>Batch {b}</div>
        ))}
      </div>
      <div className="card">
        <div className="reg-header">
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Alumni Registry</div>
            <div style={{ fontSize: 12, color: 'var(--gray)' }}>Register and find ex-students</div>
          </div>
        </div>
        {showRegPanel && (
          <div className="reg-panel open">
            <div className="divider"></div>
            <div className="fg"><label>Full Name *</label><input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="e.g. Fang Bertin" /></div>
            <div className="fg">
              <label>Academic Year of Entry *</label>
              <div className="year-wrap">
                <input type="number" value={regYear} onChange={(e) => setRegYear(e.target.value)} placeholder="e.g. 2008 (means 2008/2009)" min={2007} />
                <div className="year-hint">{updateYearHint(regYear)}</div>
              </div>
            </div>
            <div className="fg">
              <label>Class at Entry *</label>
              <HeroSelect value={regClass === '' ? '' : String(regClass)} onChange={(value) => setRegClass(value === '' ? '' : parseInt(value))} ariaLabel="Class at entry" placeholder="Select class" options={[{ value: '', label: '— Select class —' }, { value: '1', label: 'Form 1' }, { value: '2', label: 'Form 2' }, { value: '3', label: 'Form 3' }, { value: '4', label: 'Form 4' }, { value: '5', label: 'Form 5' }, { value: '6', label: 'Lower Sixth (LS6)' }, { value: '7', label: 'Upper Sixth (US6)' }]} />
            </div>
            <div className="fg">
              <label>Branch *</label>
              <HeroSelect value={regBranchId} onChange={setRegBranchId} ariaLabel="Branch" placeholder="Select branch" options={[{ value: '', label: '— Select branch —' }, ...branches.map((branch) => ({ value: branch.id, label: `${branch.name} (${branch.region})` }))]} />
            </div>
            <button className="btn btn-navy" onClick={registerAlumni}>Register →</button>
            {regError && (
              <div className="msg-box msg-err show">
                <AlertTriangle size={18} />
                <span>{regError}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div id="alumniList">
        {!filteredAlumni.length ? (
          <div className="empty-state">
            <div className="empty-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{alumni.length ? <Search size={40} /> : <GraduationCap size={40} />}</div>
            <div className="empty-text">{alumni.length ? 'No results found.' : 'No alumni yet. Be the first to register!'}</div>
          </div>
        ) : (
          [...new Set(filteredAlumni.map(a => a.batch))]
            .sort((a, b) => b - a)
            .map(batch => {
              const members = filteredAlumni.filter(a => a.batch === batch);
              const f1Year = `${SY + batch - 1}/${SY + batch}`;
              return (
                <div key={batch} className="batch-group">
                  <div className="batch-group-head">
                    <div className="batch-tag">Batch {batch}</div>
                    <div className="batch-line"></div>
                    <div className="batch-count">F1: {f1Year} · {members.length} member{members.length > 1 ? 's' : ''}</div>
                  </div>
                  {members.map(a => (
                    <div key={a.id} className="alumni-card">
                      <div className="alumni-avatar">{getInitials(a.name)}</div>
                      <div className="alumni-info">
                        <div className="alumni-name">{a.name}</div>
                        <div className="alumni-meta">{a.className} · {a.acadYear} · Grad: {a.gradYear}</div>
                      </div>
                      <div className="alumni-badge">B{a.batch}</div>
                      <button className="del-btn" onClick={() => deleteAlumni(a.id)}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              );
            })
        )}
      </div>
    </section>
  );
}
