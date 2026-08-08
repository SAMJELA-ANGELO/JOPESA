'use client';

import { useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import { LoaderCircle, X, ClipboardList, CreditCard } from 'lucide-react';
import { FormField } from '@/types';
import { apiFetch, getApiBase, getAlumniToken } from '@/lib/api';
import { useEffect } from 'react';

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

const fieldInputStyle: CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  border: '1.5px solid var(--lgray)',
  borderRadius: 12,
  fontSize: 15,
  fontFamily: 'inherit',
  color: 'var(--dark)',
  background: '#fff',
  outline: 'none',
};

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
  const [loadingExisting, setLoadingExisting] = useState(false);

  const sortedFields = useMemo(() => fields || [], [fields]);

  useEffect(() => {
    let mounted = true;
    const loadExisting = async () => {
      setLoadingExisting(true);
      try {
        const token = getAlumniToken();
        if (!token) return;
        const res = await fetch(`${getApiBase()}/events/${eventId}/registration/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) return;
        const payload = await res.json().catch(() => ({}));
        if (!mounted) return;
        // payload may contain `responses` object
        if (payload && typeof payload === 'object' && (payload.responses || payload.data)) {
          const existing = (payload.responses || payload.data || payload) as Record<string, unknown>;
          setValues(existing);
        }
      } catch (err) {
        // ignore
      } finally {
        setLoadingExisting(false);
      }
    };

    if (open) loadExisting();

    return () => { mounted = false; };
  }, [open, eventId]);

  const setValue = (id: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const toggleCheckbox = (id: string, optionValue: string) => {
    const current = Array.isArray(values[id]) ? (values[id] as string[]) : [];
    const next = current.includes(optionValue)
      ? current.filter((item) => item !== optionValue)
      : [...current, optionValue];
    setValue(id, next);
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
                  onChange={(e) => setValue(field.id, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  required={field.required}
                  rows={4}
                  className="alumni-input"
                  style={{ ...fieldInputStyle, resize: 'vertical', minHeight: 110 }}
                />
              ) : field.type === 'select' ? (
                <div className="alumni-select-wrap">
                  <select
                    value={(values[field.id] as string) || ''}
                    onChange={(e) => setValue(field.id, e.target.value)}
                    required={field.required}
                    className="alumni-input"
                    style={fieldInputStyle}
                  >
                    <option value="">Select an option</option>
                    {(field.options || []).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : field.type === 'radio' ? (
                <div className="alumni-option-list">
                  {(field.options || []).map((option) => (
                    <label
                      key={option.value}
                      className={`alumni-option ${values[field.id] === option.value ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name={field.id}
                        checked={values[field.id] === option.value}
                        onChange={() => setValue(field.id, option.value)}
                        required={field.required}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              ) : field.type === 'checkbox' ? (
                <div className="alumni-option-list">
                  {(field.options || []).map((option) => {
                    const selected = Array.isArray(values[field.id])
                      ? (values[field.id] as string[]).includes(option.value)
                      : false;
                    return (
                      <label key={option.value} className={`alumni-option ${selected ? 'active' : ''}`}>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleCheckbox(field.id, option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              ) : field.type === 'file' ? (
                <div className="alumni-file-box">
                  <input
                    type="file"
                    onChange={(e) => setValue(field.id, e.target.files?.[0] || null)}
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
                  onChange={(e) => setValue(field.id, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  required={field.required}
                  className="alumni-input"
                  style={fieldInputStyle}
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
            <button type="submit" className="alumni-btn alumni-btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <LoaderCircle size={16} className="loading-spinner" /> Submitting...
                </>
              ) : (
                'Submit registration'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
