import { useEffect, useState } from 'react';

import { getSearchParams } from '@/shared/lib';

export const useSearch = (): [string, (newValue: string) => void] => {
  const [search, setSearch] = useState<string>('');

  const params = getSearchParams();

  useEffect(() => {
    params.set('search', search);

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`,
    );
  }, [search, params]);

  return [search, setSearch];
};
