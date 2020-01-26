import React from 'react';
import { render, wait } from '@testing-library/react';
import { ApolloMockedProvider } from 'test/utils/apolloProviders';
import App from '../App';

test('renders', async () => {
  const { queryByText } = render(
    <ApolloMockedProvider>
      <App />
    </ApolloMockedProvider>
  );

  expect(queryByText(/Artworks/i)).toBeInTheDocument();

  // wait for extra query tick to prevent act errors
  await wait();
});
