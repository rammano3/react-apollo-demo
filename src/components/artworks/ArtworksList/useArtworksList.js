import { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { ARTWORKS_FILTER } from './queries';

const PAGE_SIZE = 20;

export const useArtworksList = () => {
  const client = useApolloClient();
  const [page, setPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState();
  const { data, loading } = useQuery(ARTWORKS_FILTER, {
    variables: { pageSize: PAGE_SIZE, page, term: searchTerm },
  });
  const artworks = data?.filter_artworks?.filtered_artworks?.edges || [];
  const previousPage =
    data?.filter_artworks?.filtered_artworks?.pageCursors?.previous?.page || 0;
  const total = data?.filter_artworks?.counts.total || 0;

  const handleNewTerm = () => {
    const term = searchInputValue || undefined;
    setSearchTerm(term);
    setPage(1);
  };
  const handleNext = () => {
    const nextPage = previousPage + 2;
    setPage(nextPage);
  };
  const handlePrev = () => {
    setPage(previousPage);
  };

  useEffect(() => {
    async function prefetchQuery() {
      const queryVariables = {
        page: page + 1,
        pageSize: PAGE_SIZE,
        term: searchTerm,
      };
      try {
        await client.query({
          query: ARTWORKS_FILTER,
          variables: queryVariables,
        });
      } catch (error) {}
    }
    prefetchQuery();
  }, [client, page, searchTerm]);

  return {
    artworks,
    handleNewTerm,
    handleNext,
    handlePrev,
    loading,
    previousPage,
    searchInputValue,
    setSearchInputValue,
    total,
  };
};

export default useArtworksList;
