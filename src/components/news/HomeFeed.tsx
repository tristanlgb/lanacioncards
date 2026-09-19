import type { Story, StoryActions } from '../../types/news';
import { StoryCard } from './StoryCard';
import { AudioBrief } from '../widgets/AudioBrief';
import { ExploreCard } from '../widgets/ExploreCard';
import { MarketWidget } from '../widgets/MarketWidget';
import { NewsletterCard } from '../widgets/NewsletterCard';
import { WeatherWidget } from '../widgets/WeatherWidget';

interface HomeFeedProps extends StoryActions {
  stories: readonly Story[];
  savedIds: readonly number[];
  onSubscribe: () => void;
  onExplore: () => void;
  onViewEconomy: () => void;
  onError: (message: string) => void;
}
export function HomeFeed({
  stories,
  savedIds,
  onRead,
  onToggleSaved,
  onSubscribe,
  onExplore,
  onViewEconomy,
  onError,
}: HomeFeedProps) {
  const lead = stories[0];
  const secondary = stories.slice(1, 10);
  const leftColumn = secondary.filter((_, index) => index % 3 === 0);
  const centerColumn = secondary.filter((_, index) => index % 3 === 1);
  const rightColumn = secondary.filter((_, index) => index % 3 === 2);
  const actions = { onRead, onToggleSaved };

  return (
    <div className="bento">
      <div className="lead-column">
        <WeatherWidget />
        {lead && <StoryCard {...actions} story={lead} isSaved={savedIds.includes(lead.id)} hero />}
        <AudioBrief stories={stories} onError={onError} />
        {leftColumn.map((story) => (
          <StoryCard
            key={story.id}
            {...actions}
            story={story}
            isSaved={savedIds.includes(story.id)}
          />
        ))}
        <NewsletterCard onSubscribe={onSubscribe} />
      </div>
      <div className="news-column">
        {centerColumn.map((story) => (
          <StoryCard
            key={story.id}
            {...actions}
            story={story}
            isSaved={savedIds.includes(story.id)}
          />
        ))}
        <MarketWidget onViewEconomy={onViewEconomy} />
        <ExploreCard onExplore={onExplore} />
      </div>
      <div className="news-column">
        {rightColumn.map((story) => (
          <StoryCard
            key={story.id}
            {...actions}
            story={story}
            isSaved={savedIds.includes(story.id)}
          />
        ))}
      </div>
    </div>
  );
}
