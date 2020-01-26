import React from 'react';
import { Flex, Card, Image, Text } from 'theme-ui';

export const ArtworkCards = ({ artworks }) => (
  <Flex sx={{ flexWrap: 'wrap', alignItems: 'flex-start', mt: 4, mx: -1 }}>
    {artworks.map(artwork => (
      <Card key={artwork.node.id} p={1} sx={{ p: 1, mb: 3, mx: 2 }}>
        <Image
          alt={artwork.node.title}
          src={artwork.node.image.url}
          width={300}
          height={300 / artwork.node.image.aspect_ratio}
        />
        <Text>
          <strong>{artwork.node.title}</strong>
        </Text>
        <Text>
          <i>{artwork.node.artist_names}</i>
        </Text>
      </Card>
    ))}
  </Flex>
);

export default ArtworkCards;
