import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;
  return (
    <div role="status" className="toast">
      <Check size={17} />
      {message}
    </div>
  );
}
