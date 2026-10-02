'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { LoaderCircle, X, ClipboardList, CreditCard } from 'lucide-react';
import { Button } from '@heroui/react';
import { FormField } from '@/types';
import { apiFetch, getApiBase, getAlumniToken } from '@/lib/api';

interface EventRegistrationModalProps {
  open: boolean;
  eventId: string;
  eventTitle: string;
  fields: FormField[];
  onClose: () => void;
  onSuccess: () => void;
  onPaymentClick?: () => void;
  hasPayment: boolean;
}

export default function EventRegistrationModal({
  open,
  eventId,
  eventTitle,
  fields,
  onClose,
  onSuccess,
  onPaymentClick,
  hasPayment,
}: EventRegistrationModalProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const sortedFields = useMemo(() => fields || [], [fields]);

  useEffect(() => {
    let mounted = true;
    const loadExisting = async () => {
      try {
        const token = getAlumniToken();
        if (!token) return;
        const res = await fetch(`${getApiBase()}/events/${eventId}/registration/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) return;
        const payload = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (payload && typeof payload === 'object' && (payload.responses || payload.data)) {
          const existing = (payload.responses || payload.data || payload) as Record<string, unknown>;
          setValues(existing);
        }
      } catch (err) {
        // ignore
      }
    };

    if (open) loadExisting();

    return () => { mounted = false; };
  }, [open, eventId]);

  const setValue = (id: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const uploadFile = async (file: File) => {
    const token = getAlumniToken();
    const formData = new FormData();
    formData.append('file', file);
    const endpoint = file.type.startsWith('image/')
      ? `/upload/image?folder=event-registrations`
      : `/upload/document?folder=event-registrations`;
    const response = await fetch(`${getApiBase()}${endpoint}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData,
    });
    if (!response.ok) {
      throw new Error('File upload failed');
    }
    const payload = await response.json();
    return payload.url || payload.secure_url;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const responses: Record<string, unknown> = { ...values };

      for (const field of sortedFields) {
        if (field.type === 'file' && values[field.id] instanceof File) {
          responses[field.id] = await uploadFile(values[field.id] as File);
        }
      }

      for (const field of sortedFields) {
        if (!field.required) continue;
        const value = responses[field.id];
        const empty =
          value === undefined ||
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0);
        if (empty) {
          throw new Error(`Please complete "${field.label}"`);
        }
      }

      await apiFetch(
        `/events/${eventId}/register`,
        {
          method: 'POST',
          body: JSON.stringify({ responses }),
        },
        true,
      );

      onSuccess();
      onClose();
      setValues({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="alumni-modal-backdrop" onClick={onClose}>
      <div className="alumni-modal" onClick={(e) => e.stopPropagation()}>
        <div className="alumni-modal-header">
          <div className="alumni-modal-icon">
            <ClipboardList size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="alumni-modal-title">Event registration</div>
            <div className="alumni-modal-sub">{eventTitle}</div>
          </div>
          <button className="alumni-icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {sortedFields.length === 0 ? (
          <p className="alumni-form-note">
            No custom fields were configured for this event. Confirm below to complete your registration.
          </p>
        ) : (
          <p className="alumni-form-note">
            Complete the form below. Required fields are marked with *.
          </p>
        )}

        <form onSubmit={handleSubmit} className="alumni-form">
          {sortedFields.map((field) => (
            <div key={field.id} className="alumni-field">
              <label className="alumni-label">
                {field.label}
                {field.required ? <span className="alumni-required">*</span> : null}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  value={(values[field.id] as string) || ''}
                  onChange={(event) => setValue(field.id, event.target.value)}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  required={field.required}
                  rows={4}
                  className="w-full"
                />
              ) : field.type === 'select' ? (
                <select
                  aria-label={field.label}
                  value={(values[field.id] as string | undefined) || ''}
                  onChange={(event) => setValue(field.id, event.target.value)}
                  required={field.required}
                  className="w-full"
                >
                  <option value="" disabled>Select an option</option>
                  {(field.options || []).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : field.type === 'radio' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(field.options || []).map((option) => (
                    <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="radio"
                        name={field.id}
                        value={option.value}
                        checked={values[field.id] === option.value}
                        onChange={() => setValue(field.id, option.value)}
                        required={field.required}
                        style={{ width: 'auto', padding: 0, border: 0, appearance: 'auto' }}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              ) : field.type === 'checkbox' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(field.options || []).map((option) => {
                    const selectedValues = Array.isArray(values[field.id]) ? values[field.id] as string[] : [];
                    return (
                      <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={selectedValues.includes(option.value)}
                          onChange={(event) => {
                            const nextValues = event.target.checked
                              ? [...selectedValues, option.value]
                              : selectedValues.filter((value) => value !== option.value);
                            setValue(field.id, nextValues);
                          }}
                          style={{ width: 'auto', padding: 0, border: 0, appearance: 'auto' }}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              ) : field.type === 'file' ? (
                <div className="alumni-file-box">
                  <input
                    type="file"
                    onChange={(event) => setValue(field.id, event.target.files?.[0] || null)}
                    required={field.required}
                  />
                  <span>
                    {(values[field.id] as File | undefined)?.name || 'Choose a file to upload'}
                  </span>
                </div>
              ) : (
                <input
                  type={
                    field.type === 'number'
                      ? 'number'
                      : field.type === 'email'
                        ? 'email'
                        : field.type === 'date'
                          ? 'date'
                          : 'text'
                  }
                  value={(values[field.id] as string | number | undefined) ?? ''}
                  onChange={(event) => setValue(field.id, event.target.value)}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  required={field.required}
                  className="w-full"
                />
              )}
            </div>
          ))}

          {error && <div className="alumni-form-error">{error}</div>}

          <div className="alumni-form-actions">
            <button type="button" className="alumni-btn alumni-btn-ghost" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            {hasPayment && onPaymentClick && (
              <button type="button" className="alumni-btn alumni-btn-secondary" onClick={onPaymentClick} disabled={submitting}>
                <CreditCard size={16} style={{ marginRight: 6 }} /> Make Payment
              </button>
            )}
            <Button type="submit" variant="primary" isDisabled={submitting}>
              {submitting ? (
                <>
                  <LoaderCircle size={16} className="loading-spinner" /> Submitting...
                </>
              ) : (
                'Submit registration'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
