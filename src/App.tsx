import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PageHeading } from './components/layout/PageHeading';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { ArticleDialog } from './components/news/ArticleDialog';
import { HomeFeed } from './components/news/HomeFeed';
import { StoryResults } from './components/news/StoryResults';
import { SubscriptionDialog } from './components/subscription/SubscriptionDialog';
import { Toast } from './components/ui/Toast';
import { useNews } from './hooks/useNews';
import { NewsStatus } from './components/news/NewsStatus';
import { useSavedStories } from './hooks/useSavedStories';
import { useToast } from './hooks/useToast';
import type { Section, Story } from './types/news';
import { filterStories } from './utils/filterStories';

type ActiveDialog = { type: 'article'; story: Story } | { type: 'subscription' } | null;

export function App() {
  const [section, setSection] = useState<Section>('Inicio');
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
  const { savedIds, toggleSaved } = useSavedStories();
  const { message, showToast } = useToast();

  const news = useNews();
  const stories = news.data?.stories ?? [];

  const isHome = section === 'Inicio' && !query;
  const filteredStories = filterStories(stories, { section, query, savedIds });
  const selectedStory = activeDialog?.type === 'article' ? activeDialog.story : null;

  function handleNavigate(nextSection: Section) {
    setSection(nextSection);
    setQuery('');
  }

  function handleTopicSelect(topicQuery: string) {
    setIsSearchOpen(true);
    setQuery(topicQuery);
    setSection('Inicio');
  }

  function handleCloseSearch() {
    setIsSearchOpen(false);
    setQuery('');
  }

  function handleToggleSaved(storyId: number) {
    const wasSaved = savedIds.includes(storyId);
    toggleSaved(storyId);
    showToast(
      wasSaved ? 'Noticia eliminada de tus guardados' : 'Noticia guardada para leer después',
    );
  }

  function handleRead(story: Story) {
    setActiveDialog({ type: 'article', story });
  }

  function handleSubscribe() {
    setActiveDialog({ type: 'subscription' });
  }

  function handleExplore() {
    handleNavigate('Últimas noticias');
  }

  function handleCloseDialog() {
    setActiveDialog(null);
  }

  return (
    <>
      <div className="site-shell">
        <SiteHeader
          section={section}
          savedCount={savedIds.length}
          query={query}
          isSearchOpen={isSearchOpen}
          onQueryChange={setQuery}
          onToggleSearch={() => setIsSearchOpen((open) => !open)}
          onCloseSearch={handleCloseSearch}
          onTopicSelect={handleTopicSelect}
          onNavigate={handleNavigate}
          onSubscribe={handleSubscribe}
        />
        <main>
          <PageHeading section={section} hasQuery={Boolean(query)} />
          <NewsStatus
            isLoading={news.status === 'loading'}
            error={news.error}
            stale={news.data?.stale ?? false}
            updatedAt={news.data?.updatedAt}
            onReload={news.reload}
          />
          {isHome ? (
            <HomeFeed
              stories={stories}
              savedIds={savedIds}
              onRead={handleRead}
              onToggleSaved={handleToggleSaved}
              onSubscribe={handleSubscribe}
              onExplore={handleExplore}
              onViewEconomy={() => handleNavigate('Economía')}
              onError={showToast}
            />
          ) : (
            <StoryResults
              stories={filteredStories}
              savedIds={savedIds}
              section={section}
              query={query}
              onRead={handleRead}
              onToggleSaved={handleToggleSaved}
              onGoHome={() => handleNavigate('Inicio')}
            />
          )}
          <div className="bottom-line">
            <span className="live-dot" />
            <span>Una mirada amplia. Historias que importan.</span>
            <button
              onClick={() => {
                handleExplore();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Ver todas las noticias <ArrowRight size={15} />
            </button>
          </div>
        </main>
        <SiteFooter />
      </div>
      <ArticleDialog
        story={selectedStory}
        isSaved={selectedStory !== null && savedIds.includes(selectedStory.id)}
        onToggleSaved={handleToggleSaved}
        onClose={handleCloseDialog}
      />
      <SubscriptionDialog
        isOpen={activeDialog?.type === 'subscription'}
        onClose={handleCloseDialog}
      />
      <Toast message={message} />
    </>
  );
}
