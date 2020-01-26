import React from 'react';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Image,
  Spinner,
  Text,
} from 'theme-ui';
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
        <Flex sx={{ flexBasis: '50%', justifyContent: 'flex-start' }}>
          <Input
            aria-label="Search Art"
            type="text"
            onChange={e => setSearchInputValue(e.target.value)}
            value={searchInputValue}
          />
          <Button onClick={handleNewTerm} disabled={loading} ml={2}>
            Search
          </Button>
        </Flex>
        <Flex
          sx={{
            flexBasis: '50%',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Text mr={3}>Total : {total.toLocaleString()}</Text>
          <Button
            onClick={handlePrev}
            disabled={loading || previousPage < 1}
            mr={2}
          >
            Previous
          </Button>
          <Button onClick={handleNext} disabled={loading}>
            Next
          </Button>
        </Flex>
      </Flex>
      {loading && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Spinner
            role="progressbar"
            aria-valuetext="Loading..."
            aria-busy="true"
          />
        </Box>
      )}
      {!loading && (
        <Flex
          sx={{ flexWrap: 'wrap', alignItems: 'flex-start', mt: 4, mx: -1 }}
        >
          {artworks.map(artwork => (
            <Card
              key={artwork.node.id}
              p={1}
              sx={{ p: 1, mb: 3, mx: 2, maxWidth: '300px' }}
            >
              <Image alt={artwork.node.title} src={artwork.node.image.url} />
              <Text>{artwork.node.title}</Text>
            </Card>
          ))}
        </Flex>
      )}
    </Box>
  );
}

export default ArtworksList;
