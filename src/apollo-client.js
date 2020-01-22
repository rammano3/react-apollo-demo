import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import { onError } from 'apollo-link-error';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(() => {}),
    new HttpLink({
      uri: 'https://metaphysics-production.artsy.net/?',
    }),
  ]),
});

export default client;
