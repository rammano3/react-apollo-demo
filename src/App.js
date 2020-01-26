import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'theme-ui';
import { ArtworksList } from 'components/artworks/ArtworksList/ArtworksList';
import client from './apollo-client';
import theme from './theme';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ArtworksList />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
