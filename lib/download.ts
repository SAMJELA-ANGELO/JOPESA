import { resolveMediaUrl } from './api';

export async function downloadFile(url: string, filename?: string, fallbackType?: string) {
  if (!url) return;

  const downloadUrl = new URL(resolveMediaUrl(url));
  const pathName = decodeURIComponent(downloadUrl.pathname.split('/').pop() || 'download');
  const urlExtension = pathName.match(/\.([a-z0-9]{2,8})$/i)?.[1];
  const typeExtensions: Record<string, string> = {
    pdf: 'pdf',
    image: 'jpg',
    presentation: 'pptx',
    spreadsheet: 'xlsx',
    video: 'mp4',
  };
  const extension = urlExtension || typeExtensions[fallbackType?.toLowerCase() || ''];
  const requestedName = filename || pathName || 'download';
  const fallbackName = extension && !/\.[a-z0-9]{2,8}$/i.test(requestedName)
    ? `${requestedName}.${extension}`
    : requestedName;

  if (downloadUrl.hostname === 'res.cloudinary.com') {
    downloadUrl.pathname = downloadUrl.pathname.replace('/upload/', `/upload/fl_attachment:${encodeURIComponent(fallbackName)}/`);
  }

  const link = document.createElement('a');
  link.href = downloadUrl.toString();
  link.download = fallbackName;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
