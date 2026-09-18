import { TrendingUp } from 'lucide-react';
import { trendingTopics } from '../../data/navigation';

interface TrendingTopicsProps {
  onTopicSelect: (query: string) => void;
}

export function TrendingTopics({ onTopicSelect }: TrendingTopicsProps) {
  return (
    <div className="trending">
      <span>
        <TrendingUp size={14} /> ES TENDENCIA
      </span>
      {trendingTopics.map((topic) => (
        <button key={topic.label} onClick={() => onTopicSelect(topic.query)}>
          {topic.label}
        </button>
      ))}
      <span className="demo">EDICIÓN DEMO</span>
    </div>
  );
}
