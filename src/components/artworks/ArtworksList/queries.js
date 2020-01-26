import { gql } from '@apollo/client';

export const ARTWORKS_FILTER = gql`
  query FilterArtworks($term: String, $page: Int, $pageSize: Int!) {
    filter_artworks(page: $page, keyword: $term, aggregations: [TOTAL]) {
      counts {
        total
      }
      filtered_artworks: artworks_connection(first: $pageSize) {
        pageCursors {
          previous {
            page
          }
        }
        edges {
          node {
            id
            href
            title
            href
            image {
              url
            }
          }
        }
      }
    }
  }
`;
