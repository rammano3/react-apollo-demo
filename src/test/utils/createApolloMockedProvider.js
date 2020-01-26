import React from 'react';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client';
import { SchemaLink } from 'apollo-link-schema';
import { onError } from 'apollo-link-error';
import getGlobalResolvers from 'test/mocks/globalResolvers';

export const createApolloMockedProvider = typeDefs => ({
  customResolvers = {},
  children,
}) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolverValidationOptions: { requireResolversForResolveType: false },
  });

  addMockFunctionsToSchema({
    schema,
    mocks: {
      ...getGlobalResolvers(),
      ...customResolvers,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(() => {}),
      new SchemaLink({ schema: schema }),
    ]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
