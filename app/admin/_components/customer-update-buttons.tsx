'use client';

import { Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ARRIVED_MESSAGE =
  'היי! ההזמנה שלך הגיעה אלינו לתל אביב לבדיקה אישית. אנחנו מוודאים שהכל מושלם ונארוז אותה יפה לפני שהיא יוצאת אלייך — נעדכן ברגע שהיא בדרך 🐾';

function waLink(phone: string | undefined, message: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d]/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function mailtoLink(email: string, subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${email}?${params.toString()}`;
}

export default function CustomerUpdateButtons({
  email,
  phone,
  orderId,
  customerName
}: {
  email: string;
  phone?: string;
  orderId: string;
  customerName: string;
}) {
  const personalized = `שלום ${customerName}, ${ARRIVED_MESSAGE}\n\n— צוות פטשופ\nהזמנה ${orderId}`;
  const wa = waLink(phone, personalized);
  const mail = mailtoLink(
    email,
    `עדכון על ההזמנה שלך · ${orderId}`,
    personalized
  );

  return (
    <div className="flex flex-wrap gap-2">
      {wa && (
        <Button asChild size="sm" variant="outline">
          <a href={wa} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            עדכון בוואטסאפ
          </a>
        </Button>
      )}
      <Button asChild size="sm" variant="outline">
        <a href={mail}>
          <Mail className="h-4 w-4" />
          עדכון באימייל
        </a>
      </Button>
    </div>
  );
}
