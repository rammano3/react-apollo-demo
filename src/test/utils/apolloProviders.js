import { ApolloProvider } from '@apollo/client';
import { typeDefs } from 'test/mocks/typeDefs';
import { createApolloMockedProvider } from 'test/utils/createApolloMockedProvider';

// artsy api uses __id for node interface, works in client but not in
// schema generation so we just hack it to nodeId for testing
const transformedTypeDefs = typeDefs.replace(/__id/g, 'nodeId');

export const ApolloMockedProvider = createApolloMockedProvider(
  transformedTypeDefs,
  {
    provider: ApolloProvider,
  }
);
