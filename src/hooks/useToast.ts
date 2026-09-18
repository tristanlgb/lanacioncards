import { useEffect, useState } from 'react';

const TOAST_DURATION_MS = 2600;

export function useToast() {
  const [notification, setNotification] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (!notification) return;

    const timeoutId = window.setTimeout(() => setNotification(null), TOAST_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  function showToast(message: string) {
    setNotification({ message });
  }

  return { message: notification?.message ?? '', showToast };
}
