'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, Calendar, FileText, LogOut, Plus, Trash2, Calendar as CalendarIcon, Megaphone, FileText as FileIcon, Building2, X, Menu, MapPin, UserPlus, Clock, Image as ImageIcon, ExternalLink, LoaderCircle, GraduationCap, BarChart3, DollarSign, CreditCard } from 'lucide-react';
import { User, Event, Announcement, Document, Branch, Photo, Batch } from '@/types';
import Toast from '@/components/Toast';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const DonutChart = ({ data, size = 180, strokeWidth = 16 }: { data: Array<{ label: string; value: number; color: string }>; size?: number; strokeWidth?: number }) => {
  const total = data.reduce((sum, item) => sum + Math.max(item.value, 0), 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', overflow: 'visible' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(148, 163, 184, 0.18)" strokeWidth={strokeWidth} />
      {data.map((item) => {
        const pct = (item.value / total) * 100;
        const dash = (pct / 100) * circumference;
        const circle = (
          <circle
            key={item.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
        offset += dash;
        return circle;
      })}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{ fill: '#f8fafc', fontWeight: 800, fontSize: '18px' }}>
        {total}
      </text>
    </svg>
  );
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'overview' | 'events' | 'announcements' | 'documents' | 'branches' | 'photos' | 'batches' | 'statistics' | 'registrations' | 'contributions'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [registrations, setRegistrations] = useState<Array<any>>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [stats, setStats] = useState<{ users: number; branches: number; events: number; announcements: number; documents: number; batches?: number } | null>(null);
  const [adminToken] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('jopesa_admin_token') || '';
  });
  const [uploading, setUploading] = useState(false);
  const [isSavingEvent, setIsSavingEvent] = useState(false);
  const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false);
  const [isCreatingDocument, setIsCreatingDocument] = useState(false);
  const [isSavingBranch, setIsSavingBranch] = useState(false);
  const [isSavingBatch, setIsSavingBatch] = useState(false);
  const [isSavingContribution, setIsSavingContribution] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'warning' | 'error' }>({ show: false, message: '', type: 'success' });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; title: string; message: string; type: 'event' | 'announcement' | 'branch' | 'document' | 'photo' | 'batch' | 'registration' | 'contribution' | null; id: string | null; loading: boolean }>({ open: false, title: '', message: '', type: null, id: null, loading: false });
  const [branchStatsModal, setBranchStatsModal] = useState(false);
  const [batchStatsModal, setBatchStatsModal] = useState(false);
  
  // Contributions state
  const [contributions, setContributions] = useState<Array<any>>([]);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [editingContributionId, setEditingContributionId] = useState<string | null>(null);
  const [contributionData, setContributionData] = useState({
    title: '',
    type: 'EVENT_REGISTRATION' as 'EVENT_REGISTRATION' | 'ANNUAL_FEE' | 'GENERAL' | 'PROJECT' | 'OTHER',
    description: '',
    eventId: '' as string,
    installments: [] as Array<{ id: string; label: string; amount: number; dueDate: string }>,
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE'
  });
  const [paymentModal, setPaymentModal] = useState<{ open: boolean; contributionId: string | null; contributionTitle: string }>({ open: false, contributionId: null, contributionTitle: '' });
  const [contributionPayments, setContributionPayments] = useState<Array<any>>([]);

  useEffect(() => {
    const loadPayments = async () => {
      if (!paymentModal.open || !paymentModal.contributionId) return;
      try {
        const res = await fetch(`${apiBaseUrl}/admin/contributions/${paymentModal.contributionId}/payments`, {
          headers: getAuthHeaders(adminToken),
        });
        if (!res.ok) throw new Error('Unable to load payments');
        const json = await res.json();
        setContributionPayments(Array.isArray(json) ? json : (json?.data ?? []));
      } catch (err) {
        console.error('Load payments failed', err);
        showToastMessage('Could not load payments for this contribution.', 'error');
      }
    };
    loadPayments();
  }, [paymentModal.open, paymentModal.contributionId]);

  // Event management
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    batchIds: [] as string[],
    isVirtual: false,
    meetLink: '',
    images: [] as string[],
    status: 'upcoming' as 'upcoming' | 'past',
    registrationForm: [] as Array<{ id: string; label: string; type: string; required: boolean; options?: Array<{ label: string; value: string }> }> ,
    eventType: 'reunion' as 'reunion' | 'seminar' | 'workshop' | 'networking' | 'other'
  });
  const [eventImageFiles, setEventImageFiles] = useState<File[]>([]);
  const [showRegistrationFormModal, setShowRegistrationFormModal] = useState(false);

  // Announcement management
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: '',
    type: 'NEWS' as 'NEWS' | 'UPDATE' | 'EVENT' | 'OPPORTUNITY' | 'WARNING',
    isPinned: false,
    imageUrl: ''
  });

  // Document management
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentData, setDocumentData] = useState({
    title: '',
    description: '',
    category: 'General',
    fileType: 'OTHER' as 'PDF' | 'IMAGE' | 'PRESENTATION' | 'SPREADSHEET' | 'VIDEO' | 'OTHER',
    tags: ''
  });

  // Branch management
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [branchData, setBranchData] = useState({
    name: '',
    code: '',
    region: '',
    leaderId: ''
  });

  // Batch management
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  const [batchData, setBatchData] = useState({
    year: '',
    name: '',
    season: ''
  });

  // Photo management
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [statisticsFilters, setStatisticsFilters] = useState({
    search: '',
    branchId: 'all',
    batchId: 'all',
    role: 'all',
  });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getAuthHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  const normalizeList = (json: unknown) => {
    if (typeof json !== 'object' || json === null) return [];
    const value = json as { data?: unknown; items?: unknown };
    if (Array.isArray(value.data)) return value.data;
    if (Array.isArray(value)) return value;
    return Array.isArray(value.items) ? value.items : [];
  };

  const isVideoMediaUrl = (value?: string) => {
    if (!value) return false;
    return /\.(mp4|mov|webm|m4v|avi|mkv|ogg|3gp)(\?.*)?$/i.test(value) || value.includes('/video/');
  };

  const branchStats = branches.map((branch) => {
    const members = users.filter((user) => user.branchId === branch.id);
    return {
      ...branch,
      usersCount: members.length || Number(branch.memberCount || 0),
      alumniCount: members.filter((user) => user.role === 'member').length,
      leaderCount: members.filter((user) => user.role === 'branch_leader').length,
    };
  });

  const batchStats = batches.map((batch) => ({
    ...batch,
    eventCount: events.filter((event) => (
      Array.isArray(event.batches) && event.batches.some((eventBatch) => eventBatch.id === batch.id)
    ) || event.batchId === batch.id).length,
  }));

  const filteredUsers = users.filter((user) => {
    const matchesSearch = !statisticsFilters.search || `${user.name} ${user.email}`.toLowerCase().includes(statisticsFilters.search.toLowerCase());
    const matchesBranch = statisticsFilters.branchId === 'all' || user.branchId === statisticsFilters.branchId;
    const matchesRole = statisticsFilters.role === 'all' || user.role === statisticsFilters.role;
    const matchesBatch = statisticsFilters.batchId === 'all' || (() => {
      const batchMatch = batches.find((batch) => batch.id === statisticsFilters.batchId);
      if (!batchMatch) return true;
      const relatedEvents = events.filter((event) => (
        Array.isArray(event.batches) && event.batches.some((eventBatch) => eventBatch.id === batchMatch.id)
      ) || event.batchId === batchMatch.id);
      return relatedEvents.some((event) => (
        Array.isArray(event.batches) && event.batches.some((eventBatch) => eventBatch.id === batchMatch.id)
      ) || event.batchId === batchMatch.id);
    })();
    return matchesSearch && matchesBranch && matchesRole && matchesBatch;
  });

  const statsSummary = {
    totalUsers: users.length,
    totalAlumni: users.filter((user) => user.role === 'member').length,
    totalAdmins: users.filter((user) => user.role === 'admin').length,
    totalLeaders: users.filter((user) => user.role === 'branch_leader').length,
    totalBranches: branches.length,
    totalBatches: batches.length,
    totalEvents: events.length,
    totalContributions: contributions.length,
  };

  const isWithinDateRange = (value: string | undefined, start: string, end: string) => {
    if (!value) return true;
    const time = new Date(value).getTime();
    if (Number.isNaN(time)) return true;
    if (start && time < new Date(start).getTime()) return false;
    if (end) {
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);
      if (time > endDate.getTime()) return false;
    }
    return true;
  };

  const filteredEventsByDate = events.filter((event) => isWithinDateRange(event.startDate, dateRange.start, dateRange.end));

  const roleDistribution = [
    { label: 'Alumni', value: statsSummary.totalAlumni, color: '#f9c74f' },
    { label: 'Leaders', value: statsSummary.totalLeaders, color: '#7dd3fc' },
    { label: 'Admins', value: statsSummary.totalAdmins, color: '#34d399' },
  ];

  const branchRanking = [...branchStats].sort((a, b) => b.usersCount - a.usersCount).slice(0, 3);
  const batchRanking = [...batchStats].sort((a, b) => b.eventCount - a.eventCount).slice(0, 3);

  const engagementTrend = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const count = filteredEventsByDate.filter((event) => {
      if (!event.startDate) return false;
      const eventDate = new Date(event.startDate);
      return `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}` === monthKey;
    }).length;
    return {
      label: date.toLocaleString('en-US', { month: 'short' }),
      value: count,
    };
  });

  const exportData = (format: 'xls' | 'json') => {
    const payload = {
      generatedAt: new Date().toISOString(),
      summary: statsSummary,
      filters: { ...statisticsFilters, dateRange },
      branches: branchStats,
      batches: batchStats,
      alumni: filteredUsers,
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'jopesa-statistics.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    const rows = [
      ['Metric', 'Value'],
      ['Total users', String(statsSummary.totalUsers)],
      ['Total alumni', String(statsSummary.totalAlumni)],
      ['Total leaders', String(statsSummary.totalLeaders)],
      ['Total admins', String(statsSummary.totalAdmins)],
      ['Total branches', String(statsSummary.totalBranches)],
      ['Total batches', String(statsSummary.totalBatches)],
      ['Total events', String(filteredEventsByDate.length)],
      ['Total contributions', String(statsSummary.totalContributions)],
      ['Date range start', dateRange.start || 'All'],
      ['Date range end', dateRange.end || 'All'],
    ];

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <body>
          <table>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</table>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jopesa-statistics.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const uploadDocumentFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${apiBaseUrl}/upload/document?folder=documents`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Document upload failed');
    }
    return response.json();
  };

  const uploadPhotoFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await fetch(`${apiBaseUrl}/upload/images?folder=event-photos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Photo upload failed');
    }
    return response.json();
  };

  const uploadEventImages = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await fetch(`${apiBaseUrl}/upload/images?folder=events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Images upload failed');
    }
    return response.json();
  };

  useEffect(() => {
    const token = localStorage.getItem('jopesa_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    const fetchAdminData = async () => {
      try {
        const headers = getAuthHeaders(token);
        const [usersRes, branchesRes, eventsRes, announcementsRes, documentsRes, batchesRes, statsRes, photosRes, contributionsRes] = await Promise.all([
          fetch(`${apiBaseUrl}/admin/users?skip=0&take=50`, { headers }),
          fetch(`${apiBaseUrl}/branch?skip=0&take=100`, { headers }),
          fetch(`${apiBaseUrl}/events?skip=0&take=100`, { headers }),
          fetch(`${apiBaseUrl}/announcements?skip=0&take=100`, { headers }),
          fetch(`${apiBaseUrl}/documents?skip=0&take=100`, { headers }),
          fetch(`${apiBaseUrl}/batch?skip=0&take=100`, { headers }),
          fetch(`${apiBaseUrl}/admin/stats`, { headers }),
          fetch(`${apiBaseUrl}/photos?skip=0&take=500`, { headers }),
          fetch(`${apiBaseUrl}/contributions?skip=0&take=200`, { headers }),
        ]);

        if (!usersRes.ok || !branchesRes.ok || !eventsRes.ok || !announcementsRes.ok || !documentsRes.ok || !batchesRes.ok) {
          throw new Error('Dashboard fetch failed');
        }

        const usersJson = await usersRes.json();
        setUsers(normalizeList(usersJson));

        const branchesJson = await branchesRes.json();
        setBranches(normalizeList(branchesJson).map((branch: Record<string, unknown>) => ({
          ...(branch as Record<string, unknown>),
          id: String((branch as { id?: unknown }).id ?? ''),
          name: String((branch as { name?: unknown }).name ?? ''),
          region: String((branch as { description?: unknown }).description ?? ''),
          memberCount: Number((branch as { memberCount?: unknown }).memberCount ?? 0),
          createdAt: (branch as { createdAt?: string }).createdAt ? new Date((branch as { createdAt?: string }).createdAt as string).toLocaleDateString() : '',
        })));

        const eventsJson = await eventsRes.json();
        const normalizedEvents = normalizeList(eventsJson).map((event: Record<string, unknown>) => {
          const imageList = Array.isArray((event as { images?: unknown }).images)
            ? ((event as { images: string[] }).images).filter(Boolean)
            : [];
          const primaryImage = String((event as { image?: unknown }).image ?? '');
          const images = imageList.length > 0
            ? imageList
            : primaryImage
              ? [primaryImage]
              : [];
          return {
            ...(event as Record<string, unknown>),
            id: String((event as { id?: unknown }).id ?? ''),
            title: String((event as { title?: unknown }).title ?? ''),
            description: String((event as { description?: unknown }).description ?? ''),
            startDate: String((event as { startDate?: unknown }).startDate ?? ''),
            endDate: String((event as { endDate?: unknown }).endDate ?? ''),
            location: String((event as { location?: unknown }).location ?? ''),
            image: primaryImage || images[0] || undefined,
            images,
            status: ((event as { status?: string }).status === 'COMPLETED' || (event as { status?: string }).status === 'CANCELLED' ? 'past' : 'upcoming') as 'upcoming' | 'past',
            createdAt: (event as { createdAt?: string }).createdAt ? new Date((event as { createdAt?: string }).createdAt as string).toLocaleDateString() : '',
          };
        });
        setEvents(normalizedEvents);

        if (photosRes.ok) {
          const photosJson = await photosRes.json();
          const normalizedPhotos: Photo[] = normalizeList(photosJson).map((photo: Record<string, unknown>) => ({
            id: String((photo as { id?: unknown }).id ?? ''),
            eventId: String((photo as { eventId?: unknown }).eventId ?? ''),
            url: String((photo as { url?: unknown }).url ?? ''),
            uploadedAt: (photo as { createdAt?: string }).createdAt
              ? new Date((photo as { createdAt?: string }).createdAt as string).toLocaleDateString()
              : '',
          }));
          setPhotos(normalizedPhotos);
          // load contributions
          try {
            const contribJson = await contributionsRes.json();
            setContributions(normalizeList(contribJson));
          } catch (e) {
            setContributions([]);
          }
          // Fetch admin registrations (payments) if the endpoint exists
          try {
            const regsRes = await fetch(`${apiBaseUrl}/admin/registrations?skip=0&take=200`, { headers });
            if (regsRes.ok) {
              const regsJson = await regsRes.json();
              const list = Array.isArray(regsJson?.data) ? regsJson.data : Array.isArray(regsJson) ? regsJson : [];
              setRegistrations(list);
            } else {
              setRegistrations([]);
            }
          } catch (e) {
            setRegistrations([]);
          }
        } else {
          setPhotos([]);
        }

        const announcementsJson = await announcementsRes.json();
        setAnnouncements(normalizeList(announcementsJson).map((announcement: Record<string, unknown>) => ({
          ...(announcement as Record<string, unknown>),
          id: String((announcement as { id?: unknown }).id ?? ''),
          title: String((announcement as { title?: unknown }).title ?? ''),
          content: String((announcement as { content?: unknown }).content ?? ''),
          type: ((announcement as { type?: string }).type || 'NEWS') as Announcement['type'],
          createdAt: (announcement as { createdAt?: string }).createdAt ? new Date((announcement as { createdAt?: string }).createdAt as string).toLocaleDateString() : '',
          createdBy: String((announcement as { createdBy?: unknown }).createdBy || 'Admin'),
        })));

        const documentsJson = await documentsRes.json();
        setDocuments(normalizeList(documentsJson).map((doc: Record<string, unknown>) => ({
          id: String((doc as { id?: unknown }).id ?? ''),
          title: String((doc as { title?: unknown }).title ?? ''),
          type: String((doc as { fileType?: unknown }).fileType || 'OTHER').toLowerCase(),
          fileUrl: String((doc as { fileUrl?: unknown }).fileUrl ?? ''),
          uploadedAt: (doc as { createdAt?: string }).createdAt ? new Date((doc as { createdAt?: string }).createdAt as string).toLocaleDateString() : '',
          uploadedBy: String((doc as { category?: unknown }).category || 'Admin'),
          category: String((doc as { category?: unknown }).category || ''),
          fileType: String((doc as { fileType?: unknown }).fileType || 'OTHER'),
          fileSize: Number((doc as { fileSize?: unknown }).fileSize ?? 0),
          tags: Array.isArray((doc as { tags?: unknown }).tags) ? ((doc as { tags?: unknown }).tags as string[]) : [],
        })));

        const batchesJson = await batchesRes.json();
        const normalizedBatches = normalizeList(batchesJson).map((batch: Record<string, unknown>) => ({
          id: String((batch as { id?: unknown }).id ?? ''),
          year: Number((batch as { year?: unknown }).year ?? 0),
          name: String((batch as { name?: unknown }).name ?? ''),
          season: (batch as { season?: string }).season || '',
          createdAt: (batch as { createdAt?: string }).createdAt ? new Date((batch as { createdAt?: string }).createdAt as string).toLocaleDateString() : '',
        }));
        setBatches(normalizedBatches);

        if (statsRes.ok) {
          const statsJson = await statsRes.json();
          setStats(statsJson);
        }
      } catch (error) {
        console.error('Admin dashboard fetch failed:', error);
        localStorage.removeItem('jopesa_admin_token');
        router.push('/admin');
      }
    };

    fetchAdminData();
  }, [router]);

  useEffect(() => {
    if (!toast.show) return;
    const timer = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [toast.show]);

  useEffect(() => {
    localStorage.setItem('jopesa_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('jopesa_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('jopesa_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('jopesa_branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem('jopesa_photos', JSON.stringify(photos));
  }, [photos]);

  const handleLogout = () => {
    localStorage.removeItem('jopesa_admin_token');
    router.push('/admin');
  };

  const showToastMessage = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };

  const openDeleteModal = (type: 'event' | 'announcement' | 'branch' | 'document' | 'photo' | 'batch' | 'registration' | 'contribution', id: string, title: string, message: string) => {
    setDeleteModal({ open: true, title, message, type, id, loading: false });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, title: '', message: '', type: null, id: null, loading: false });
  };

  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    setEventData({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      batchIds: event.batches?.map((b) => b.id) || (event.batchId ? [event.batchId] : []),
      isVirtual: event.isVirtual || false,
      meetLink: event.meetLink || '',
      images: event.images || [],
      status: (event.status === 'past' ? 'past' : 'upcoming') as 'upcoming' | 'past',
      registrationForm: Array.isArray(event.registrationForm) ? (event.registrationForm as Array<{ id: string; label: string; type: string; required: boolean; options?: Array<{ label: string; value: string }> }>) : [],
      eventType: (event.eventType as 'reunion' | 'seminar' | 'workshop' | 'networking' | 'other') || 'reunion',
    });
    setShowEventForm(true);
  };

  const handleCreateEvent = async () => {
    if (!eventData.title || !eventData.startDate || !eventData.endDate || !eventData.location || eventData.batchIds.length === 0) {
      showToastMessage('Please complete the required event fields before saving.', 'warning');
      return;
    }

    setIsSavingEvent(true);

    let images = [...eventData.images];
    if (eventImageFiles.length > 0) {
      try {
        const uploadResult = await uploadEventImages(eventImageFiles);
        const newUrls = Array.isArray(uploadResult)
          ? uploadResult.map((item: { url?: string; secure_url?: string }) => item.url || item.secure_url || '')
          : [uploadResult.url || uploadResult.secure_url];
        images = [...images, ...newUrls];
      } catch (error) {
        console.error('Images upload failed:', error);
        showToastMessage('The event images could not be uploaded. Please try again.', 'error');
        setIsSavingEvent(false);
        return;
      }
    }

    const payload = {
      title: eventData.title,
      description: eventData.description,
      startDate: new Date(eventData.startDate).toISOString(),
      endDate: new Date(eventData.endDate).toISOString(),
      location: eventData.location,
      batchIds: eventData.batchIds,
      isVirtual: eventData.isVirtual,
      meetLink: eventData.meetLink || undefined,
      image: images.length > 0 ? images[0] : undefined,
      images: images.length > 0 ? images : undefined,
      eventType: eventData.eventType,
      registrationForm: eventData.registrationForm.length > 0 ? eventData.registrationForm : undefined,
      status: eventData.status === 'past' ? 'COMPLETED' : 'PUBLISHED',
    };

    try {
      if (editingEventId) {
        const response = await fetch(`${apiBaseUrl}/events/${editingEventId}`, {
          method: 'PUT',
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error('Unable to update event');
        }
        const updatedEvent = await response.json();
        setEvents(events.map((event) => (event.id === editingEventId ? {
          ...event,
          ...updatedEvent,
          status: updatedEvent.status === 'COMPLETED' || updatedEvent.status === 'CANCELLED' ? 'past' : 'upcoming',
          createdAt: updatedEvent.createdAt ? new Date(updatedEvent.createdAt).toLocaleDateString() : event.createdAt,
        } : event)));
        showToastMessage('Event updated successfully.', 'success');
        setEditingEventId(null);
      } else {
        const response = await fetch(`${apiBaseUrl}/events`, {
          method: 'POST',
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error('Unable to create event');
        }
        const createdEvent = await response.json();
        setEvents([{
          ...createdEvent,
          status: createdEvent.status === 'COMPLETED' || createdEvent.status === 'CANCELLED' ? 'past' : 'upcoming',
          createdAt: createdEvent.createdAt ? new Date(createdEvent.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
        }, ...events]);
        showToastMessage('Event created successfully.', 'success');
      }
    } catch (error) {
      console.error('Event save failed:', error);
      showToastMessage('The event could not be saved. Please try again.', 'error');
    } finally {
      setIsSavingEvent(false);
    }

    setEventData({ title: '', description: '', startDate: '', endDate: '', location: '', batchIds: [], isVirtual: false, meetLink: '', images: [], status: 'upcoming', registrationForm: [], eventType: 'reunion' });
    setEventImageFiles([]);
    setShowEventForm(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.type || !deleteModal.id) return;

    setDeleteModal(prev => ({ ...prev, loading: true }));

    try {
      switch (deleteModal.type) {
        case 'event': {
          const response = await fetch(`${apiBaseUrl}/events/${deleteModal.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(adminToken),
          });
          if (!response.ok) throw new Error('Unable to delete event');
          setEvents(prev => prev.filter(event => event.id !== deleteModal.id));
          break;
        }
        case 'announcement': {
          const response = await fetch(`${apiBaseUrl}/announcements/${deleteModal.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(adminToken),
          });
          if (!response.ok) throw new Error('Unable to delete announcement');
          setAnnouncements(prev => prev.filter(announcement => announcement.id !== deleteModal.id));
          break;
        }
        case 'branch': {
          const response = await fetch(`${apiBaseUrl}/branch/${deleteModal.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(adminToken),
          });
          if (!response.ok) throw new Error('Unable to delete branch');
          setBranches(prev => prev.filter(branch => branch.id !== deleteModal.id));
          break;
        }
        case 'document': {
          const response = await fetch(`${apiBaseUrl}/documents/${deleteModal.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(adminToken),
          });
          if (!response.ok) throw new Error('Unable to delete document');
          setDocuments(prev => prev.filter(doc => doc.id !== deleteModal.id));
          break;
        }
        case 'photo': {
          const response = await fetch(`${apiBaseUrl}/photos/${deleteModal.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(adminToken),
          });
          if (!response.ok && response.status !== 204) throw new Error('Unable to delete photo');
          setPhotos(prev => prev.filter(photo => photo.id !== deleteModal.id));
          break;
        }
        case 'batch': {
          const response = await fetch(`${apiBaseUrl}/batch/${deleteModal.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(adminToken),
          });
          if (!response.ok) throw new Error('Unable to delete batch');
          setBatches(prev => prev.filter(batch => batch.id !== deleteModal.id));
          break;
        }
        case 'registration': {
          const response = await fetch(`${apiBaseUrl}/admin/registrations/${deleteModal.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(adminToken),
          });
          if (!response.ok && response.status !== 204) throw new Error('Unable to delete registration');
          setRegistrations(prev => prev.filter((reg) => reg.id !== deleteModal.id));
          break;
        }
      }
      closeDeleteModal();
    } catch (error) {
      console.error('Delete failed:', error);
      showToastMessage('The selected item could not be deleted. Please try again.', 'error');
    } finally {
      setDeleteModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleUpdateRegistrationStatus = async (registrationId: string, status: 'PENDING' | 'APPROVED' | 'FLAGGED' | 'DECLINED') => {
    try {
      const response = await fetch(`${apiBaseUrl}/admin/registrations/${registrationId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(adminToken),
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Unable to update registration status');
      }

      const updatedRegistration = await response.json();
      setRegistrations((prev) => prev.map((reg) => (reg.id === registrationId ? updatedRegistration : reg)));
      showToastMessage(`Registration status updated to ${status.toLowerCase()}.`, 'success');
    } catch (error) {
      console.error('Registration status update failed:', error);
      showToastMessage('Could not update registration status. Please try again.', 'error');
    }
  };

  const handleUploadPhotos = async () => {
    if (!selectedEventId) {
      alert('Please select an event');
      return;
    }
    if (photoFiles.length === 0) {
      alert('Please select at least one photo');
      return;
    }

    try {
      setUploading(true);
      const uploadResult = await uploadPhotoFiles(photoFiles);
      const uploadedItems = Array.isArray(uploadResult) ? uploadResult : [uploadResult];
      const urls = uploadedItems
        .map((item: { url?: string; secure_url?: string }) => item.url || item.secure_url || '')
        .filter(Boolean);
      const publicIds = uploadedItems
        .map((item: { publicId?: string; public_id?: string }) => item.publicId || item.public_id || '')
        .filter(Boolean);

      if (urls.length === 0) {
        throw new Error('No media URLs returned from Cloudinary');
      }

      const response = await fetch(`${apiBaseUrl}/photos/bulk`, {
        method: 'POST',
        headers: getAuthHeaders(adminToken),
        body: JSON.stringify({
          eventId: selectedEventId,
          urls,
          publicIds: publicIds.length === urls.length ? publicIds : undefined,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || 'Unable to save photos');
      }

      const createdPhotos = await response.json();
      const photoList = Array.isArray(createdPhotos) ? createdPhotos : normalizeList(createdPhotos);
      const mapped: Photo[] = photoList.map((photo: Record<string, unknown>) => ({
        id: String(photo.id ?? ''),
        eventId: String(photo.eventId ?? selectedEventId),
        url: String(photo.url ?? ''),
        uploadedAt: photo.createdAt
          ? new Date(String(photo.createdAt)).toLocaleDateString()
          : new Date().toLocaleDateString(),
      }));

      setPhotos([...mapped, ...photos]);
      setPhotoFiles([]);
      setPhotoPreviewUrls([]);
      setSelectedEventId('');
      setShowPhotoForm(false);
      showToastMessage('Photos uploaded successfully.', 'success');
    } catch (error) {
      console.error('Photo upload failed:', error);
      showToastMessage(
        error instanceof Error ? error.message : 'Failed to upload photos.',
        'error',
      );
    } finally {
      setUploading(false);
    }
  };

  const removePhotoSelection = (index: number) => {
    setPhotoFiles((prev) => prev.filter((_, idx) => idx !== index));
    setPhotoPreviewUrls((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handlePhotoSelection = (files: FileList | null) => {
    const maxPhotoSizeBytes = 5 * 1024 * 1024 * 1024;
    const nextFiles = Array.from(files || []);
    const validFiles = nextFiles.filter((file) => file.size <= maxPhotoSizeBytes);
    const oversizedFiles = nextFiles.filter((file) => file.size > maxPhotoSizeBytes);

    if (oversizedFiles.length > 0) {
      showToastMessage(`Some selected files are larger than 5 GB and were not added.`, 'warning');
    }

    setPhotoFiles(validFiles);
    const urls = validFiles.map((file) => URL.createObjectURL(file));
    setPhotoPreviewUrls(urls);
  };

  const handleEventImageSelection = (files: FileList | null) => {
    const maxEventImageSizeBytes = 5 * 1024 * 1024 * 1024;
    const nextFiles = Array.from(files || []);
    const validFiles = nextFiles.filter((file) => file.size <= maxEventImageSizeBytes);
    if (validFiles.length !== nextFiles.length) {
      showToastMessage('Some event images are larger than 5 GB and were not added.', 'warning');
    }
    setEventImageFiles(validFiles);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncementId(announcement.id);
    setAnnouncementData({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type || 'NEWS',
      isPinned: !!(announcement as { isPinned?: boolean }).isPinned,
      imageUrl: announcement.imageUrl || ''
    });
    setShowAnnouncementForm(true);
  };

  const handleSaveAnnouncement = async () => {
    if (!announcementData.title || !announcementData.content) {
      showToastMessage('Please fill in the announcement title and content before saving.', 'warning');
      return;
    }

    setIsSavingAnnouncement(true);

    try {
      if (editingAnnouncementId) {
        const response = await fetch(`${apiBaseUrl}/announcements/${editingAnnouncementId}`, {
          method: 'PUT',
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify({
            title: announcementData.title,
            content: announcementData.content,
            type: announcementData.type,
            isPinned: announcementData.isPinned,
            image: announcementData.imageUrl || undefined,
          }),
        });
        if (!response.ok) {
          throw new Error('Unable to update announcement');
        }
        const updatedAnnouncement = await response.json();
        setAnnouncements(announcements.map(a => a.id === editingAnnouncementId ? {
          ...a,
          ...updatedAnnouncement,
          createdAt: updatedAnnouncement.createdAt ? new Date(updatedAnnouncement.createdAt).toLocaleDateString() : a.createdAt,
        } : a));
        setEditingAnnouncementId(null);
      } else {
        const response = await fetch(`${apiBaseUrl}/announcements`, {
          method: 'POST',
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify({
            title: announcementData.title,
            content: announcementData.content,
            type: announcementData.type,
            isPinned: announcementData.isPinned,
            image: announcementData.imageUrl || undefined,
          }),
        });
        if (!response.ok) {
          throw new Error('Unable to create announcement');
        }
        const newAnnouncement = await response.json();
        setAnnouncements([{ ...newAnnouncement,
          createdAt: newAnnouncement.createdAt ? new Date(newAnnouncement.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
        }, ...announcements]);
      }
    } catch (error) {
      console.error('Announcement save failed:', error);
      showToastMessage('The announcement could not be saved. Please try again.', 'error');
    } finally {
      setIsSavingAnnouncement(false);
    }

    setAnnouncementData({ title: '', content: '', type: 'NEWS', isPinned: false, imageUrl: '' });
    setShowAnnouncementForm(false);
  };

  const handleCreateDocument = async () => {
    if (!documentData.title || !documentFile) {
      showToastMessage('Please provide a document title and file before uploading.', 'warning');
      return;
    }

    setIsCreatingDocument(true);

    try {
      const uploadResponse = await uploadDocumentFile(documentFile);
      const fileUrl = uploadResponse.url || uploadResponse.secure_url;
      const fileType = documentData.fileType;
      const fileSize = documentFile.size;
      const response = await fetch(`${apiBaseUrl}/documents`, {
        method: 'POST',
        headers: getAuthHeaders(adminToken),
        body: JSON.stringify({
          title: documentData.title,
          description: documentData.description || undefined,
          fileUrl,
          fileType,
          fileSize,
          category: documentData.category,
          tags: documentData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      });
      if (!response.ok) {
        throw new Error('Unable to create document');
      }
      const createdDoc = await response.json();
      setDocuments([{
        id: createdDoc.id,
        title: createdDoc.title,
        type: createdDoc.fileType.toLowerCase(),
        fileUrl: createdDoc.fileUrl,
        uploadedAt: createdDoc.createdAt ? new Date(createdDoc.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
        uploadedBy: createdDoc.category,
        category: createdDoc.category,
        fileType: createdDoc.fileType,
        fileSize: createdDoc.fileSize,
        tags: createdDoc.tags || [],
      }, ...documents]);
      setDocumentData({ title: '', description: '', category: 'General', fileType: 'OTHER', tags: '' });
      setDocumentFile(null);
      setShowDocumentForm(false);
    } catch (error) {
      console.error('Document upload failed:', error);
      showToastMessage('The document could not be uploaded. Please try again.', 'error');
    } finally {
      setIsCreatingDocument(false);
    }
  };

  const handleEditBranch = (branch: Branch) => {
    setEditingBranchId(branch.id);
    setBranchData({
      name: branch.name,
      code: (branch as { code?: string }).code || '',
      region: branch.region,
      leaderId: branch.leaderId || ''
    });
    setShowBranchForm(true);
  };

  const handleCreateBranch = async () => {
    if (!branchData.name || !branchData.region || !branchData.code) {
      showToastMessage('Please complete all branch fields before saving.', 'warning');
      return;
    }

    setIsSavingBranch(true);

    if (editingBranchId) {
      const response = await fetch(`${apiBaseUrl}/branch/${editingBranchId}`, {
        method: 'PUT',
        headers: getAuthHeaders(adminToken),
        body: JSON.stringify({
          name: branchData.name,
          code: branchData.code,
          description: branchData.region,
        }),
      });

      if (response.ok) {
        const updatedBranch = await response.json();
        setBranches(branches.map(b => b.id === editingBranchId ? { ...b, ...updatedBranch, region: updatedBranch.description || branchData.region } : b));
      } else {
        showToastMessage('The branch could not be updated. Please try again.', 'error');
      }
      setEditingBranchId(null);
    } else {
      const response = await fetch(`${apiBaseUrl}/branch`, {
        method: 'POST',
        headers: getAuthHeaders(adminToken),
        body: JSON.stringify({
          name: branchData.name,
          code: branchData.code,
          description: branchData.region,
        }),
      });

      if (response.ok) {
        const createdBranch = await response.json();
        setBranches([{ ...createdBranch, region: createdBranch.description || branchData.region, memberCount: 0, createdAt: createdBranch.createdAt ? new Date(createdBranch.createdAt).toLocaleDateString() : '' }, ...branches]);
      } else {
        showToastMessage('The branch could not be created. Please try again.', 'error');
      }
    }

    setBranchData({ name: '', code: '', region: '', leaderId: '' });
    setShowBranchForm(false);
    setIsSavingBranch(false);
  };

  const handleEditBatch = (batch: Batch) => {
    setEditingBatchId(batch.id);
    setBatchData({
      year: String(batch.year),
      name: batch.name,
      season: batch.season || ''
    });
    setShowBatchForm(true);
  };

  const handleCreateBatch = async () => {
    if (!batchData.year || !batchData.name) {
      showToastMessage('Please provide a batch year and name before saving.', 'warning');
      return;
    }

    setIsSavingBatch(true);

    try {
      const payload = {
        year: Number(batchData.year),
        name: batchData.name,
        season: batchData.season || undefined,
      };

      if (editingBatchId) {
        const response = await fetch(`${apiBaseUrl}/batch/${editingBatchId}`, {
          method: 'PUT',
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Unable to update batch');
        }

        const updatedBatch = await response.json();
        setBatches(batches.map((batch) => (batch.id === editingBatchId ? { ...batch, ...updatedBatch } : batch)));
        showToastMessage('Batch updated successfully.', 'success');
        setEditingBatchId(null);
      } else {
        const response = await fetch(`${apiBaseUrl}/batch`, {
          method: 'POST',
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Unable to create batch');
        }

        const createdBatch = await response.json();
        setBatches([{ ...createdBatch, createdAt: createdBatch.createdAt ? new Date(createdBatch.createdAt).toLocaleDateString() : '' }, ...batches]);
        showToastMessage('Batch created successfully.', 'success');
      }
    } catch (error) {
      console.error('Batch save failed:', error);
      showToastMessage('The batch could not be saved. Please try again.', 'error');
    } finally {
      setIsSavingBatch(false);
      setBatchData({ year: '', name: '', season: '' });
      setShowBatchForm(false);
    }
  };

  const handleDeleteBatch = (id: string) => {
    openDeleteModal('batch', id, 'Delete batch?', 'This action will remove the batch from the system and may affect alumni and events that currently use it.');
  };

  return (
    <div className="animate-float-in" style={{ minHeight: '100vh', display: 'flex', background: 'var(--off)' }}>
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      {deleteModal.open && (
        <div onClick={closeDeleteModal} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '480px', background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 18px 60px rgba(0,0,0,0.25)' }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--navy)', marginBottom: '8px' }}>{deleteModal.title}</div>
            <div style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.6 }}>{deleteModal.message}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
              <button onClick={closeDeleteModal} disabled={deleteModal.loading} style={{ padding: '10px 16px', background: 'var(--off)', color: 'var(--navy)', border: '1px solid var(--lgray)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={handleConfirmDelete} disabled={deleteModal.loading} style={{ padding: '10px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {deleteModal.loading ? <><LoaderCircle size={16} className="loading-spinner" /> Deleting...</> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.5)', 
            zIndex: 40
          }}
          className="md:hidden"
        />
      )}
      
      <aside 
        style={{ 
          width: '260px', 
          background: 'linear-gradient(180deg, var(--navy), var(--navy2))', 
          padding: '24px', 
          display: 'flex', 
          flexDirection: 'column', 
          position: 'fixed', 
          left: 0,
          top: 0, 
          bottom: 0,
          zIndex: 50,
          transition: 'transform 0.3s ease'
        }}
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <img 
            src="/logo.png" 
            alt="JOPESA Logo" 
            style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--gold)', objectFit: 'cover' }}
          />
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--gold2)', letterSpacing: '0.8px', margin: 0 }}>JOPESA</h1>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Admin Panel</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <button
            onClick={() => { setActiveSection('overview'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'overview' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'overview' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <Shield size={18} /> Overview
          </button>
          <button
            onClick={() => { setActiveSection('events'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'events' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'events' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <Calendar size={18} /> Events
          </button>
          <button
            onClick={() => { setActiveSection('announcements'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'announcements' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'announcements' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <Megaphone size={18} /> Announcements
          </button>
          <button
            onClick={() => { setActiveSection('documents'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'documents' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'documents' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <FileText size={18} /> Documents
          </button>
          <button
            onClick={() => { setActiveSection('branches'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'branches' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'branches' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <Users size={18} /> Branches
          </button>
          <button
            onClick={() => { setActiveSection('batches'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'batches' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'batches' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <GraduationCap size={18} /> Batches
          </button>
          <button
            onClick={() => { setActiveSection('photos'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'photos' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'photos' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <ImageIcon size={18} /> Photos
          </button>
          <button
            onClick={() => { setActiveSection('registrations'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'registrations' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'registrations' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <UserPlus size={18} /> Registrations
          </button>
          <button
            onClick={() => { setActiveSection('contributions'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'contributions' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'contributions' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <DollarSign size={18} /> Contributions
          </button>
     <button
            onClick={() => { setActiveSection('statistics'); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: activeSection === 'statistics' ? 'rgba(200,150,12,0.2)' : 'transparent', color: activeSection === 'statistics' ? 'var(--gold2)' : 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
          >
            <BarChart3 size={18} /> Statistics
          </button>
        </nav>

        <button
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', marginTop: 'auto' }}
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main style={{ flex: 1, marginLeft: '260px', padding: '32px 32px 32px 32px', maxWidth: '1200px', boxSizing: 'border-box' }} className="admin-main">
        {/* Mobile hamburger menu */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="admin-hamburger"
          style={{ 
            display: 'none',
            alignItems: 'center', 
            justifyContent: 'center',
            width: '40px', 
            height: '40px', 
            borderRadius: '8px',
            background: 'var(--navy)',
            color: 'var(--gold2)',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          <Menu size={24} />
        </button>
        
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--navy)', marginBottom: '8px', margin: 0 }}>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--gray)', margin: 0 }}>Manage your {activeSection} content</p>
        </div>

        <div className="stats-row" style={{ marginBottom: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' }}>
          <div className="stat-cell"><div className="stat-num">{users.length}</div><div className="stat-lbl">Users</div></div>
          <div className="stat-cell"><div className="stat-num">{branches.length}</div><div className="stat-lbl">Branches</div></div>
          <div className="stat-cell"><div className="stat-num">{events.length}</div><div className="stat-lbl">Events</div></div>
          <div className="stat-cell"><div className="stat-num">{announcements.length}</div><div className="stat-lbl">Posts</div></div>
          <div className="stat-cell"><div className="stat-num">{documents.length}</div><div className="stat-lbl">Docs</div></div>
          <div className="stat-cell"><div className="stat-num">{stats?.batches ?? batches.length}</div><div className="stat-lbl">Batches</div></div>
          <div className="stat-cell"><div className="stat-num">{contributions.length}</div><div className="stat-lbl">Contributions</div></div>
        </div>

        {activeSection === 'statistics' && (
          <div className="admin-statistics-page">
            {/* Header Section */}
            <div className="admin-stats-header">
              <div>
                <h1 className="admin-stats-title">Member Statistics</h1>
                <p className="admin-stats-subtitle">Track alumni, branches, batches and overall participation</p>
              </div>
              <div className="admin-stats-actions">
                <button onClick={() => exportData('xls')} className="admin-stats-btn admin-stats-btn-secondary">
                  Export Excel
                </button>
                <button onClick={() => exportData('json')} className="admin-stats-btn admin-stats-btn-primary">
                  Export JSON
                </button>
              </div>
            </div>

            {/* Filters Section */}
            <div className="admin-stats-filters">
              <div className="admin-filter-group">
                <input
                  type="text"
                  value={statisticsFilters.search}
                  onChange={(e) => setStatisticsFilters((prev) => ({ ...prev, search: e.target.value }))}
                  placeholder="Search alumni by name or email"
                  className="admin-filter-input"
                />
              </div>
              <div className="admin-filter-group">
                <select
                  value={statisticsFilters.branchId}
                  onChange={(e) => setStatisticsFilters((prev) => ({ ...prev, branchId: e.target.value }))}
                  className="admin-filter-select"
                >
                  <option value="all">All branches</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                </select>
              </div>
              <div className="admin-filter-group">
                <select
                  value={statisticsFilters.batchId}
                  onChange={(e) => setStatisticsFilters((prev) => ({ ...prev, batchId: e.target.value }))}
                  className="admin-filter-select"
                >
                  <option value="all">All batches</option>
                  {batches.map((batch) => (
                    <option key={batch.id} value={batch.id}>{batch.name || `Batch ${batch.year}`}</option>
                  ))}
                </select>
              </div>
              <div className="admin-filter-group">
                <select
                  value={statisticsFilters.role}
                  onChange={(e) => setStatisticsFilters((prev) => ({ ...prev, role: e.target.value }))}
                  className="admin-filter-select"
                >
                  <option value="all">All roles</option>
                  <option value="member">Alumni</option>
                  <option value="branch_leader">Branch leaders</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
              <div className="admin-filter-group admin-filter-date">
                <input 
                  type="date" 
                  value={dateRange.start} 
                  onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))} 
                  className="admin-filter-input"
                />
                <input 
                  type="date" 
                  value={dateRange.end} 
                  onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))} 
                  className="admin-filter-input"
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="admin-stats-metrics">
              <div className="admin-metric-card admin-metric-card-primary">
                <div className="admin-metric-icon">
                  <Users size={24} />
                </div>
                <div className="admin-metric-content">
                  <div className="admin-metric-value">{statsSummary.totalAlumni}</div>
                  <div className="admin-metric-label">Alumni</div>
                </div>
              </div>
              <div className="admin-metric-card admin-metric-card-secondary">
                <div className="admin-metric-icon">
                  <Shield size={24} />
                </div>
                <div className="admin-metric-content">
                  <div className="admin-metric-value">{statsSummary.totalLeaders}</div>
                  <div className="admin-metric-label">Leaders</div>
                </div>
              </div>
              <div className="admin-metric-card admin-metric-card-tertiary">
                <div className="admin-metric-icon">
                  <Shield size={24} />
                </div>
                <div className="admin-metric-content">
                  <div className="admin-metric-value">{statsSummary.totalAdmins}</div>
                  <div className="admin-metric-label">Admins</div>
                </div>
              </div>
              <div className="admin-metric-card admin-metric-card-quaternary">
                <div className="admin-metric-icon">
                  <Building2 size={24} />
                </div>
                <div className="admin-metric-content">
                  <div className="admin-metric-value">{statsSummary.totalBranches}</div>
                  <div className="admin-metric-label">Branches</div>
                </div>
              </div>
              <div className="admin-metric-card admin-metric-card-quinary">
                <div className="admin-metric-icon">
                  <GraduationCap size={24} />
                </div>
                <div className="admin-metric-content">
                  <div className="admin-metric-value">{statsSummary.totalBatches}</div>
                  <div className="admin-metric-label">Batches</div>
                </div>
              </div>
              <div className="admin-metric-card admin-metric-card-senary">
                <div className="admin-metric-icon">
                  <Calendar size={24} />
                </div>
                <div className="admin-metric-content">
                  <div className="admin-metric-value">{filteredEventsByDate.length}</div>
                  <div className="admin-metric-label">Events</div>
                </div>
              </div>
              <div className="admin-metric-card admin-metric-card-primary admin-metric-card-contributions">
                <div className="admin-metric-icon">
                  <DollarSign size={24} />
                </div>
                <div className="admin-metric-content">
                  <div className="admin-metric-value">{statsSummary.totalContributions}</div>
                  <div className="admin-metric-label">Contributions</div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="admin-stats-charts">
              <div className="admin-chart-card">
                <div className="admin-chart-header">
                  <h3>Engagement Trend</h3>
                  <div className="admin-chart-badge">Monthly</div>
                </div>
                <div className="admin-chart-content">
                  <div className="admin-bar-chart">
                    {engagementTrend.map((item) => {
                      const maxValue = Math.max(...engagementTrend.map((entry) => entry.value), 1);
                      const height = `${Math.max((item.value / maxValue) * 100, 8)}%`;
                      return (
                        <div key={item.label} className="admin-bar-item">
                          <div className="admin-bar-container">
                            <div 
                              className="admin-bar" 
                              style={{ height }}
                            />
                          </div>
                          <div className="admin-bar-label">{item.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="admin-chart-card">
                <div className="admin-chart-header">
                  <h3>Role Distribution</h3>
                  <div className="admin-chart-badge">Users</div>
                </div>
                <div className="admin-chart-content admin-chart-content-centered">
                  <div className="admin-donut-chart">
                    <DonutChart data={roleDistribution} size={180} strokeWidth={20} />
                  </div>
                  <div className="admin-legend">
                    {roleDistribution.map((entry) => {
                      const pct = statsSummary.totalUsers ? (entry.value / statsSummary.totalUsers) * 100 : 0;
                      return (
                        <div key={entry.label} className="admin-legend-item">
                          <div className="admin-legend-color" style={{ background: entry.color }} />
                          <div className="admin-legend-info">
                            <span className="admin-legend-label">{entry.label}</span>
                            <span className="admin-legend-value">{entry.value} ({pct.toFixed(1)}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Rankings Section */}
            <div className="admin-stats-rankings">
              <div className="admin-ranking-card">
                <div className="admin-ranking-header">
                  <h3>Top Branches</h3>
                  <Building2 size={20} />
                </div>
                <div className="admin-ranking-list">
                  {branchRanking.map((branch, index) => (
                    <div key={branch.id} className="admin-ranking-item">
                      <div className="admin-ranking-rank">
                        {index + 1}
                      </div>
                      <div className="admin-ranking-info">
                        <div className="admin-ranking-name">{branch.name}</div>
                        <div className="admin-ranking-detail">{branch.region || 'Regional branch'}</div>
                      </div>
                      <div className="admin-ranking-count">{branch.usersCount}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-ranking-card">
                <div className="admin-ranking-header">
                  <h3>Top Batches</h3>
                  <GraduationCap size={20} />
                </div>
                <div className="admin-ranking-list">
                  {batchRanking.map((batch, index) => (
                    <div key={batch.id} className="admin-ranking-item">
                      <div className="admin-ranking-rank admin-ranking-rank-secondary">
                        {index + 1}
                      </div>
                      <div className="admin-ranking-info">
                        <div className="admin-ranking-name">{batch.name || `Batch ${batch.year}`}</div>
                        <div className="admin-ranking-detail">{batch.season || 'Batch record'}</div>
                      </div>
                      <div className="admin-ranking-count">{batch.eventCount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Statistics Buttons */}
            <div className="admin-stats-detailed-buttons">
              <button 
                onClick={() => setBranchStatsModal(true)}
                className="admin-stats-detail-btn"
              >
                <Building2 size={20} />
                <div>
                  <h3>Branch Statistics</h3>
                  <p>View detailed branch metrics</p>
                </div>
              </button>
              <button 
                onClick={() => setBatchStatsModal(true)}
                className="admin-stats-detail-btn"
              >
                <GraduationCap size={20} />
                <div>
                  <h3>Batch Statistics</h3>
                  <p>View detailed batch metrics</p>
                </div>
              </button>
            </div>

            <div className="admin-stats-table-card">
              <div className="admin-stats-table-header">
                <h3>Filtered Alumni</h3>
                <span className="admin-stats-table-count">{filteredUsers.length} records</span>
              </div>
              <div className="admin-stats-table-wrapper">
                <table className="admin-stats-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="admin-table-name">{user.name}</td>
                        <td className="admin-table-email">{user.email}</td>
                        <td className="admin-table-role">{user.role}</td>
                        <td className="admin-table-branch">{branches.find((branch) => branch.id === user.branchId)?.name || 'Unassigned'}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="admin-table-empty">No alumni match the selected filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Branch Statistics Modal */}
            {branchStatsModal && (
              <div className="admin-modal-overlay" onClick={() => setBranchStatsModal(false)}>
                <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="admin-modal-header">
                    <h3>Branch Statistics</h3>
                    <button onClick={() => setBranchStatsModal(false)} className="admin-modal-close">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="admin-modal-body">
                    <div className="admin-detailed-grid">
                      {branchStats.map((branch) => (
                        <div key={branch.id} className="admin-detailed-item">
                          <div className="admin-detailed-item-header">
                            <h4>{branch.name}</h4>
                            <span>{branch.region || 'No region set'}</span>
                          </div>
                          <div className="admin-detailed-stats">
                            <div className="admin-detailed-stat">
                              <span className="admin-detailed-stat-label">Users</span>
                              <span className="admin-detailed-stat-value">{branch.usersCount}</span>
                            </div>
                            <div className="admin-detailed-stat">
                              <span className="admin-detailed-stat-label">Alumni</span>
                              <span className="admin-detailed-stat-value">{branch.alumniCount}</span>
                            </div>
                            <div className="admin-detailed-stat">
                              <span className="admin-detailed-stat-label">Leaders</span>
                              <span className="admin-detailed-stat-value">{branch.leaderCount}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Batch Statistics Modal */}
            {batchStatsModal && (
              <div className="admin-modal-overlay" onClick={() => setBatchStatsModal(false)}>
                <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="admin-modal-header">
                    <h3>Batch Statistics</h3>
                    <button onClick={() => setBatchStatsModal(false)} className="admin-modal-close">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="admin-modal-body">
                    <div className="admin-detailed-grid">
                      {batchStats.map((batch) => (
                        <div key={batch.id} className="admin-detailed-item">
                          <div className="admin-detailed-item-header">
                            <h4>{batch.name || `Batch ${batch.year}`}</h4>
                            <span>{batch.season || 'Batch record'}</span>
                          </div>
                          <div className="admin-detailed-stats admin-detailed-stats-pair">
                            <div className="admin-detailed-stat">
                              <span className="admin-detailed-stat-label">Events</span>
                              <span className="admin-detailed-stat-value">{batch.eventCount}</span>
                            </div>
                            <div className="admin-detailed-stat">
                              <span className="admin-detailed-stat-label">Year</span>
                              <span className="admin-detailed-stat-value">{batch.year || '—'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="admin-grid-2">
            <div className="card">
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)', marginBottom: '16px' }}>Recent Activity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {events.slice(0, 3).map(event => (
                  <div key={event.id} style={{ padding: '12px', background: 'var(--off)', borderRadius: '8px', border: '1px solid var(--lgray)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--navy)', marginBottom: '4px' }}>{event.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>{event.startDate} · {event.location}</div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--gray)', fontSize: 14 }}>No recent events</div>
                )}
              </div>
            </div>
            <div className="card">
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)', marginBottom: '16px' }}>Recent Announcements</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {announcements.slice(0, 3).map(announcement => (
                  <div key={announcement.id} style={{ padding: '12px', background: 'var(--off)', borderRadius: '8px', border: '1px solid var(--lgray)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--navy)', marginBottom: '4px' }}>{announcement.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>{announcement.createdAt} · {announcement.createdBy}</div>
                  </div>
                ))}
                {announcements.length === 0 && (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--gray)', fontSize: 14 }}>No recent announcements</div>
                )}
              </div>
            </div>
            <div className="card" style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)', marginBottom: '16px' }}>Quick Actions</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }} className="admin-grid-4">
                <button onClick={() => setActiveSection('events')} style={{ padding: '16px', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={24} />
                  <span>Create Event</span>
                </button>
                <button onClick={() => setActiveSection('announcements')} style={{ padding: '16px', background: 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Megaphone size={24} />
                  <span>Post Update</span>
                </button>
                <button onClick={() => setActiveSection('documents')} style={{ padding: '16px', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <FileIcon size={24} />
                  <span>Upload Doc</span>
                </button>
                <button onClick={() => setActiveSection('branches')} style={{ padding: '16px', background: 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={24} />
                  <span>Add Branch</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'events' && (
          <div className="card" style={{ width: '100%', maxWidth: '100%', padding: '24px 24px 20px' }}>
            <div className="reg-header">
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Events</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Create and edit events</div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={() => { setShowEventForm(!showEventForm); setEditingEventId(null); }}>
                {showEventForm ? <X size={14} /> : <Plus size={14} />} {showEventForm ? 'Cancel' : 'New Event'}
              </button>
            </div>
            {showEventForm && (
              <div
                className="reg-panel open event-form-panel"
                style={{
                  width: '100%',
                  paddingTop: '8px',
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingRight: '8px'
                }}
              >
                <div className="divider"></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', width: '100%' }} className="admin-grid-2">
                  <div className="fg"><label>Event Title *</label><input type="text" value={eventData.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} placeholder="e.g. Annual Reunion" /></div>
                  <div className="fg"><label>Location *</label><input type="text" value={eventData.location} onChange={(e) => setEventData({ ...eventData, location: e.target.value })} placeholder="e.g. JOPACC Campus" /></div>
                  <div className="fg"><label>Batch Numbers *</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const allBatchIds = batches.map((batch) => batch.id).filter(Boolean);
                          setEventData({ ...eventData, batchIds: allBatchIds });
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--navy)', background: 'var(--navy)', color: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}
                      >
                        All Batches
                      </button>
                    </div>
                    <select
                      value=""
                      onChange={(e) => {
                        const selectedBatchId = e.target.value;
                        if (!selectedBatchId || eventData.batchIds.includes(selectedBatchId)) return;
                        setEventData({ ...eventData, batchIds: [...eventData.batchIds, selectedBatchId] });
                      }}
                      style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--lgray)', borderRadius: '8px', fontSize: '14px' }}
                    >
                      <option value="">— Select a batch —</option>
                      {batches.map((batch) => {
                        const label = batch?.name || `Batch ${batch?.year ?? ''}`;
                        return (
                          <option key={batch.id} value={batch.id}>{label}</option>
                        );
                      })}
                    </select>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {eventData.batchIds.map((batchId) => {
                        const batch = batches.find((item) => item.id === batchId);
                        const label = batch?.name || `Batch ${batch?.year ?? ''}`;
                        return (
                          <span key={batchId} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 10px', background: 'var(--off)', border: '1px solid var(--lgray)', borderRadius: '999px', fontSize: '12px', color: 'var(--navy)' }}>
                            {label}
                            <button type="button" onClick={() => setEventData({ ...eventData, batchIds: eventData.batchIds.filter((id) => id !== batchId) })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--navy)' }} aria-label={`Remove ${label}`}>
                              <X size={12} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                  <div className="fg"><label>Start Date *</label><input type="date" value={eventData.startDate} onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })} /></div>
                  <div className="fg"><label>End Date *</label><input type="date" value={eventData.endDate} onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })} /></div>
                </div>
                <div className="fg"><label>Description</label><textarea value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} placeholder="Event details..." style={{ width: '100%', padding: '15px 16px', border: '2px solid var(--lgray)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', minHeight: '80px', resize: 'vertical' }} /></div>
                <div className="fg"><label>Event Images</label><input type="file" multiple accept="image/*" onChange={(e) => handleEventImageSelection(e.target.files)} style={{ width: '100%', padding: '15px 16px', border: '2px solid var(--lgray)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit' }} /><div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 4 }}>Upload one or more event images</div></div>
                {(eventImageFiles.length > 0 || eventData.images?.length) && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px', marginTop: '8px' }}>
                    {eventImageFiles.map((file, index) => (
                      <div key={`new-${index}`} style={{ border: '1px solid var(--lgray)', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      </div>
                    ))}
                    {eventData.images?.map((image, index) => (
                      <div key={`existing-${index}`} style={{ border: '1px solid var(--lgray)', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={image} alt={`Existing preview ${index + 1}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginTop: '8px', padding: '12px 14px', background: 'var(--off)', borderRadius: '10px', border: '1px solid var(--lgray)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--gray)' }}>
                    {eventData.registrationForm.length > 0 ? `${eventData.registrationForm.length} registration field${eventData.registrationForm.length > 1 ? 's' : ''} configured` : 'No registration form yet'}
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowRegistrationFormModal(true)}
                    style={{ padding: '8px 12px', background: 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={14} /> {eventData.registrationForm.length > 0 ? 'Edit Form' : 'Add Form'}
                  </button>
                </div>
                <div className="fg"><label>Status</label><div className="sel-wrap"><select value={eventData.status} onChange={(e) => setEventData({ ...eventData, status: e.target.value as 'upcoming' | 'past' })}><option value="upcoming">Upcoming</option><option value="past">Past</option></select></div></div>
                <button className="btn btn-navy" onClick={handleCreateEvent} disabled={isSavingEvent} style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>{isSavingEvent ? <><LoaderCircle size={16} className="loading-spinner" /> {editingEventId ? 'Updating Event...' : 'Creating Event...'}</> : <>{editingEventId ? 'Update Event →' : 'Create Event →'}</>}</button>
              </div>
            )}
            {showRegistrationFormModal && (
              <div
                onClick={() => setShowRegistrationFormModal(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: '100%', maxWidth: '680px', maxHeight: '85vh', overflowY: 'auto', background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 18px 60px rgba(0,0,0,0.25)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--navy)' }}>Registration Form Builder</div>
                      <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: '4px' }}>Create the fields for event registration</div>
                    </div>
                    <button type="button" onClick={() => setShowRegistrationFormModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--gray)', padding: '4px' }}>
                      <X size={18} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {eventData.registrationForm.map((field, index) => (
                      <div key={index} style={{ padding: '12px', background: 'var(--off)', borderRadius: '10px', border: '1px solid var(--lgray)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => {
                              const updated = [...eventData.registrationForm];
                              updated[index].label = e.target.value;
                              setEventData({ ...eventData, registrationForm: updated });
                            }}
                            placeholder="Field Label (e.g., Full Name)"
                            style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--lgray)', borderRadius: '6px', fontSize: '13px' }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = eventData.registrationForm.filter((_, i) => i !== index);
                              setEventData({ ...eventData, registrationForm: updated });
                            }}
                            style={{ marginLeft: '8px', padding: '6px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                          >
                            Remove
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                          <select
                            value={field.type}
                            onChange={(e) => {
                              const updated = [...eventData.registrationForm];
                              updated[index].type = e.target.value;
                              setEventData({ ...eventData, registrationForm: updated });
                            }}
                            style={{ padding: '8px 12px', border: '1px solid var(--lgray)', borderRadius: '6px', fontSize: '13px' }}
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="textarea">Text Area</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="select">Select</option>
                            <option value="file">File Upload</option>
                            <option value="date">Date</option>
                          </select>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => {
                                const updated = [...eventData.registrationForm];
                                updated[index].required = e.target.checked;
                                setEventData({ ...eventData, registrationForm: updated });
                              }}
                            />
                            Required
                          </label>
                        </div>
                        {(field.type === 'radio' || field.type === 'checkbox' || field.type === 'select') && (
                          <div style={{ marginTop: '8px' }}>
                            <div style={{ fontSize: 12, color: 'var(--gray)', marginBottom: '4px' }}>Options (comma-separated):</div>
                            <input
                              type="text"
                              value={field.options?.map((o: { label: string }) => o.label).join(', ') || ''}
                              onChange={(e) => {
                                const updated = [...eventData.registrationForm];
                                updated[index].options = e.target.value.split(',').map((s: string) => ({ label: s.trim(), value: s.trim().toLowerCase().replace(/\s+/g, '_') })).filter((o: { label: string }) => o.label);
                                setEventData({ ...eventData, registrationForm: updated });
                              }}
                              placeholder="Option 1, Option 2, Option 3"
                              style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--lgray)', borderRadius: '6px', fontSize: '13px' }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setEventData({ ...eventData, registrationForm: [...eventData.registrationForm, { id: `field_${Date.now()}`, label: '', type: 'text', required: false, options: [] }] })}
                      style={{ padding: '10px 16px', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                    >
                      + Add Field
                    </button>
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowRegistrationFormModal(false)} style={{ padding: '10px 16px', background: 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
            {events.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}><CalendarIcon size={48} style={{ color: 'var(--navy)' }} /></div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No events yet</div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Create your first event to get started</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                {events.map(event => (
                  <div key={event.id} className="card" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleEditEvent(event)}
                        style={{ background: 'var(--off)', color: 'var(--navy)', border: '1px solid var(--lgray)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 600 }}
                      >
                        Edit
                      </button>
                      <button className="del-btn" onClick={() => openDeleteModal('event', event.id, 'Delete event?', 'This action will remove the event from the dashboard and cannot be undone.') }><Trash2 size={14} /></button>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 5 }}>{event.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8 }}>{event.description}</div>
                    <div style={{ display: 'flex', gap: 15, fontSize: 12, color: 'var(--gray)', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CalendarIcon size={12} /> {event.startDate} - {event.endDate}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {event.location}</span>
                    </div>
                    <div style={{ marginTop: 10 }}><span className={`status-badge ${event.status}`}>{event.status}</span></div>
                    {(event as any).meetLink && (
                      <a
                        href={(event as any).meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          marginTop: 8,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          color: 'var(--navy)',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}
                      >
                        <ExternalLink size={10} /> Meeting Link
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'announcements' && (
          <div className="card">
            <div className="reg-header">
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Announcements</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Create and edit announcements</div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={() => { setShowAnnouncementForm(!showAnnouncementForm); setEditingAnnouncementId(null); }}>
                {showAnnouncementForm ? <X size={14} /> : <Plus size={14} />} {showAnnouncementForm ? 'Cancel' : 'New Post'}
              </button>
            </div>
            {showAnnouncementForm && (
              <div className="reg-panel open">
                <div className="divider"></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="admin-grid-2">
                  <div className="fg"><label>Title *</label><input type="text" value={announcementData.title} onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })} placeholder="e.g. Annual Meeting Schedule" /></div>
                  <div className="fg"><label>Type</label><div className="sel-wrap"><select value={announcementData.type} onChange={(e) => setAnnouncementData({ ...announcementData, type: e.target.value as 'NEWS' | 'UPDATE' | 'EVENT' | 'OPPORTUNITY' | 'WARNING' })}><option value="NEWS">News</option><option value="UPDATE">Update</option><option value="EVENT">Event</option><option value="OPPORTUNITY">Opportunity</option><option value="WARNING">Warning</option></select></div></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="admin-grid-2">
                  <div className="fg"><label>Image URL (optional)</label><input type="url" value={announcementData.imageUrl} onChange={(e) => setAnnouncementData({ ...announcementData, imageUrl: e.target.value })} placeholder="https://example.com/image.jpg" /></div>
                  <div className="fg" style={{ display: 'flex', alignItems: 'flex-end' }}><label style={{ width: '100%', marginBottom: 8 }}>Pin announcement</label><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><input type="checkbox" checked={announcementData.isPinned} onChange={(e) => setAnnouncementData({ ...announcementData, isPinned: e.target.checked })} /> <span style={{ color: 'var(--gray)', fontSize: 13 }}>Pinned</span></div></div>
                </div>
                <div className="fg"><label>Content *</label><textarea value={announcementData.content} onChange={(e) => setAnnouncementData({ ...announcementData, content: e.target.value })} placeholder="Announcement details..." style={{ width: '100%', padding: '15px 16px', border: '2px solid var(--lgray)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', minHeight: '100px', resize: 'vertical' }} /></div>
                <button className="btn btn-navy" onClick={handleSaveAnnouncement} disabled={isSavingAnnouncement} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>{isSavingAnnouncement ? <><LoaderCircle size={16} className="loading-spinner" /> {editingAnnouncementId ? 'Updating Announcement...' : 'Posting Announcement...'}</> : <>{editingAnnouncementId ? 'Update Announcement →' : 'Post Announcement →'}</>}</button>
              </div>
            )}
            {announcements.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}><Megaphone size={48} style={{ color: 'var(--navy)' }} /></div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No announcements yet</div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Create your first announcement to get started</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginTop: '16px' }}>
                {announcements.map(announcement => (
                  <div key={announcement.id} className="card" style={{ borderLeft: (announcement as any).isPinned ? '4px solid var(--gold)' : '4px solid var(--lgray)', position: 'relative', marginTop: 10 }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleEditAnnouncement(announcement)}
                        style={{ background: 'var(--off)', color: 'var(--navy)', border: '1px solid var(--lgray)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 600 }}
                      >
                        Edit
                      </button>
                      <button className="del-btn" onClick={() => openDeleteModal('announcement', announcement.id, 'Delete announcement?', 'This action will remove the announcement from the dashboard.') }><Trash2 size={14} /></button>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 5 }}>{announcement.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--dark)', lineHeight: 1.5, marginBottom: 8 }}>{announcement.content}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>{announcement.createdAt} · {announcement.type} · by {announcement.createdBy}</div>
                  </div>
                ))}
              </div>
            )}
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
                {showDocumentForm ? <X size={14} /> : <Plus size={14} />} {showDocumentForm ? 'Cancel' : 'Upload'}
              </button>
            </div>
            {showDocumentForm && (
              <div className="reg-panel open">
                <div className="divider"></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="admin-grid-2">
                  <div className="fg"><label>Document Title *</label><input type="text" value={documentData.title} onChange={(e) => setDocumentData({ ...documentData, title: e.target.value })} placeholder="e.g. Annual Meeting Minutes" /></div>
                  <div className="fg"><label>Category *</label><input type="text" value={documentData.category} onChange={(e) => setDocumentData({ ...documentData, category: e.target.value })} placeholder="e.g. Reports" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="admin-grid-2">
                  <div className="fg"><label>File Type</label><div className="sel-wrap"><select value={documentData.fileType} onChange={(e) => setDocumentData({ ...documentData, fileType: e.target.value as 'PDF' | 'IMAGE' | 'PRESENTATION' | 'SPREADSHEET' | 'VIDEO' | 'OTHER' })}><option value="PDF">PDF</option><option value="IMAGE">Image</option><option value="PRESENTATION">Presentation</option><option value="SPREADSHEET">Spreadsheet</option><option value="VIDEO">Video</option><option value="OTHER">Other</option></select></div></div>
                  <div className="fg"><label>Tags</label><input type="text" value={documentData.tags} onChange={(e) => setDocumentData({ ...documentData, tags: e.target.value })} placeholder="e.g. alumni,meeting,minutes" /></div>
                </div>
                <div className="fg"><label>Description (optional)</label><textarea value={documentData.description} onChange={(e) => setDocumentData({ ...documentData, description: e.target.value })} placeholder="Short summary of the document" style={{ width: '100%', padding: '15px 16px', border: '2px solid var(--lgray)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', minHeight: '90px', resize: 'vertical' }} /></div>
                <div className="fg"><label>File *</label><input type="file" onChange={(e) => setDocumentFile(e.target.files?.[0] || null)} accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xlsx,.csv" style={{ width: '100%', padding: '15px 16px', border: '2px solid var(--lgray)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit' }} /><div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 4 }}>Accepted: PDF, DOC, DOCX, TXT, PPT, PPTX, XLSX, CSV</div></div>
                <button className="btn btn-navy" onClick={handleCreateDocument} disabled={isCreatingDocument} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>{isCreatingDocument ? <><LoaderCircle size={16} className="loading-spinner" /> Uploading Document...</> : <>Upload Document →</>}</button>
              </div>
            )}
            {documents.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}><FileIcon size={48} style={{ color: 'var(--navy)' }} /></div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No documents yet</div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Upload your first document to get started</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                {documents.map(doc => (
                  <div key={doc.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', minHeight: '80px' }}>
                    <button className="del-btn" style={{ position: 'absolute', top: 12, right: 12 }} onClick={() => openDeleteModal('document', doc.id, 'Delete document?', 'This action will remove the document from the list and storage.') }><Trash2 size={14} /></button>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 3 }}>{doc.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray)' }}>{doc.type} · {doc.uploadedAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'branches' && (
          <div className="card">
            <div className="reg-header">
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Branches</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Create and manage regional chapters</div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={() => { setShowBranchForm(!showBranchForm); setEditingBranchId(null); }}>
                {showBranchForm ? <X size={14} /> : <Plus size={14} />} {showBranchForm ? 'Cancel' : 'New Branch'}
              </button>
            </div>
            {showBranchForm && (
              <div className="reg-panel open">
                <div className="divider"></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="admin-grid-2">
                  <div className="fg"><label>Branch Name *</label><input type="text" value={branchData.name} onChange={(e) => setBranchData({ ...branchData, name: e.target.value })} placeholder="e.g. Douala Chapter" /></div>
                  <div className="fg"><label>Branch Code *</label><input type="text" value={branchData.code} onChange={(e) => setBranchData({ ...branchData, code: e.target.value })} placeholder="e.g. DOU" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="admin-grid-2">
                  <div className="fg"><label>Region *</label><input type="text" value={branchData.region} onChange={(e) => setBranchData({ ...branchData, region: e.target.value })} placeholder="e.g. Littoral Region" /></div>
                  <div className="fg"><label>Leader ID (optional)</label><input type="text" value={branchData.leaderId} onChange={(e) => setBranchData({ ...branchData, leaderId: e.target.value })} placeholder="Enter user ID" /></div>
                </div>
                <button className="btn btn-navy" onClick={handleCreateBranch} disabled={isSavingBranch} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>{isSavingBranch ? <><LoaderCircle size={16} className="loading-spinner" /> {editingBranchId ? 'Updating Branch...' : 'Creating Branch...'}</> : <>{editingBranchId ? 'Update Branch →' : 'Create Branch →'}</>}</button>
              </div>
            )}
            {branches.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}><Building2 size={48} style={{ color: 'var(--navy)' }} /></div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No branches yet</div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Create your first branch to get started</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginTop: '16px' }}>
                {branches.map(branch => {
                  const memberCount = users.filter((user: User) => (user as { branchId?: string }).branchId === branch.id).length;
                  return (
                    <div key={branch.id} className="card" style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEditBranch(branch)}
                          style={{ background: 'var(--off)', color: 'var(--navy)', border: '1px solid var(--lgray)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 600 }}
                        >
                          Edit
                        </button>
                        <button className="del-btn" onClick={() => openDeleteModal('branch', branch.id, 'Delete branch?', 'This action will remove the branch from the system.') }><Trash2 size={14} /></button>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 5 }}>{branch.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8 }}>{branch.region}</div>
                      <div style={{ display: 'flex', gap: 15, fontSize: 12, color: 'var(--gray)', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><UserPlus size={12} /> {memberCount} member{memberCount !== 1 ? 's' : ''}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Created {branch.createdAt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeSection === 'batches' && (
          <div className="card">
            <div className="reg-header">
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Batches</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Create and manage alumni cohort records</div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={() => { setShowBatchForm(!showBatchForm); setEditingBatchId(null); }}>
                {showBatchForm ? <X size={14} /> : <Plus size={14} />} {showBatchForm ? 'Cancel' : 'New Batch'}
              </button>
            </div>
            {showBatchForm && (
              <div className="reg-panel open">
                <div className="divider"></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="admin-grid-2">
                  <div className="fg"><label>Batch Year *</label><input type="number" value={batchData.year} onChange={(e) => setBatchData({ ...batchData, year: e.target.value })} placeholder="e.g. 2024" /></div>
                  <div className="fg"><label>Batch Name *</label><input type="text" value={batchData.name} onChange={(e) => setBatchData({ ...batchData, name: e.target.value })} placeholder="e.g. Batch 2024" /></div>
                </div>
                <div className="fg"><label>Season (optional)</label><input type="text" value={batchData.season} onChange={(e) => setBatchData({ ...batchData, season: e.target.value })} placeholder="e.g. Spring" /></div>
                <button className="btn btn-navy" onClick={handleCreateBatch} disabled={isSavingBatch} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>{isSavingBatch ? <><LoaderCircle size={16} className="loading-spinner" /> {editingBatchId ? 'Updating Batch...' : 'Creating Batch...'}</> : <>{editingBatchId ? 'Update Batch →' : 'Create Batch →'}</>}</button>
              </div>
            )}
            {batches.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}><GraduationCap size={48} style={{ color: 'var(--navy)' }} /></div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No batches yet</div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Create your first alumni batch to get started</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                {batches.map((batch) => (
                  <div key={batch.id} className="card" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEditBatch(batch)}
                        style={{ background: 'var(--off)', color: 'var(--navy)', border: '1px solid var(--lgray)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 600 }}
                      >
                        Edit
                      </button>
                      <button className="del-btn" onClick={() => handleDeleteBatch(batch.id)}><Trash2 size={14} /></button>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 5 }}>{batch.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8 }}>Year {batch.year}{batch.season ? ` · ${batch.season}` : ''}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>{batch.createdAt || 'Recently added'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'photos' && (
          <div className="card">
            <div className="reg-header">
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Event Photos</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Upload photos for events</div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={() => setShowPhotoForm(!showPhotoForm)}>
                {showPhotoForm ? <X size={14} /> : <Plus size={14} />} {showPhotoForm ? 'Cancel' : 'Upload Photos'}
              </button>
            </div>
            {showPhotoForm && (
              <div className="reg-panel open">
                <div className="divider"></div>
                <div className="fg">
                  <label>Select Event *</label>
                  <div className="sel-wrap">
                    <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
                      <option value="">— Select an event —</option>
                      {events.map(event => (
                        <option key={event.id} value={event.id}>{event.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="fg">
                  <label>Photos & Videos *</label>
                  <input type="file" multiple accept="image/*,video/*" onChange={(e) => handlePhotoSelection(e.target.files)} style={{ width: '100%', padding: '15px 16px', border: '2px solid var(--lgray)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit' }} />
                  <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 4 }}>Accepted: JPG, PNG, GIF, WebP, MP4, MOV, AVI, up to 5 GB per file</div>
                </div>
                {photoPreviewUrls.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', marginBottom: '12px' }}>
                    {photoPreviewUrls.map((url, index) => {
                      const file = photoFiles[index];
                      const isVideo = file?.type?.startsWith('video/');
                      return (
                        <div key={`${file?.name || 'media'}-${index}`} style={{ position: 'relative', border: '1px solid var(--lgray)', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                          {isVideo ? (
                            <video src={url} controls style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block', background: '#000' }} />
                          ) : (
                            <img src={url} alt={`Media preview ${index + 1}`} style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block' }} />
                          )}
                          <button
                            type="button"
                            onClick={() => removePhotoSelection(index)}
                            aria-label={`Remove selected media ${index + 1}`}
                            style={{ position: 'absolute', top: '6px', right: '6px', width: '22px', height: '22px', borderRadius: '50%', border: 'none', background: 'rgba(15, 23, 42, 0.78)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                <button className="btn btn-navy" onClick={handleUploadPhotos} disabled={uploading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>{uploading ? <><LoaderCircle size={16} className="loading-spinner" /> Uploading Photos...</> : <>Upload Photos →</>}</button>
              </div>
            )}
            {photos.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}><ImageIcon size={48} style={{ color: 'var(--navy)' }} /></div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No photos yet</div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Upload photos for events to get started</div>
              </div>
            ) : (
              <div style={{ marginTop: '16px' }}>
                {events.map(event => {
                  const eventPhotos = photos.filter(p => p.eventId === event.id);
                  if (eventPhotos.length === 0) return null;
                  return (
                    <div key={event.id} style={{ marginBottom: '24px' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: '12px' }}>{event.title} ({eventPhotos.length} photos)</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
                        {eventPhotos.map(photo => (
                          <div key={photo.id} style={{ position: 'relative' }}>
                            {isVideoMediaUrl(photo.url) ? (
                              <video src={photo.url} controls style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', display: 'block', background: '#000' }} />
                            ) : (
                              <img src={photo.url} alt="Event photo" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                            )}
                            <button 
                              onClick={() => openDeleteModal('photo', photo.id, 'Delete photo?', 'This action will remove the photo from the event gallery.')}
                              style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeSection === 'registrations' && (
          <div className="card">
            <div className="reg-header">
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Event Registrations</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Review alumni registrations and payment proofs</div>
              </div>
            </div>

            {registrations.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}><UserPlus size={48} style={{ color: 'var(--navy)' }} /></div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No registrations yet</div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Alumni registrations will appear here once submitted.</div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', width: '100%', maxWidth: '100%' }} className="admin-table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--lgray)' }}>
                      <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--gray)' }}>Registrant</th>
                      <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--gray)' }}>Event</th>
                      <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--gray)' }}>Batch / Branch</th>
                      <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--gray)' }}>Paid</th>
                      <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--gray)' }}>Status</th>
                      <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--gray)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration) => {
                      const alumnus = registration.alumni?.user;
                      const batch = registration.alumni?.batch;
                      const branch = registration.alumni?.branch;
                      return (
                        <tr key={registration.id} style={{ borderBottom: '1px solid var(--lgray)' }}>
                          <td style={{ padding: '12px 10px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 13 }}>{alumnus?.firstName || 'Alumnus'} {alumnus?.lastName || ''}</div>
                            <div style={{ fontSize: 11, color: 'var(--gray)' }}>{alumnus?.email || 'No email'}</div>
                          </td>
                          <td style={{ padding: '12px 10px', fontSize: 12 }}>{registration.event?.title || 'Unknown event'}</td>
                          <td style={{ padding: '12px 10px', fontSize: 12 }}>
                            {batch?.name || (batch?.year ? `Batch ${batch.year}` : 'No batch')}
                            {branch?.name ? ` · ${branch.name}` : ''}
                          </td>
                          <td style={{ padding: '12px 10px', fontSize: 12 }}>${Number(registration.paidAmount ?? 0).toFixed(2)}</td>
                          <td style={{ padding: '12px 10px' }}>
                            <span className={`status-badge ${String(registration.status || 'PENDING').toLowerCase()}`} style={{ textTransform: 'capitalize', fontSize: 11, padding: '2px 8px' }}>{String(registration.status || 'PENDING').toLowerCase()}</span>
                          </td>
                          <td style={{ padding: '12px 10px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              <button className="btn btn-sm btn-navy" onClick={() => handleUpdateRegistrationStatus(registration.id, 'APPROVED')} style={{ padding: '4px 8px', fontSize: 11 }}>Approve</button>
                              <button className="btn btn-sm btn-gold" onClick={() => handleUpdateRegistrationStatus(registration.id, 'FLAGGED')} style={{ padding: '4px 8px', fontSize: 11 }}>Flag</button>
                              <button className="btn btn-sm" onClick={() => handleUpdateRegistrationStatus(registration.id, 'DECLINED')} style={{ padding: '4px 8px', fontSize: 11, background: '#f8d7da', color: '#842029', border: '1px solid #f5c2c7' }}>Decline</button>
                              <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal('registration', registration.id, 'Delete registration?', 'This action will remove this registration permanently.') } style={{ padding: '4px 8px', fontSize: 11 }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeSection === 'contributions' && (
          <div className="card" style={{ width: '100%', maxWidth: '100%', padding: '24px 24px 20px' }}>
            <div className="reg-header">
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--navy)' }}>Manage Contributions</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Create and edit contribution collections</div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={() => { setShowContributionForm(!showContributionForm); setEditingContributionId(null); setContributionData({ title: '', type: 'EVENT_REGISTRATION', description: '', eventId: '', installments: [], status: 'ACTIVE' }); }}>
                {showContributionForm ? <X size={14} /> : <Plus size={14} />} {showContributionForm ? 'Cancel' : 'New Contribution'}
              </button>
            </div>

            {showContributionForm && (
              <div className="reg-panel open" style={{ width: '100%', paddingTop: '8px', maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden', paddingRight: '8px' }}>
                <div className="divider"></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', width: '100%' }} className="admin-grid-2">
                  <div className="fg"><label>Title *</label><input type="text" value={contributionData.title} onChange={(e) => setContributionData({ ...contributionData, title: e.target.value })} placeholder="e.g., Annual Membership Fee 2026" /></div>
                  <div className="fg"><label>Type *</label>
                    <select value={contributionData.type} onChange={(e) => setContributionData({ ...contributionData, type: e.target.value as any })}>
                      <option value="EVENT_REGISTRATION">Event Registration Fee</option>
                      <option value="ANNUAL_FEE">Annual Fee</option>
                      <option value="GENERAL">General</option>
                      <option value="PROJECTS">Projects</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="fg"><label>Status *</label>
                    <select value={contributionData.status} onChange={(e) => setContributionData({ ...contributionData, status: e.target.value as any })}>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                  <div className="fg">
                    <label>Linked Event</label>
                    <select value={contributionData.eventId} onChange={(e) => setContributionData({ ...contributionData, eventId: e.target.value })}>
                      <option value="">No event link</option>
                      {events.map((event) => (
                        <option key={event.id} value={event.id}>{event.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="fg"><label>Description</label><textarea value={contributionData.description} onChange={(e) => setContributionData({ ...contributionData, description: e.target.value })} placeholder="Describe this contribution..." /></div>
                <div className="fg"><label>Payment Installments</label>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {contributionData.installments.map((installment, index) => (
                      <div key={installment.id} className="installment-row" style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', padding: '12px', background: 'var(--off)', borderRadius: '8px', border: '1px solid var(--lgray)' }}>
                        <input type="text" value={installment.label} onChange={(e) => { const updated = [...contributionData.installments]; updated[index].label = e.target.value; setContributionData({ ...contributionData, installments: updated }); }} placeholder="Label (e.g., First Installment)" style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--lgray)', borderRadius: '8px', fontSize: '14px' }} />
                        <input type="number" value={installment.amount} onChange={(e) => { const updated = [...contributionData.installments]; updated[index].amount = parseFloat(e.target.value) || 0; setContributionData({ ...contributionData, installments: updated }); }} placeholder="Amount" style={{ width: '120px', padding: '12px 14px', border: '2px solid var(--lgray)', borderRadius: '8px', fontSize: '14px' }} />
                        <input type="date" value={installment.dueDate} onChange={(e) => { const updated = [...contributionData.installments]; updated[index].dueDate = e.target.value; setContributionData({ ...contributionData, installments: updated }); }} style={{ width: '180px', padding: '12px 14px', border: '2px solid var(--lgray)', borderRadius: '8px', fontSize: '14px' }} />
                        <button onClick={() => { const updated = contributionData.installments.filter((_, i) => i !== index); setContributionData({ ...contributionData, installments: updated }); }} style={{ padding: '10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    ))}
                    <button onClick={() => setContributionData({ ...contributionData, installments: [...contributionData.installments, { id: Date.now().toString(), label: `Installment ${contributionData.installments.length + 1}`, amount: 0, dueDate: '' }] })} style={{ padding: '12px 14px', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', width: 'fit-content' }}><Plus size={14} /> Add Installment</button>
                  </div>
                </div>
                <div className="admin-grid-2" style={{ gap: '12px', marginTop: '16px' }}>
                  <button className="btn btn-navy" onClick={async () => {
                    try {
                      setIsSavingContribution(true);
                      const payload = {
                        title: contributionData.title,
                        type: contributionData.type,
                        description: contributionData.description,
                        eventId: contributionData.eventId || undefined,
                        installments: contributionData.installments.map((it) => ({ id: it.id, label: it.label, amount: Number(it.amount), dueDate: it.dueDate })),
                        status: contributionData.status,
                      };
                      let res;
                      if (editingContributionId) {
                        res = await fetch(`${apiBaseUrl}/contributions/${editingContributionId}`, { method: 'PUT', headers: getAuthHeaders(adminToken), body: JSON.stringify(payload) });
                      } else {
                        res = await fetch(`${apiBaseUrl}/contributions`, { method: 'POST', headers: getAuthHeaders(adminToken), body: JSON.stringify(payload) });
                      }
                      if (!res.ok) {
                        const err = await res.json().catch(() => ({}));
                        throw new Error(err.message || 'Failed to save contribution');
                      }
                      const saved = await res.json();
                      setContributions((prev) => (editingContributionId ? prev.map((c) => (c.id === saved.id ? saved : c)) : [saved, ...prev]));
                      setShowContributionForm(false);
                      setEditingContributionId(null);
                      showToastMessage(editingContributionId ? 'Contribution updated.' : 'Contribution created.', 'success');
                    } catch (err) {
                      console.error('Save contribution failed', err);
                      showToastMessage('Could not save contribution. Please try again.', 'error');
                    } finally {
                      setIsSavingContribution(false);
                    }
                  }} disabled={isSavingContribution}>
                    {isSavingContribution ? 'Saving...' : (editingContributionId ? 'Update Contribution' : 'Create Contribution')}
                  </button>
                  <button className="btn" onClick={() => setShowContributionForm(false)} style={{ background: 'var(--lgray)' }}>Cancel</button>
                </div>
              </div>
            )}

            {contributions.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}><DollarSign size={48} style={{ color: 'var(--navy)' }} /></div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>No contributions yet</div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Create your first contribution to start collecting payments.</div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', width: '100%' }} className="admin-table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--lgray)' }}>
                      <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--gray)' }}>Title</th>
                      <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--gray)' }}>Type</th>
                      <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--gray)' }}>Installments</th>
                      <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--gray)' }}>Total</th>
                      <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--gray)' }}>Status</th>
                      <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--gray)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributions.map((contribution) => {
                      const totalAmount = contribution.installments?.reduce((sum: number, inst: any) => sum + (inst.amount || 0), 0) || 0;
                      return (
                        <tr key={contribution.id} style={{ borderBottom: '1px solid var(--lgray)' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '13' }}>{contribution.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--gray)' }}>{contribution.description || 'No description'}</div>
                          </td>
                          <td style={{ padding: '12px 8px', fontSize: '12' }}>{contribution.type?.replace(/_/g, ' ') || 'General'}</td>
                          <td style={{ padding: '12px 8px', fontSize: '12' }}>{contribution.installments?.length || 0} installment(s)</td>
                          <td style={{ padding: '12px 8px', fontSize: '12', fontWeight: 600 }}>${totalAmount.toFixed(2)}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span className={`status-badge ${String(contribution.status || 'ACTIVE').toLowerCase()}`} style={{ textTransform: 'capitalize', fontSize: '10px', padding: '2px 6px' }}>{String(contribution.status || 'ACTIVE').toLowerCase()}</span>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button className="btn btn-sm btn-navy" onClick={() => setPaymentModal({ open: true, contributionId: contribution.id, contributionTitle: contribution.title })} style={{ padding: '4px 8px', fontSize: '11' }}><CreditCard size={10} /> Payments</button>
                              <button className="btn btn-sm" onClick={() => { setEditingContributionId(contribution.id); setShowContributionForm(true); setContributionData({ title: contribution.title || '', type: contribution.type || 'EVENT_REGISTRATION', description: contribution.description || '', eventId: contribution.eventId || contribution.event?.id || '', installments: Array.isArray(contribution.installments) ? contribution.installments.map((it: any) => ({ id: it.id ?? String(Date.now()), label: it.label ?? '', amount: Number(it.amount ?? 0), dueDate: it.dueDate ?? '' })) : [], status: contribution.status || 'ACTIVE' }); }} style={{ padding: '4px 8px', fontSize: '11', background: 'var(--lgray)' }}>Edit</button>
                              <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal('contribution', contribution.id, 'Delete contribution?', 'This action will remove this contribution permanently.')} style={{ padding: '4px 8px', fontSize: '11' }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Payment Details Modal */}
        {paymentModal.open && (
          <div className="admin-modal-overlay" onClick={() => setPaymentModal({ open: false, contributionId: null, contributionTitle: '' })}>
            <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Payment Details - {paymentModal.contributionTitle}</h3>
                <button onClick={() => setPaymentModal({ open: false, contributionId: null, contributionTitle: '' })} className="admin-modal-close">
                  <X size={20} />
                </button>
              </div>
              <div className="admin-modal-body">
                {contributionPayments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', color: 'var(--gray)' }}>
                    No payments recorded yet for this contribution.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }} className="admin-table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--lgray)' }}>
                          <th style={{ padding: '12px', textAlign: 'left', fontSize: 13, color: 'var(--gray)' }}>Payer</th>
                          <th style={{ padding: '12px', textAlign: 'left', fontSize: 13, color: 'var(--gray)' }}>Amount</th>
                          <th style={{ padding: '12px', textAlign: 'left', fontSize: 13, color: 'var(--gray)' }}>Installment</th>
                          <th style={{ padding: '12px', textAlign: 'left', fontSize: 13, color: 'var(--gray)' }}>Date</th>
                          <th style={{ padding: '12px', textAlign: 'left', fontSize: 13, color: 'var(--gray)' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contributionPayments.map((payment) => (
                          <tr key={payment.id} style={{ borderBottom: '1px solid var(--lgray)' }}>
                            <td style={{ padding: '12px', fontSize: 13 }}>
                              <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{payment.payerName || 'Unknown'}</div>
                              <div style={{ fontSize: 11, color: 'var(--gray)' }}>{payment.payerEmail || ''}</div>
                            </td>
                            <td style={{ padding: '12px', fontSize: 13, fontWeight: 600 }}>
                              ${Number(payment.amount || 0).toFixed(2)}
                            </td>
                            <td style={{ padding: '12px', fontSize: 12 }}>
                              {payment.installmentLabel || 'N/A'}
                            </td>
                            <td style={{ padding: '12px', fontSize: 12 }}>
                              {payment.paymentDate || 'N/A'}
                            </td>
                            <td style={{ padding: '12px' }}>
                              <span className={`status-badge ${String(payment.status || 'COMPLETED').toLowerCase()}`} style={{ textTransform: 'capitalize', fontSize: 11, padding: '2px 8px' }}>
                                {String(payment.status || 'COMPLETED').toLowerCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
