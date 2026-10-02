import { useEffect } from 'react';
import { toast } from '@heroui/react';

interface ToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'warning' | 'error';
}

export default function Toast({ show, message, type = 'success' }: ToastProps) {
  useEffect(() => {
    if (!show || !message) return;

    const title = type === 'error' ? 'Error' : type === 'warning' ? 'Notice' : 'Success';
    const options = { description: message, timeout: 3500 };

    if (type === 'error') toast.danger(title, options);
    else if (type === 'warning') toast.warning(title, options);
    else toast.success(title, options);
  }, [show, message, type]);

  return null;
}
