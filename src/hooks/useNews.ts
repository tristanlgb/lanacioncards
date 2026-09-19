import { useEffect, useState } from 'react';
import { fetchNews } from '../services/newsService';
import type { NewsResponse } from '../types/news';

type NewsState =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: NewsResponse; error: null }
  | { status: 'error'; data: null; error: string };

export function useNews() {
  const [state, setState] = useState<NewsState>({ status: 'loading', data: null, error: null });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    void fetchNews(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setState({ status: 'success', data, error: null });
      },
      (error: unknown) => {
        if (!controller.signal.aborted)
          setState({
            status: 'error',
            data: null,
            error: error instanceof Error ? error.message : 'No pudimos cargar las noticias.',
          });
      },
    );
    return () => controller.abort();
  }, [revision]);
  function reload() {
    setState({ status: 'loading', data: null, error: null });
    setRevision((previous) => previous + 1);
  }
  return { ...state, reload };
}
