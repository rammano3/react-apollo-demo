import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloMockedProvider } from 'test/utils/apolloProviders';
import ArtworksList from '../ArtworksList';

const renderPaginatedQuery = (previousPages = [0, 1, 0]) => {
  let artworkIndex = 0;

  return render(
    <ApolloMockedProvider
      customResolvers={{
        PageCursors: () => ({
          previous: {
            page: previousPages.shift(),
          },
        }),
        Artwork: () => {
          artworkIndex += 1;
          return {
            id: `artwork-id-${artworkIndex}`,
            title: `Art ${artworkIndex}`,
          };
        },
      }}
    >
      <ArtworksList />
    </ApolloMockedProvider>
  );
};

describe('ArtworksList', () => {
  it('renders', async () => {
    const { queryByText } = render(
      <ApolloMockedProvider>
        <ArtworksList />
      </ApolloMockedProvider>
    );

    await wait();

    expect(queryByText(/Artworks/i)).toBeInTheDocument();
  });

  it('renders queried artworks', async () => {
    let mockIndex = 0;
    const { queryByText } = render(
      <ApolloMockedProvider
        customResolvers={{
          Artwork: () => {
            mockIndex += 1;
            return {
              id: `artwork-id-${mockIndex}`,
              title: `Art ${mockIndex}`,
            };
          },
        }}
      >
        <ArtworksList />
      </ApolloMockedProvider>
    );

    await wait();

    expect(queryByText('Art 1')).toBeInTheDocument();
    expect(queryByText('Art 2')).toBeInTheDocument();
  });

  it('handles pagination', async () => {
    const { queryByText } = renderPaginatedQuery();

    await wait();

    // First page renders
    expect(queryByText('Art 1')).toBeInTheDocument();
    expect(queryByText('Art 2')).toBeInTheDocument();

    // Item after pagination limit does not show
    expect(queryByText('Art 3')).not.toBeInTheDocument();

    // First page cant use a previous button
    expect(queryByText('Previous')).toHaveAttribute('disabled');

    userEvent.click(queryByText('Next'));
    await wait();

    // Last page is gone
    expect(queryByText('Art 1')).not.toBeInTheDocument();

    // Second Page renders
    expect(queryByText('Art 3')).toBeInTheDocument();
    expect(queryByText('Art 4')).toBeInTheDocument();

    // We can use previous since we have visitied before
    expect(queryByText('Previous')).not.toHaveAttribute('disabled');

    userEvent.click(queryByText('Previous'));
    await wait();

    // Renders first page.
    expect(queryByText('Art 4')).not.toBeInTheDocument();
    expect(queryByText('Art 1')).toBeInTheDocument();
    expect(queryByText('Art 2')).toBeInTheDocument();
  });

  it('handles search term', async () => {
    const searchTerm = 'David Bowie';
    const previousPages = [0, 1, 0, 0];
    let artworkIndex = 0;

    const { queryByText, queryByLabelText } = render(
      <ApolloMockedProvider
        customResolvers={{
          PageCursors: () => ({
            previous: {
              page: previousPages.shift(),
            },
          }),
          Artwork: (obj, args, context, info) => {
            artworkIndex += 1;
            const term = info.variableValues.term || '';
            return {
              id: `artwork-id-${artworkIndex}`,
              title: `Art ${term}${artworkIndex}`,
            };
          },
        }}
      >
        <ArtworksList />
      </ApolloMockedProvider>
    );

    await wait();
    expect(queryByText('Art 1')).toBeInTheDocument();

    userEvent.type(queryByLabelText('Search Art'), searchTerm);
    userEvent.click(queryByText('Search'));
    await wait();

    // We get search term results from query variable change. index is pushed from last search prefetch
    expect(queryByText(`Art ${searchTerm}6`)).toBeInTheDocument();

    // Empty search reverts to initial query
    fireEvent.change(queryByLabelText('Search Art'), { target: { value: '' } });
    userEvent.click(queryByText('Search'));
    await wait();
    expect(queryByText('Art 1')).toBeInTheDocument();
  });

  it('prefetches next page', async () => {
    const {
      queryByText,
      queryByRole,
      queryByLabelText,
    } = renderPaginatedQuery();

    await wait();

    // First page renders
    expect(queryByText('Art 1')).toBeInTheDocument();

    userEvent.click(queryByText('Next'));

    // Next results should be in cache and not show loading indicator or require act
    expect(queryByRole('progressbar')).not.toBeInTheDocument();
    expect(queryByText('Art 3')).toBeInTheDocument();

    // await prefetch
    await wait();

    userEvent.click(queryByText('Next'));
    expect(queryByRole('progressbar')).not.toBeInTheDocument();
    expect(queryByText('Art 5')).toBeInTheDocument();

    // enter input to generate new query that was not prefetched
    userEvent.type(queryByLabelText('Search Art'), 'David Bowie');
    userEvent.click(queryByText('Search'));
    // progress shown and we need to handle an act for new query
    expect(queryByRole('progressbar')).toBeInTheDocument();
    await wait();
  });
});
