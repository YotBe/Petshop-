'use client';

import Image from 'next/image';
import { LogOut, LogIn } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 11v3.6h5.04c-.22 1.18-.9 2.18-1.92 2.85v2.36h3.1c1.82-1.68 2.86-4.16 2.86-7.06 0-.66-.06-1.3-.18-1.92H12z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.6 0 4.78-.86 6.38-2.32l-3.1-2.36c-.86.58-1.96.92-3.28.92-2.52 0-4.66-1.7-5.42-3.98H3.36v2.5C4.94 19.86 8.2 22 12 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.58 14.26A6.04 6.04 0 0 1 6.26 12c0-.78.14-1.54.32-2.26V7.24H3.36A10 10 0 0 0 2 12c0 1.62.38 3.16 1.36 4.76l3.22-2.5z"
      />
      <path
        fill="#4285F4"
        d="M12 6.04c1.42 0 2.7.5 3.7 1.46l2.76-2.76C16.78 3.18 14.6 2 12 2 8.2 2 4.94 4.14 3.36 7.24l3.22 2.5C7.34 7.74 9.48 6.04 12 6.04z"
      />
    </svg>
  );
}

export default function SignInButton({ onAction }: { onAction?: () => void }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="h-11 w-full animate-pulse rounded-md bg-slate-100" />
    );
  }

  if (session?.user) {
    const name = session.user.name ?? session.user.email ?? 'משתמש';
    const initial = name.charAt(0).toUpperCase();

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-brand/10">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={name}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-bold text-brand">
                {initial}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-ink">
              {name}
            </div>
            <div className="truncate text-xs text-slate-500">
              {session.user.email}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={async () => {
            onAction?.();
            await signOut({ callbackUrl: '/' });
          }}
        >
          <LogOut className="h-4 w-4" />
          התנתקו
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full justify-center bg-white"
      onClick={async () => {
        onAction?.();
        await signIn('google', { callbackUrl: '/' });
      }}
    >
      <GoogleMark />
      התחברו עם Google
      <LogIn className="ms-auto h-4 w-4 text-slate-400" aria-hidden />
    </Button>
  );
}
