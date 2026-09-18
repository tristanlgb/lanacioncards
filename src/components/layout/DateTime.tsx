import { useCurrentTime } from '../../hooks/useCurrentTime';
import { formatDate, formatTime } from '../../utils/date';

export function DateTime() {
  const time = useCurrentTime();

  return (
    <div className="date-time">
      <span className="date">{formatDate(time)}</span>
      <span>
        <span className="live-dot" />
        {formatTime(time)} <small>ARG</small>
      </span>
    </div>
  );
}
