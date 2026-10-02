'use client';

import { useState } from 'react';
import { toast } from '@heroui/react';
import HeroSelect from '@/components/HeroSelect';
import { Shield, Users, Calendar, FileText, Settings, Plus, Trash2, MapPin, UserPlus, Clock } from 'lucide-react';
import { User, Event, Announcement, Document, Branch } from '@/types';

interface AdminProps {
  users: User[];
  events: Event[];
  announcements: Announcement[];
  documents: Document[];
  branches: Branch[];
  onEventsChange: (events: Event[]) => void;
  onAnnouncementsChange: (announcements: Announcement[]) => void;
  onDocumentsChange: (documents: Document[]) => void;
  onBranchesChange: (branches: Branch[]) => void;
}

export default function Admin({ users, events, announcements, documents, branches, onEventsChange, onAnnouncementsChange, onDocumentsChange, onBranchesChange }: AdminProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'events' | 'announcements' | 'documents' | 'branches'>('overview');
  
  // Event management
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    status: 'upcoming' as 'upcoming' | 'past'
  });

  // Announcement management
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: '',
    priority: 'normal' as 'normal' | 'urgent',
    createdBy: 'Admin'
  });

  // Document management
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [documentData, setDocumentData] = useState({
    title: '',
    type: 'other' as 'minutes' | 'constitution' | 'report' | 'other',
    fileUrl: '',
    uploadedBy: 'Admin'
  });

  // Branch management
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [branchData, setBranchData] = useState({
    name: '',
    region: '',
    leaderId: ''
  });

  const notify = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    const title = type === 'error' ? 'Error' : type === 'warning' ? 'Notice' : 'Success';
    const options = { description: message, timeout: 3500 };

    if (type === 'error') toast.danger(title, options);
    else if (type === 'warning') toast.warning(title, options);
    else toast.success(title, options);
  };

  const handleCreateEvent = () => {
    if (!eventData.title || !eventData.startDate || !eventData.endDate || !eventData.location) {
      notify('Please fill in all required fields', 'warning');
      return;
    }
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData,
      createdAt: new Date().toLocaleDateString()
    };
    onEventsChange([newEvent, ...events]);
    setEventData({ title: '', description: '', startDate: '', endDate: '', location: '', status: 'upcoming' });
    setShowEventForm(false);
  };

  const handleCreateAnnouncement = () => {
    if (!announcementData.title || !announcementData.content) {
      notify('Please fill in all required fields', 'warning');
      return;
    }
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      ...announcementData,
      type: 'NEWS',
      createdAt: new Date().toLocaleDateString()
    };
    onAnnouncementsChange([newAnnouncement, ...announcements]);
    setAnnouncementData({ title: '', content: '', priority: 'normal', createdBy: 'Admin' });
    setShowAnnouncementForm(false);
  };

  const handleCreateDocument = () => {
    if (!documentData.title || !documentData.fileUrl) {
      notify('Please fill in all required fields', 'warning');
      return;
    }
    const newDocument: Document = {
      id: Date.now().toString(),
      ...documentData,
      uploadedAt: new Date().toLocaleDateString()
    };
    onDocumentsChange([newDocument, ...documents]);
    setDocumentData({ title: '', type: 'other', fileUrl: '', uploadedBy: 'Admin' });
    setShowDocumentForm(false);
  };

  const handleCreateBranch = () => {
    if (!branchData.name || !branchData.region) {
      notify('Please fill in all required fields', 'warning');
      return;
    }
    const newBranch: Branch = {
      id: Date.now().toString(),
      ...branchData,
      memberCount: 0,
      createdAt: new Date().toLocaleDateString()
    };
    onBranchesChange([newBranch, ...branches]);
    setBranchData({ name: '', region: '', leaderId: '' });
    setShowBranchForm(false);
  };

  return (
    <section className="sec active" id="sec-admin">
      <div className="pg-title">Admin Panel</div>
      <div className="pg-sub">Manage users, content, and system settings.</div>
      
      <div className="stats-row">
        <div className="stat-cell"><div className="stat-num">{users.length}</div><div className="stat-lbl">Users</div></div>
        <div className="stat-cell"><div className="stat-num">{branches.length}</div><div className="stat-lbl">Branches</div></div>
        <div className="stat-cell"><div className="stat-num">{events.length}</div><div className="stat-lbl">Events</div></div>
        <div className="stat-cell"><div className="stat-num">{announcements.length}</div><div className="stat-lbl">Posts</div></div>
        <div className="stat-cell"><div className="stat-num">{documents.length}</div><div className="stat-lbl">Docs</div></div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--navy)', marginBottom: 12 }}>Content Management</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          <button 
            className={`btn btn-sm ${activeSection === 'events' ? 'btn-navy' : ''}`}
            style={{ background: activeSection === 'events' ? 'var(--navy)' : '#fff', color: activeSection === 'events' ? '#fff' : 'var(--navy)', border: '2px solid var(--lgray)' }}
            onClick={() => setActiveSection('events')}
          >
            <Calendar size={14} /> Events
          </button>
          <button 
            className={`btn btn-sm ${activeSection === 'announcements' ? 'btn-navy' : ''}`}
            style={{ background: activeSection === 'announcements' ? 'var(--navy)' : '#fff', color: activeSection === 'announcements' ? '#fff' : 'var(--navy)', border: '2px solid var(--lgray)' }}
            onClick={() => setActiveSection('announcements')}
          >
            <FileText size={14} /> Announcements
          </button>
          <button 
            className={`btn btn-sm ${activeSection === 'documents' ? 'btn-navy' : ''}`}
            style={{ background: activeSection === 'documents' ? 'var(--navy)' : '#fff', color: activeSection === 'documents' ? '#fff' : 'var(--navy)', border: '2px solid var(--lgray)' }}
            onClick={() => setActiveSection('documents')}
          >
            <FileText size={14} /> Documents
          </button>
          <button 
            className={`btn btn-sm ${activeSection === 'branches' ? 'btn-navy' : ''}`}
            style={{ background: activeSection === 'branches' ? 'var(--navy)' : '#fff', color: activeSection === 'branches' ? '#fff' : 'var(--navy)', border: '2px solid var(--lgray)' }}
            onClick={() => setActiveSection('branches')}
          >
            <Users size={14} /> Branches
          </button>
        </div>
      </div>

      {activeSection === 'events' && (
        <div className="card">
          <div className="reg-header">
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Events</div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>Create and edit events</div>
            </div>
            <button className="btn btn-gold btn-sm" onClick={() => setShowEventForm(!showEventForm)}>
              <Plus size={14} /> {showEventForm ? 'Cancel' : 'New Event'}
            </button>
          </div>
          {showEventForm && (
            <div className="reg-panel open">
              <div className="divider"></div>
              <div className="fg"><label>Event Title *</label><input type="text" value={eventData.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} placeholder="e.g. Annual Reunion" /></div>
              <div className="fg"><label>Description</label><input type="text" value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} placeholder="Event details..." /></div>
              <div className="fg"><label>Start Date *</label><input type="date" value={eventData.startDate} onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })} /></div>
              <div className="fg"><label>End Date *</label><input type="date" value={eventData.endDate} onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })} /></div>
              <div className="fg"><label>Location *</label><input type="text" value={eventData.location} onChange={(e) => setEventData({ ...eventData, location: e.target.value })} placeholder="e.g. JOPACC Campus" /></div>
              <div className="fg"><label>Status</label><HeroSelect value={eventData.status} onChange={(status) => setEventData({ ...eventData, status: status as 'upcoming' | 'past' })} options={[{ value: 'upcoming', label: 'Upcoming' }, { value: 'past', label: 'Past' }]} ariaLabel="Event status" /></div>
              <button className="btn btn-navy" onClick={handleCreateEvent}>Create Event →</button>
            </div>
          )}
          {events.map(event => (
            <div key={event.id} className="card" style={{ position: 'relative', marginTop: 10 }}>
              <button className="del-btn" style={{ position: 'absolute', top: 12, right: 12 }} onClick={() => onEventsChange(events.filter(e => e.id !== event.id))}><Trash2 size={14} /></button>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 5 }}>{event.title}</div>
              <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8 }}>{event.description}</div>
              <div style={{ display: 'flex', gap: 15, fontSize: 12, color: 'var(--gray)', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {event.startDate} - {event.endDate}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {event.location}</span>
              </div>
              <div style={{ marginTop: 10 }}><span className={`status-badge ${event.status}`}>{event.status}</span></div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'announcements' && (
        <div className="card">
          <div className="reg-header">
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Announcements</div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>Create and edit announcements</div>
            </div>
            <button className="btn btn-gold btn-sm" onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}>
              <Plus size={14} /> {showAnnouncementForm ? 'Cancel' : 'New Post'}
            </button>
          </div>
          {showAnnouncementForm && (
            <div className="reg-panel open">
              <div className="divider"></div>
              <div className="fg"><label>Title *</label><input type="text" value={announcementData.title} onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })} placeholder="e.g. Annual Meeting Schedule" /></div>
              <div className="fg"><label>Content *</label><textarea value={announcementData.content} onChange={(e) => setAnnouncementData({ ...announcementData, content: e.target.value })} placeholder="Announcement details..." style={{ width: '100%', minHeight: '100px', resize: 'vertical' }} /></div>
              <div className="fg"><label>Priority</label><HeroSelect value={announcementData.priority} onChange={(priority) => setAnnouncementData({ ...announcementData, priority: priority as 'normal' | 'urgent' })} options={[{ value: 'normal', label: 'Normal' }, { value: 'urgent', label: 'Urgent' }]} ariaLabel="Announcement priority" /></div>
              <button className="btn btn-navy" onClick={handleCreateAnnouncement}>Post Announcement →</button>
            </div>
          )}
          {announcements.map(announcement => (
            <div key={announcement.id} className="card" style={{ borderLeft: announcement.priority === 'urgent' ? '4px solid var(--err)' : '4px solid var(--gold)', position: 'relative', marginTop: 10 }}>
              <button className="del-btn" style={{ position: 'absolute', top: 12, right: 12 }} onClick={() => onAnnouncementsChange(announcements.filter(a => a.id !== announcement.id))}><Trash2 size={14} /></button>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 5 }}>{announcement.title}</div>
              <div style={{ fontSize: 14, color: 'var(--dark)', lineHeight: 1.5, marginBottom: 8 }}>{announcement.content}</div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>{announcement.createdAt} · by {announcement.createdBy}</div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'documents' && (
        <div className="card">
          <div className="reg-header">
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Documents</div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>Upload and manage files</div>
            </div>
            <button className="btn btn-gold btn-sm" onClick={() => setShowDocumentForm(!showDocumentForm)}>
              <Plus size={14} /> {showDocumentForm ? 'Cancel' : 'Upload'}
            </button>
          </div>
          {showDocumentForm && (
            <div className="reg-panel open">
              <div className="divider"></div>
              <div className="fg"><label>Document Title *</label><input type="text" value={documentData.title} onChange={(e) => setDocumentData({ ...documentData, title: e.target.value })} placeholder="e.g. Annual Meeting Minutes" /></div>
              <div className="fg"><label>Type</label><HeroSelect value={documentData.type} onChange={(type) => setDocumentData({ ...documentData, type: type as 'minutes' | 'constitution' | 'report' | 'other' })} options={[{ value: 'minutes', label: 'Meeting Minutes' }, { value: 'constitution', label: 'Constitution' }, { value: 'report', label: 'Report' }, { value: 'other', label: 'Other' }]} ariaLabel="Document type" /></div>
              <div className="fg"><label>File URL *</label><input type="text" value={documentData.fileUrl} onChange={(e) => setDocumentData({ ...documentData, fileUrl: e.target.value })} placeholder="e.g. https://cloudinary.com/..." /><div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 4 }}>Enter Cloudinary or file storage URL</div></div>
              <button className="btn btn-navy" onClick={handleCreateDocument}>Upload Document →</button>
            </div>
          )}
          {documents.map(doc => (
            <div key={doc.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginTop: 10 }}>
              <button className="del-btn" style={{ position: 'absolute', top: 12, right: 12 }} onClick={() => onDocumentsChange(documents.filter(d => d.id !== doc.id))}><Trash2 size={14} /></button>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 3 }}>{doc.title}</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>{doc.type} · {doc.uploadedAt}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'branches' && (
        <div className="card">
          <div className="reg-header">
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Branches</div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>Create and manage regional chapters</div>
            </div>
            <button className="btn btn-gold btn-sm" onClick={() => setShowBranchForm(!showBranchForm)}>
              <Plus size={14} /> {showBranchForm ? 'Cancel' : 'New Branch'}
            </button>
          </div>
          {showBranchForm && (
            <div className="reg-panel open">
              <div className="divider"></div>
              <div className="fg"><label>Branch Name *</label><input type="text" value={branchData.name} onChange={(e) => setBranchData({ ...branchData, name: e.target.value })} placeholder="e.g. Douala Chapter" /></div>
              <div className="fg"><label>Region *</label><input type="text" value={branchData.region} onChange={(e) => setBranchData({ ...branchData, region: e.target.value })} placeholder="e.g. Littoral Region" /></div>
              <div className="fg"><label>Leader ID (optional)</label><input type="text" value={branchData.leaderId} onChange={(e) => setBranchData({ ...branchData, leaderId: e.target.value })} placeholder="Enter user ID" /></div>
              <button className="btn btn-navy" onClick={handleCreateBranch}>Create Branch →</button>
            </div>
          )}
          {branches.map(branch => (
            <div key={branch.id} className="card" style={{ position: 'relative', marginTop: 10 }}>
              <button className="del-btn" style={{ position: 'absolute', top: 12, right: 12 }} onClick={() => onBranchesChange(branches.filter(b => b.id !== branch.id))}><Trash2 size={14} /></button>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 5 }}>{branch.name}</div>
              <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8 }}>{branch.region}</div>
              <div style={{ display: 'flex', gap: 15, fontSize: 12, color: 'var(--gray)', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><UserPlus size={12} /> {branch.memberCount} members</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Created {branch.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
