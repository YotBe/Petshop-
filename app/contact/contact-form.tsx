'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('ההודעה נשלחה — תודה!', {
        description: 'נחזור אליכם בתוך יום עסקים אחד.'
      });
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] md:p-8"
    >
      <h2 className="text-lg font-bold text-ink">שלחו לנו הודעה</h2>
      <p className="mt-1 text-sm text-slate-600">
        נחזור אליכם בתוך יום עסקים אחד.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            שם מלא
          </label>
          <Input
            id="contact-name"
            required
            value={form.name}
            onChange={update('name')}
            className="mt-1.5"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            אימייל
          </label>
          <Input
            id="contact-email"
            type="email"
            required
            dir="ltr"
            value={form.email}
            onChange={update('email')}
            placeholder="name@example.co.il"
            className="mt-1.5"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className="text-sm font-medium text-ink">
            נושא
          </label>
          <Input
            id="contact-subject"
            required
            value={form.subject}
            onChange={update('subject')}
            placeholder="לדוגמה: עזרה בבחירת מידה לרתמה"
            className="mt-1.5"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-ink">
            ההודעה שלכם
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={form.message}
            onChange={update('message')}
            className="mt-1.5 flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        variant="accent"
        disabled={submitting}
        className="mt-6 w-full sm:w-auto"
      >
        {submitting ? 'שולח...' : 'שלחו את ההודעה'}
        {!submitting && <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
}
