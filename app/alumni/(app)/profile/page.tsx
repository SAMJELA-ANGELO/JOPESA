'use client';



import { useEffect, useState, type FormEvent } from 'react';

import {

  Camera,

  LoaderCircle,

  MapPin,

  Save,

  UserRound,

  Briefcase,

  Link as LinkIcon,

} from 'lucide-react';

import { Batch, Branch } from '@/types';

import { apiFetch, getApiBase, getAlumniToken, unwrapList } from '@/lib/api';



interface ProfileForm {

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  batchId: string;

  branchId: string;

  bio: string;

  profileImage: string;

  currentRole: string;

  currentCompany: string;

  location: string;

  linkedIn: string;

  twitter: string;

  instagram: string;

  website: string;

}



const emptyForm: ProfileForm = {

  firstName: '',

  lastName: '',

  email: '',

  phone: '',

  batchId: '',

  branchId: '',

  bio: '',

  profileImage: '',

  currentRole: '',

  currentCompany: '',

  location: '',

  linkedIn: '',

  twitter: '',

  instagram: '',

  website: '',

};



export default function AlumniProfilePage() {

  const [form, setForm] = useState<ProfileForm>(emptyForm);

  const [batches, setBatches] = useState<Batch[]>([]);

  const [branches, setBranches] = useState<Branch[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const [payments, setPayments] = useState<Array<any>>([]);

  const [activeTab, setActiveTab] = useState('personal');



  useEffect(() => {

    const load = async () => {

      setLoading(true);

      setError('');

      try {

        const [profile, batchPayload, branchPayload] = await Promise.all([

          apiFetch<any>('/alumni/me', {}, true),

          apiFetch('/batch?skip=0&take=100'),

          apiFetch('/branch?skip=0&take=100'),

        ]);



        setBatches(unwrapList<Batch>(batchPayload));

        setBranches(unwrapList<Branch>(branchPayload));

        setForm({

          firstName: profile.user?.firstName || '',

          lastName: profile.user?.lastName || '',

          email: profile.user?.email || '',

          phone: profile.user?.phone || '',

          batchId: profile.batchId || profile.batch?.id || '',

          branchId: profile.branchId || profile.branch?.id || '',

          bio: profile.bio || '',

          profileImage: profile.profileImage || '',

          currentRole: profile.currentRole || '',

          currentCompany: profile.currentCompany || '',

          location: profile.location || '',

          linkedIn: profile.linkedIn || '',

          twitter: profile.twitter || '',

          instagram: profile.instagram || '',

          website: profile.website || '',

        });
        setPayments(profile.user?.contributionPayments || []);



        const storedUser = {

          id: profile.user?.id,

          email: profile.user?.email,

          firstName: profile.user?.firstName,

          lastName: profile.user?.lastName,

          role: profile.user?.role,

          phone: profile.user?.phone,

        };

        localStorage.setItem('jopesa_user', JSON.stringify(storedUser));

      } catch (err) {

        console.error(err);

        setError(err instanceof Error ? err.message : 'Unable to load profile');

      } finally {

        setLoading(false);

      }

    };



    load();

  }, []);



  const setField = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => {

    setForm((prev) => ({ ...prev, [key]: value }));

    setSuccess('');

  };



  const uploadProfileImage = async (file: File) => {

    setUploading(true);

    setError('');

    try {

      const token = getAlumniToken();

      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch(`${getApiBase()}/upload/image?folder=profiles`, {

        method: 'POST',

        headers: token ? { Authorization: `Bearer ${token}` } : undefined,

        body: formData,

      });

      if (!response.ok) {

        throw new Error('Profile image upload failed');

      }

      const payload = await response.json();

      const url = payload.url || payload.secure_url;

      if (!url) throw new Error('No image URL returned');

      setField('profileImage', url);

    } catch (err) {

      setError(err instanceof Error ? err.message : 'Image upload failed');

    } finally {

      setUploading(false);

    }

  };



  const handleSubmit = async (event: FormEvent) => {

    event.preventDefault();

    setSaving(true);

    setError('');

    setSuccess('');



    try {

      if (!form.batchId || !form.branchId) {

        throw new Error('Please select your batch and chapter/branch');

      }



      const updated = await apiFetch<any>(

        '/alumni/me',

        {

          method: 'PUT',

          body: JSON.stringify({

            firstName: form.firstName,

            lastName: form.lastName,

            phone: form.phone || undefined,

            batchId: form.batchId,

            branchId: form.branchId,

            bio: form.bio || undefined,

            profileImage: form.profileImage || undefined,

            currentRole: form.currentRole || undefined,

            currentCompany: form.currentCompany || undefined,

            location: form.location || undefined,

            linkedIn: form.linkedIn || undefined,

            twitter: form.twitter || undefined,

            instagram: form.instagram || undefined,

            website: form.website || undefined,

          }),

        },

        true,

      );



      localStorage.setItem(

        'jopesa_user',

        JSON.stringify({

          id: updated.user?.id,

          email: updated.user?.email,

          firstName: updated.user?.firstName,

          lastName: updated.user?.lastName,

          phone: updated.user?.phone,

        }),

      );



      setSuccess('Profile updated successfully.');

    } catch (err) {

      setError(err instanceof Error ? err.message : 'Unable to save profile');

    } finally {

      setSaving(false);

    }

  };



  const displayName = [form.firstName, form.lastName].filter(Boolean).join(' ') || 'Alumni member';

  const batchName = batches.find((b) => b.id === form.batchId)?.name;

  const branchName = branches.find((b) => b.id === form.branchId)?.name;



  if (loading) {

    return <div style={{ color: 'var(--gray)', fontWeight: 600 }}>Loading profile...</div>;

  }



  return (

    <div className="profile-page">

      {/* Cover + identity header */}

      <div className="profile-hero">

        <div className="profile-cover" />

        <div className="profile-identity">

          <div className="profile-avatar-block">

            {form.profileImage ? (

              <img src={form.profileImage} alt="Profile" className="profile-avatar" />

            ) : (

              <div className="profile-avatar placeholder">

                <UserRound size={40} />

              </div>

            )}

            <label className="profile-avatar-edit">

              <Camera size={14} />

              <input

                type="file"

                accept="image/*"

                hidden

                disabled={uploading}

                onChange={(e) => {

                  const file = e.target.files?.[0];

                  if (file) uploadProfileImage(file);

                }}

              />

            </label>

          </div>

          <div className="profile-identity-text">

            <h1 className="profile-name">{displayName}</h1>

            {(form.currentRole || form.currentCompany) && (

              <p className="profile-headline">

                <Briefcase size={14} />

                {[form.currentRole, form.currentCompany].filter(Boolean).join(' · ')}

              </p>

            )}

            {form.location && (

              <p className="profile-location">

                <MapPin size={14} /> {form.location}

              </p>

            )}

            <p className="profile-email">{form.email}</p>

            {(batchName || branchName) && (

              <div className="profile-badges">

                {batchName && <span className="profile-badge">{batchName}</span>}

                {branchName && <span className="profile-badge profile-badge-chapter">{branchName}</span>}

              </div>

            )}

          </div>

        </div>

      </div>



      <form className="profile-form-wrap" onSubmit={handleSubmit}>
        
        {/* Tab Navigation */}
        <div className="profile-tabs-nav">
          <button 
            type="button"
            className={`profile-tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal
          </button>
          <button 
            type="button"
            className={`profile-tab ${activeTab === 'batch' ? 'active' : ''}`}
            onClick={() => setActiveTab('batch')}
          >
            Batch & Chapter
          </button>
          <button 
            type="button"
            className={`profile-tab ${activeTab === 'professional' ? 'active' : ''}`}
            onClick={() => setActiveTab('professional')}
          >
            Professional
          </button>
          <button 
            type="button"
            className={`profile-tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button 
            type="button"
            className={`profile-tab ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            Social & Links
          </button>
          <button 
            type="button"
            className={`profile-tab ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
        </div>

        {/* Tab Panels */}
        <div className="profile-tab-content">
          
          {activeTab === 'personal' && (
            <div className="profile-tab-panel active">
              <h2 className="profile-section-title">Personal information</h2>

              <div className="alumni-form-grid">

                <div className="alumni-field">

                  <label className="alumni-label">First name</label>

                  <input

                    className="alumni-input"

                    value={form.firstName}

                    onChange={(e) => setField('firstName', e.target.value)}

                    required

                  />

                </div>

                <div className="alumni-field">

                  <label className="alumni-label">Last name</label>

                  <input

                    className="alumni-input"

                    value={form.lastName}

                    onChange={(e) => setField('lastName', e.target.value)}

                    required

                  />

                </div>

                <div className="alumni-field">

                  <label className="alumni-label">Email</label>

                  <input className="alumni-input" value={form.email} disabled />

                </div>

                <div className="alumni-field">

                  <label className="alumni-label">Phone number</label>

                  <input

                    className="alumni-input"

                    value={form.phone}

                    onChange={(e) => setField('phone', e.target.value)}

                    placeholder="+237 6XX XXX XXX"

                  />

                </div>

              </div>
            </div>
          )}



          {activeTab === 'batch' && (
            <div className="profile-tab-panel active">
              <h2 className="profile-section-title">Batch & chapter</h2>

              <div className="alumni-form-grid">

                <div className="alumni-field">

                  <label className="alumni-label">Batch</label>

                  <div className="alumni-select-wrap">

                    <select

                      className="alumni-input"

                      value={form.batchId}

                      onChange={(e) => setField('batchId', e.target.value)}

                      required

                    >

                      <option value="">Select batch</option>

                      {batches.map((batch) => (

                        <option key={batch.id} value={batch.id}>

                          {batch.name || `Batch ${batch.year}`}

                        </option>

                      ))}

                    </select>

                  </div>

                </div>

                <div className="alumni-field">

                  <label className="alumni-label">Chapter / Branch</label>

                  <div className="alumni-select-wrap">

                    <select

                      className="alumni-input"

                      value={form.branchId}

                      onChange={(e) => setField('branchId', e.target.value)}

                      required

                    >

                      <option value="">Select chapter</option>

                      {branches.map((branch) => (

                        <option key={branch.id} value={branch.id}>

                          {branch.name}

                        </option>

                      ))}

                    </select>

                  </div>

                </div>

              </div>
            </div>
          )}



          {activeTab === 'professional' && (
            <div className="profile-tab-panel active">
              <h2 className="profile-section-title">Professional info</h2>

              <div className="alumni-form-grid">

                <div className="alumni-field">

                  <label className="alumni-label">Current role</label>

                  <input

                    className="alumni-input"

                    value={form.currentRole}

                    onChange={(e) => setField('currentRole', e.target.value)}

                    placeholder="e.g. Software Engineer"

                  />

                </div>

                <div className="alumni-field">

                  <label className="alumni-label">Company</label>

                  <input

                    className="alumni-input"

                    value={form.currentCompany}

                    onChange={(e) => setField('currentCompany', e.target.value)}

                    placeholder="e.g. Acme Corp"

                  />

                </div>

                <div className="alumni-field" style={{ gridColumn: '1 / -1' }}>

                  <label className="alumni-label">Location</label>

                  <input

                    className="alumni-input"

                    value={form.location}

                    onChange={(e) => setField('location', e.target.value)}

                    placeholder="City, Country"

                  />

                </div>

              </div>
            </div>
          )}



          {activeTab === 'about' && (
            <div className="profile-tab-panel active">
              <h2 className="profile-section-title">About you</h2>

              <div className="alumni-field">

                <label className="alumni-label">Bio</label>

                <textarea

                  className="alumni-input"

                  rows={5}

                  value={form.bio}

                  onChange={(e) => setField('bio', e.target.value)}

                  placeholder="Tell the alumni community a bit about yourself..."

                  style={{ resize: 'vertical', minHeight: 120 }}

                />

              </div>
            </div>
          )}



          {activeTab === 'social' && (
            <div className="profile-tab-panel active">
              <h2 className="profile-section-title">

                <LinkIcon size={18} /> Social & links

              </h2>

              <div className="alumni-form-grid">

                <div className="alumni-field">

                  <label className="alumni-label">LinkedIn</label>

                  <input

                    className="alumni-input"

                    type="url"

                    value={form.linkedIn}

                    onChange={(e) => setField('linkedIn', e.target.value)}

                    placeholder="https://linkedin.com/in/..."

                  />

                </div>

                <div className="alumni-field">

                  <label className="alumni-label">Website</label>

                  <input

                    className="alumni-input"

                    type="url"

                    value={form.website}

                    onChange={(e) => setField('website', e.target.value)}

                    placeholder="https://..."

                  />

                </div>

                <div className="alumni-field">

                  <label className="alumni-label">Twitter / X</label>

                  <input

                    className="alumni-input"

                    value={form.twitter}

                    onChange={(e) => setField('twitter', e.target.value)}

                    placeholder="@username"

                  />

                </div>

                <div className="alumni-field">

                  <label className="alumni-label">Instagram</label>

                  <input

                    className="alumni-input"

                    value={form.instagram}

                    onChange={(e) => setField('instagram', e.target.value)}

                    placeholder="@username"

                  />

                </div>

              </div>
            </div>
          )}
          {activeTab === 'payments' && (
            <div className="profile-tab-panel active">
              <h2 className="profile-section-title">Payment history</h2>
              {payments.length === 0 ? (
                <div className="alumni-form-error" style={{ background: 'rgba(0,0,0,0.03)', color: 'var(--gray)', borderColor: 'rgba(0,0,0,0.08)' }}>
                  No contribution payments found yet.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '12px 10px', textAlign: 'left', borderBottom: '1px solid var(--lgray)' }}>Date</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', borderBottom: '1px solid var(--lgray)' }}>Installment</th>
                        <th style={{ padding: '12px 10px', textAlign: 'right', borderBottom: '1px solid var(--lgray)' }}>Amount</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', borderBottom: '1px solid var(--lgray)' }}>Status</th>
                        <th style={{ padding: '12px 10px', textAlign: 'left', borderBottom: '1px solid var(--lgray)' }}>Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td style={{ padding: '12px 10px', borderBottom: '1px solid var(--lgray)' }}>{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : '—'}</td>
                          <td style={{ padding: '12px 10px', borderBottom: '1px solid var(--lgray)' }}>{payment.installmentLabel || payment.installment || 'N/A'}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'right', borderBottom: '1px solid var(--lgray)' }}>{payment.amount?.toLocaleString() || '0'} XAF</td>
                          <td style={{ padding: '12px 10px', borderBottom: '1px solid var(--lgray)' }}>{payment.status || 'PENDING'}</td>
                          <td style={{ padding: '12px 10px', borderBottom: '1px solid var(--lgray)' }}>{payment.paymentReference || payment.notes || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>



        {error && <div className="alumni-form-error">{error}</div>}

        {success && (

          <div

            className="alumni-form-error"

            style={{ background: 'rgba(4,120,87,.1)', color: 'var(--ok)', borderColor: 'rgba(4,120,87,.2)' }}

          >

            {success}

          </div>

        )}



        <div className="profile-save-bar">

          <button type="submit" className="alumni-btn alumni-btn-primary" disabled={saving || uploading}>

            {saving ? (

              <>

                <LoaderCircle size={16} className="loading-spinner" /> Saving...

              </>

            ) : (

              <>

                <Save size={16} /> Save profile

              </>

            )}

          </button>

          {uploading && <span className="profile-upload-hint">Uploading photo...</span>}

        </div>

      </form>

    </div>

  );

}

