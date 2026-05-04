'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrintTrigger() {
  return (
    <Button size="sm" onClick={() => window.print()}>
      <Printer className="h-4 w-4" />
      הדפס
    </Button>
  );
}
