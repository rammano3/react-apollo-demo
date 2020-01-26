import React from 'react';
import { Box, Flex, Heading } from 'theme-ui';
import { LoadingSpinner } from './LoadingSpinner';
import { ArtworkCards } from './ArtworkCards';
import { SearchInput } from './SearchInput';
import { SearchPagination } from './SearchPagination';
import { useArtworksList } from './useArtworksList';

export function ArtworksList() {
  const {
    artworks,
    handleNewTerm,
    handleNext,
    handlePrev,
    loading,
    previousPage,
    searchInputValue,
    setSearchInputValue,
    total,
  } = useArtworksList();

  return (
    <Box p={3}>
      <Heading mb={3}>Artworks</Heading>
      <Flex sx={{ alignItems: 'center', mb: 3 }}>
        <SearchInput
          label="Search Art"
          loading={loading}
          onChange={setSearchInputValue}
          value={searchInputValue}
          onSearch={handleNewTerm}
        />
        <SearchPagination
          total={total}
          previousPage={previousPage}
          loading={loading}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </Flex>
      {loading && <LoadingSpinner />}
      {!loading && <ArtworkCards artworks={artworks} />}
    </Box>
  );
}

export default ArtworksList;
