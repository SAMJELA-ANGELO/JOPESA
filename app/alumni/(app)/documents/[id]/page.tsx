'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import DetailPageLayout from '@/components/alumni/DetailPageLayout';
import { Document } from '@/types';
import { apiFetch, formatDate, getApiBase } from '@/lib/api';
import { downloadFile } from '@/lib/download';

export default function AlumniDocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id || '');
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await apiFetch<Document>(`/documents/${id}`);
        setDoc({
          ...payload,
          type: (payload.fileType || payload.type || 'OTHER').toLowerCase(),
          uploadedAt: payload.uploadedAt || (payload as Document & { createdAt?: string }).createdAt || '',
          uploadedBy: payload.uploadedBy || payload.category || 'Admin',
        });
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unable to load document');
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  if (loading) return <div style={{ color: 'var(--gray)' }}>Loading document...</div>;

  if (error || !doc) {
    return (
      <div>
        <button className="alumni-back-btn" onClick={() => router.push('/alumni/documents')}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className="alumni-card" style={{ color: 'var(--err)' }}>{error || 'Document not found'}</div>
      </div>
    );
  }

  const description = (doc as Document & { description?: string }).description;

  return (
    <DetailPageLayout
      backLabel="Back to documents"
      backHref="/alumni/documents"
      title={doc.title}
      shareTitle={doc.title}
      shareText={`JOPESA document: ${doc.title}`}
      meta={
        <>
          <span className="detail-file-badge">
            <FileText size={14} /> {(doc.type || doc.fileType || 'File').toString().toUpperCase()}
          </span>
          <span>{doc.category || 'General'}</span>
          <span>Uploaded {formatDate(doc.uploadedAt)}</span>
          {doc.fileSize ? <span>{(doc.fileSize / 1024).toFixed(1)} KB</span> : null}
        </>
      }
      description={description || 'No description provided for this document.'}
      actions={
        <>
          <button
            className="alumni-btn alumni-btn-primary detail-action-full"
            onClick={() => downloadFile(doc.fileUrl, doc.title)}
          >
            <Download size={15} /> Download
          </button>
          <a
            className="alumni-btn alumni-btn-ghost detail-action-full"
            href={doc.fileUrl || `${getApiBase()}/documents/${doc.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            Open in new tab
          </a>
        </>
      }
    />
  );
}
