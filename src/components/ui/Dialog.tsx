import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  titleId: string;
  children: ReactNode;
  onClose: () => void;
}

export function Dialog({ isOpen, titleId, children, onClose }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button className="dialog-close" autoFocus aria-label="Cerrar" onClick={onClose}>
        <X />
      </button>
      {children}
    </dialog>
  );
}
