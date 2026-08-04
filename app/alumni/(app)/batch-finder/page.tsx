'use client';

import { useState, type FormEvent } from 'react';
import { AlertTriangle, Star, Search, Calendar, GraduationCap, Clock } from 'lucide-react';
import { getBatchInfo, maxClass, updateYearHint, CLASS_NAMES, SY } from '@/lib/batchUtils';
import { BatchInfo } from '@/types';

export default function AlumniBatchFinderPage() {
  const [yIn, setYIn] = useState('');
  const [cIn, setCIn] = useState<number | ''>('');
  const [result, setResult] = useState<BatchInfo | null>(null);
  const [finderError, setFinderError] = useState('');

  const calcBatch = (event?: FormEvent) => {
    event?.preventDefault();
    setFinderError('');
    setResult(null);

    const year = parseInt(yIn);
    const cVal = parseInt(String(cIn));
    const CY = new Date().getFullYear();

    if (!year || isNaN(year)) return setFinderError('Please enter your year of entry (e.g. 2008 for 2008/2009).');
    if (year < SY) return setFinderError(`JOPACC was founded in 2007/2008. Year ${year} is before the school existed.`);
    if (year > CY) return setFinderError(`Year ${year}/${year + 1} is in the future.`);
    if (!cVal) return setFinderError('Please select your class at entry.');

    const mx = maxClass(year);
    if (cVal > mx) {
      const openYear = SY + (cVal - 1);
      return setFinderError(
        `${CLASS_NAMES[cVal]} did not exist at JOPACC in ${year}/${year + 1}. It first opened in ${openYear}/${openYear + 1}.`,
      );
    }

    const info = getBatchInfo(year, cVal);
    if (info.batch < 1) {
      return setFinderError('Invalid combination. The resulting batch number is before the school existed.');
    }

    setResult(info);
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
          <td>{info.batch}</td>
          <td>{info.gradYear}</td>
        </tr>,
      );
    }
    return rows;
  };

  return (
    <div className="batch-finder-page">
      <div className="batch-finder-header">
        <div className="batch-finder-icon">
          <Search size={32} />
        </div>
        <div>
          <h1 className="batch-finder-title">Batch Finder</h1>
          <p className="batch-finder-subtitle">
            Enter your year of entry and class to calculate your JOPESA batch and graduation year
          </p>
        </div>
      </div>

      <div className="batch-finder-layout">
        <form className="batch-finder-form" onSubmit={calcBatch}>
          <div className="batch-finder-form-header">
            <Calendar size={20} />
            <span>Calculate your batch</span>
          </div>

          <div className="batch-finder-field">
            <label className="batch-finder-label">Academic year of entry</label>
            <input
              type="number"
              className="batch-finder-input"
              value={yIn}
              onChange={(e) => {
                setYIn(e.target.value);
                setResult(null);
                setFinderError('');
              }}
              placeholder="e.g. 2008 (means 2008/2009)"
              min={2007}
            />
            <div className="batch-finder-hint">{updateYearHint(yIn)}</div>
          </div>

          <div className="batch-finder-field">
            <label className="batch-finder-label">Class at entry</label>
            <div className="batch-finder-select-wrap">
              <select
                className="batch-finder-input"
                value={cIn}
                onChange={(e) => {
                  setCIn(e.target.value === '' ? '' : parseInt(e.target.value));
                  setResult(null);
                  setFinderError('');
                }}
              >
                <option value="">Select your class</option>
                <option value="1">Form 1</option>
                <option value="2">Form 2</option>
                <option value="3">Form 3</option>
                <option value="4">Form 4</option>
                <option value="5">Form 5</option>
                <option value="6">Lower Sixth (LS6)</option>
                <option value="7">Upper Sixth (US6)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="batch-finder-button">
            <Search size={18} />
            Calculate my batch
          </button>

          {finderError && (
            <div className="batch-finder-error">
              <AlertTriangle size={18} />
              <span>{finderError}</span>
            </div>
          )}

          {result && (
            <div className="batch-finder-result">
              <div className="batch-finder-result-header">
                <GraduationCap size={24} />
                <div>
                  <div className="batch-finder-result-label">Your batch</div>
                  <div className="batch-finder-result-batch">Batch {result.batch}</div>
                </div>
              </div>
              
              <div className="batch-finder-result-grid">
                <div className="batch-finder-result-item">
                  <Calendar size={16} />
                  <div>
                    <div className="batch-finder-result-k">Entry year</div>
                    <div className="batch-finder-result-v">{result.acadYear}</div>
                  </div>
                </div>
                <div className="batch-finder-result-item">
                  <GraduationCap size={16} />
                  <div>
                    <div className="batch-finder-result-k">Class entered</div>
                    <div className="batch-finder-result-v">{result.className}</div>
                  </div>
                </div>
                <div className="batch-finder-result-item">
                  <Calendar size={16} />
                  <div>
                    <div className="batch-finder-result-k">Graduation</div>
                    <div className="batch-finder-result-v">{result.gradYear}</div>
                  </div>
                </div>
                <div className="batch-finder-result-item">
                  <Clock size={16} />
                  <div>
                    <div className="batch-finder-result-k">Years left</div>
                    <div className="batch-finder-result-v">
                      {result.yrsLeft} yr{result.yrsLeft === 1 ? '' : 's'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="batch-finder-result-f1">
                <Star size={16} />
                <span>Batch Form 1 year: <strong>{result.f1AcadYear}</strong></span>
              </div>
              
              {typeof cIn === 'number' && cIn > 1 && (
                <div className="batch-finder-result-note">
                  You entered in {result.className}. Your batch matches those who entered Form 1 in {result.f1AcadYear}.
                </div>
              )}
            </div>
          )}
        </form>

        <div className="batch-finder-reference">
          <div className="batch-finder-reference-header">
            <Calendar size={20} />
            <h3>Quick reference (Form 1 entries)</h3>
          </div>
          <div className="batch-finder-table-wrap">
            <table className="batch-finder-table">
              <thead>
                <tr>
                  <th>Entry year</th>
                  <th>Batch</th>
                  <th>Graduation</th>
                </tr>
              </thead>
              <tbody>{buildRefTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
