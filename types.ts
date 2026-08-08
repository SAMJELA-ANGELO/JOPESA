export interface Alumni {
  id: number;
  name: string;
  year: number;
  classNum: number;
  className: string;
  batch: number;
  acadYear: string;
  f1AcadYear: string;
  gradYear: string;
  branchId?: string;
  date: string;
}

export interface BatchInfo {
  batch: number;
  acadYear: string;
  f1AcadYear: string;
  gradYear: string;
  yrsLeft: number;
  className: string;
}

export interface Branch {
  id: string;
  name: string;
  region: string;
  leaderId?: string;
  memberCount: number;
  createdAt: string;
}

export interface Batch {
  id: string;
  year: number;
  name: string;
  season?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'file' | 'date' | string;
  required?: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'upcoming' | 'past' | string;
  batchId?: string;
  batches?: Batch[];
  externalGalleryUrl?: string;
  isVirtual?: boolean;
  meetLink?: string;
  image?: string;
  images?: string[];
  registrationForm?: FormField[];
  eventType?: string;
  createdAt: string;
  _count?: { attendees?: number };
}

export interface Photo {
  id: string;
  eventId: string;
  url: string;
  externalUrl?: string;
  uploadedAt: string;
  eventTitle?: string;
  event?: {
    id: string;
    title: string;
  };
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'NEWS' | 'UPDATE' | 'EVENT' | 'OPPORTUNITY' | 'WARNING';
  priority?: 'normal' | 'urgent';
  isPinned?: boolean;
  image?: string;
  imageUrl?: string;
  createdAt: string;
  createdBy: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
  category?: string;
  fileType?: string;
  fileSize?: number;
  tags?: string[];
}

export interface ContributionInstallment {
  id: string;
  label: string;
  amount: number;
  dueDate?: string;
}

export interface ContributionPayment {
  id: string;
  amount: number;
  installmentLabel?: string;
  paymentDate?: string;
  status?: string;
  paymentReference?: string;
  notes?: string;
}

export interface Contribution {
  id: string;
  title: string;
  description?: string;
  type?: string;
  status?: string;
  eventId?: string | null;
  event?: {
    id?: string;
    title?: string;
  } | null;
  installments?: ContributionInstallment[];
  payments?: ContributionPayment[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'branch_leader' | 'member';
  branchId?: string;
}
