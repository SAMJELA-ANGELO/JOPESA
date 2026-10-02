'use client';

import { useState } from 'react';
import { AlertTriangle, Star } from 'lucide-react';
import HeroSelect from '@/components/HeroSelect';
import { getBatchInfo, maxClass, updateYearHint, CLASS_NAMES, SY } from '@/lib/batchUtils';
import { BatchInfo } from '@/types';

interface BatchFinderProps {
  onPrefillAlumni?: (year: string, classNum: number | '') => void;
}

export default function BatchFinder({ onPrefillAlumni }: BatchFinderProps) {
  const [yIn, setYIn] = useState('');
  const [cIn, setCIn] = useState<number | ''>('');
  const [result, setResult] = useState<BatchInfo | null>(null);
  const [finderError, setFinderError] = useState('');

  const calcBatch = () => {
    setFinderError('');
    setResult(null);
    
    const year = parseInt(yIn);
    const cVal = parseInt(String(cIn));
    const CY = new Date().getFullYear();

    if (!year || isNaN(year)) return setFinderError('Please enter your year of entry (e.g. 2008 for 2008/2009).');
    if (year < SY) return setFinderError(`JOPACC was founded in 2007/2008. Year ${year} is before the school existed.`);
    if (year > CY) return setFinderError(`Year ${year}/${year+1} is in the future.`);
    if (!cVal) return setFinderError('Please select your class at entry.');

    const mx = maxClass(year);
    if (cVal > mx) {
      const openYear = SY + (cVal - 1);
      return setFinderError(`${CLASS_NAMES[cVal]} did not exist at JOPACC in ${year}/${year+1}. It first opened in ${openYear}/${openYear+1}.`);
    }

    const info = getBatchInfo(year, cVal);
    if (info.batch < 1) return setFinderError('Invalid combination. The resulting batch number is before the school existed.');

    setResult(info);
  };

  const prefillAlumni = () => {
    onPrefillAlumni?.(yIn, cIn);
  };

  const buildRefTable = () => {
    const rows = [];
    const CY = new Date().getFullYear();
    const end = Math.min(CY, SY + 16);
    for (let y = end; y >= SY; y--) {
      const info = getBatchInfo(y, 1);
      rows.push(
        <tr key={y}>
          <td>{info.acadYear}</td>
          <td className="ref-num">{info.batch}</td>
          <td className="ref-grad">{info.gradYear}</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <section className="sec active" id="sec-finder">
      <div className="pg-title">Batch Finder</div>
      <div className="pg-sub">Find your batch number and graduation year.</div>
      <div className="card">
        <div className="fg">
          <label>Academic Year of Entry</label>
          <div className="year-wrap">
            <input
              type="number"
              value={yIn}
              onChange={(e) => { setYIn(e.target.value); setResult(null); setFinderError(''); }}
              placeholder="e.g. 2008 (means 2008/2009)"
              min={2007}
            />
            <div className="year-hint">{updateYearHint(yIn)}</div>
          </div>
        </div>
        <div className="fg">
          <label>Class at Entry</label>
          <HeroSelect
            className="batch-finder-input"
            value={cIn === '' ? '' : String(cIn)}
            onChange={(value) => {
              setCIn(value === '' ? '' : parseInt(value));
              setResult(null);
              setFinderError('');
            }}
            ariaLabel="Class at entry"
            placeholder="Select your class"
            options={[
              { value: '', label: 'Select your class' },
              { value: '1', label: 'Form 1' },
              { value: '2', label: 'Form 2' },
              { value: '3', label: 'Form 3' },
              { value: '4', label: 'Form 4' },
              { value: '5', label: 'Form 5' },
              { value: '6', label: 'Lower Sixth (LS6)' },
              { value: '7', label: 'Upper Sixth (US6)' },
            ]}
          />
          </div>
        <button className="btn btn-navy" onClick={calcBatch}>Calculate My Batch →</button>
        {finderError && (
          <div className="msg-box msg-err show">
            <AlertTriangle size={18} />
            <span>{finderError}</span>
          </div>
        )}
        {result && (
          <div className="result-box show">
            <div className="res-label">Your Batch</div>
            <div className="res-batch">Batch {result.batch}</div>
            <div className="res-grid">
              <div className="res-item"><div className="res-lbl">Your Entry Year</div><div className="res-val">{result.acadYear}</div></div>
              <div className="res-item"><div className="res-lbl">Class Entered</div><div className="res-val">{result.className}</div></div>
              <div className="res-item"><div className="res-lbl">Graduation Year</div><div className="res-val">{result.gradYear}</div></div>
              <div className="res-item"><div className="res-lbl">Yrs to Graduation</div><div className="res-val">{result.yrsLeft} yr{result.yrsLeft > 1 ? 's' : ''}</div></div>
            </div>
            <div className="res-f1">
              <div className="res-lbl"><Star size={14} className="inline mr-1" /> Your Batch Form 1 Year</div>
              <div className="res-val">{result.f1AcadYear}</div>
            </div>
            {typeof cIn === 'number' && cIn > 1 && (
              <div className="res-warn show">
                You entered in {result.className}. Your batch matches those who entered Form 1 in {result.f1AcadYear}.
              </div>
            )}
            {onPrefillAlumni && (
              <button className="btn btn-gold" style={{ marginTop: 13 }} onClick={prefillAlumni}>+ Register as Alumni</button>
            )}
          </div>
        )}
      </div>
      <div className="card">
        <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--navy)', marginBottom: 11 }}>Quick Reference (Form 1 entries)</div>
        <table className="ref-tbl">
          <thead><tr><th>Entry Year</th><th className="ref-num">Batch</th><th className="ref-grad">Graduation</th></tr></thead>
          <tbody>{buildRefTable()}</tbody>
        </table>
      </div>
    </section>
  );
}
