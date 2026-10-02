'use client';



import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { ArrowLeft, Download, FileText } from 'lucide-react';

import DetailPageLayout from '@/components/alumni/DetailPageLayout';

import { Document } from '@/types';

import { apiFetch, formatDate, getApiBase, resolveMediaUrl } from '@/lib/api';

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

          fileUrl: resolveMediaUrl(payload.fileUrl),

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

  const fileUrl = resolveMediaUrl(doc.fileUrl);

  const fileType = (doc.fileType || doc.type || '').toLowerCase();

  const isPdf = fileType === 'pdf' || /\.pdf(?:$|[?#])/i.test(fileUrl);

  const isImage = fileType === 'image' || /\.(png|jpe?g|gif|webp|svg)(?:$|[?#])/i.test(fileUrl) || /\/image\/upload\//i.test(fileUrl);

  const isVideo = fileType === 'video' || /\.(mp4|webm|mov|m4v|avi|mkv|ogg|3gp)(?:$|[?#])/i.test(fileUrl) || /\/video\/upload\//i.test(fileUrl);



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

            onClick={() => downloadFile(doc.fileUrl, doc.title, doc.fileType || doc.type)}

          >

            <Download size={15} /> Download

          </button>

          <a

            className="alumni-btn alumni-btn-ghost detail-action-full"

            href={fileUrl || `${getApiBase()}/documents/${doc.id}`}

            target="_blank"

            rel="noopener noreferrer"

            style={{ textDecoration: 'none' }}

          >

            Open in new tab

          </a>

        </>

      }

      extra={

        isPdf || isImage || isVideo ? (

          <div className="detail-card">

            <h2 className="detail-card-label">Preview</h2>

            {isPdf ? (

              <iframe title={`${doc.title} preview`} src={fileUrl} style={{ width: '100%', minHeight: 680, border: 0 }} />

            ) : isImage ? (

              <img src={fileUrl} alt={doc.title} style={{ display: 'block', maxWidth: '100%', maxHeight: 760, margin: '0 auto', objectFit: 'contain' }} />

            ) : (

              <video
                src={fileUrl}
                controls
                playsInline
                preload="metadata"
                aria-label={`Play ${doc.title}`}
                style={{ display: 'block', width: '100%', maxHeight: '75vh', aspectRatio: '16 / 9', objectFit: 'contain', background: '#000' }}
              />

            )}

          </div>

        ) : null

      }

    />

  );

}

