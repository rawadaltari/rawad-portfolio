import { AnimatePresence, m } from 'motion/react';
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { Button } from '../ui/Button';

type Field = 'name' | 'email' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = { kind: 'idle' } | { kind: 'submitting' } | { kind: 'success'; message: string } | { kind: 'error'; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 80, message: 2000 } as const;

function validate(v: Values): Errors {
  const e: Errors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();
  if (!name) e.name = 'Please enter your name.';
  else if (name.length < 2) e.name = 'Name should be at least 2 characters.';
  if (!email) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) e.email = 'Please enter a valid email address.';
  if (!message) e.message = 'Please write a message.';
  else if (message.length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
}

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [honeypot, setHoneypot] = useState('');

  const errors = validate(values);
  const showError = (f: Field) => (touched[f] ? errors[f] : undefined);

  const onChange = (f: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    if (status.kind === 'error' || status.kind === 'success') setStatus({ kind: 'idle' });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const first = (Object.keys(errors) as Field[])[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (honeypot) return; // bot

    const payload = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };

    // No endpoint configured → hand off to the visitor's email client (no secrets in the bundle).
    if (!site.contactEndpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus({ kind: 'success', message: 'Your email app should open with the message ready to send.' });
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch(site.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setValues({ name: '', email: '', message: '' });
      setTouched({});
      setStatus({ kind: 'success', message: 'Thank you — your message has been sent. I’ll get back to you soon.' });
    } catch {
      setStatus({ kind: 'error', message: `Something went wrong. Please try again or email me directly at ${site.email}.` });
    }
  };

  const submitting = status.kind === 'submitting';

  return (
    <form noValidate onSubmit={onSubmit} className="card relative p-6 sm:p-8" aria-describedby={`${uid}-status`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={`${uid}-name`} label="Name" error={showError('name')}>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={onChange('name')}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={Boolean(showError('name'))}
            aria-describedby={showError('name') ? `${uid}-name-error` : undefined}
            className={inputClass(Boolean(showError('name')))}
            placeholder="Your name"
            required
          />
        </FormField>
        <FormField id={`${uid}-email`} label="Email" error={showError('email')}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange('email')}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={Boolean(showError('email'))}
            aria-describedby={showError('email') ? `${uid}-email-error` : undefined}
            className={inputClass(Boolean(showError('email')))}
            placeholder="you@example.com"
            required
          />
        </FormField>
        <FormField id={`${uid}-message`} label="Message" error={showError('message')} className="sm:col-span-2" hint={`${values.message.length}/${LIMITS.message}`}>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={6}
            maxLength={LIMITS.message}
            value={values.message}
            onChange={onChange('message')}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            aria-invalid={Boolean(showError('message'))}
            aria-describedby={showError('message') ? `${uid}-message-error` : undefined}
            className={cn(inputClass(Boolean(showError('message'))), 'min-h-36 resize-y py-3')}
            placeholder="Tell me about your project or idea…"
            required
          />
        </FormField>
      </div>

      {/* Honeypot — hidden from humans and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">All fields are required.</p>
        <Button type="submit" size="lg" magnetic disabled={submitting} className="w-full sm:w-auto">
          {submitting ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
          {submitting ? 'Sending…' : 'Send Message'}
        </Button>
      </div>

      <div id={`${uid}-status`} role="status" aria-live="polite" className="empty:hidden">
        <AnimatePresence>
          {(status.kind === 'success' || status.kind === 'error') && (
            <m.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                'mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm',
                status.kind === 'success' ? 'border-accent/30 bg-accent-soft text-fg' : 'border-red-500/30 bg-red-500/10 text-fg',
              )}
            >
              {status.kind === 'success' ? (
                <CircleCheck size={17} className="mt-px shrink-0 text-accent" aria-hidden="true" />
              ) : (
                <CircleAlert size={17} className="mt-px shrink-0 text-red-500" aria-hidden="true" />
              )}
              {status.message}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    'block h-12 w-full rounded-xl border bg-bg/70 px-4 text-[0.95rem] text-fg placeholder:text-fg-subtle/80 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4',
    invalid ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/15' : 'border-line-strong focus:border-accent focus:ring-[var(--accent-soft)]',
  );
}

function FormField({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint && <span className="font-mono text-[0.68rem] text-fg-subtle">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
          <CircleAlert size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
