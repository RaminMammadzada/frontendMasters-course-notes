import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

// const link = new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' });
const link = new HttpLink({ uri: 'http://localhost:4000/' });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
});

// const query = gql`
//   {
//     pets {
//       name
//       id
//       img
//     }
//   }
// `

// client.query({ query })
//   .then(result => console.log(result));

export default client;
