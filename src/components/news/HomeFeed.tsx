import { homeStories } from '../../data/stories';
import type { StoryActions } from '../../types/news';
import { StoryCard } from './StoryCard';
import { AudioBrief } from '../widgets/AudioBrief';
import { ExploreCard } from '../widgets/ExploreCard';
import { MarketWidget } from '../widgets/MarketWidget';
import { NewsletterCard } from '../widgets/NewsletterCard';
import { WeatherWidget } from '../widgets/WeatherWidget';

interface HomeFeedProps extends StoryActions {
  savedIds: readonly number[];
  onSubscribe: () => void;
  onExplore: () => void;
  onViewEconomy: () => void;
  onError: (message: string) => void;
}

export function HomeFeed({
  savedIds,
  onRead,
  onToggleSaved,
  onSubscribe,
  onExplore,
  onViewEconomy,
  onError,
}: HomeFeedProps) {
  const storyActions = { onRead, onToggleSaved };
  return (
    <div className="bento">
      <div className="lead-column">
        <WeatherWidget />
        <StoryCard
          {...storyActions}
          story={homeStories.lead}
          isSaved={savedIds.includes(homeStories.lead.id)}
          hero
        />
        <AudioBrief onError={onError} />
        <StoryCard
          {...storyActions}
          story={homeStories.culture}
          isSaved={savedIds.includes(homeStories.culture.id)}
        />
        <NewsletterCard onSubscribe={onSubscribe} />
      </div>
      <div className="news-column">
        <StoryCard
          {...storyActions}
          story={homeStories.economy}
          isSaved={savedIds.includes(homeStories.economy.id)}
        />
        <StoryCard
          {...storyActions}
          story={homeStories.sports}
          isSaved={savedIds.includes(homeStories.sports.id)}
        />
        <MarketWidget onViewEconomy={onViewEconomy} />
        <ExploreCard onExplore={onExplore} />
      </div>
      <div className="news-column">
        <StoryCard
          {...storyActions}
          story={homeStories.world}
          isSaved={savedIds.includes(homeStories.world.id)}
        />
        <StoryCard
          {...storyActions}
          story={homeStories.lifestyle}
          isSaved={savedIds.includes(homeStories.lifestyle.id)}
        />
        <StoryCard
          {...storyActions}
          story={homeStories.technology}
          isSaved={savedIds.includes(homeStories.technology.id)}
        />
      </div>
    </div>
  );
}
