import { useId, useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { Dialog } from '../ui/Dialog';

interface SubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionDialog({ isOpen, onClose }: SubscriptionDialogProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const titleId = useId();

  return (
    <Dialog isOpen={isOpen} titleId={titleId} onClose={onClose}>
      <div className="subscribe-detail">
        <span className="round-icon">
          <Mail size={24} />
        </span>
        <span className="category">TU PRÓXIMA BUENA LECTURA</span>
        <h2 id={titleId}>
          {subscribed ? 'Ya estás en la lista.' : 'Las historias que importan, más cerca.'}
        </h2>
        {subscribed ? (
          <>
            <Check size={40} className="success-icon" />
            <p>
              Registramos tu interés en esta demostración. No se enviarán correos ni se realizarán
              cobros.
            </p>
          </>
        ) : (
          <>
            <p>
              Recibí una selección de noticias, ideas y nuevas perspectivas para empezar tu día.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <label htmlFor="email">Tu correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="primary-button" type="submit">
                Quiero sumarme <ArrowRight size={16} />
              </button>
            </form>
            <small>Formulario de demostración. Tu correo no se envía a ningún servidor.</small>
          </>
        )}
      </div>
    </Dialog>
  );
}
