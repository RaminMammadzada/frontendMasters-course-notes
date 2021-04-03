const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  enum ShoeType {
    JORDAN
    NIKE
    ADIDDAS
  }

  type User {
    email: String!
    avatar: String!
    friends: [User!]!
  }

  type Shoe {
    brand: ShoeType!
    size: Int!
  }

  input ShoeInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: ShoeInput): [Shoe]!
  }

  
  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return [
        { brand: 'nike', size: 12 },
        { brand: 'adidas', size: 14 },
      ].filter(shoes => shoes.brand === input.brand)
    },
    me() {
      return {
        email: 'ramin@ramin.com',
        avatar: 'http://ramin.png',
        friends: []
      }
    }
  },
  Mutation: {
    newShoe(_, { input }) {
      return input
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000)
  .then(() => console.log('listening on port 4000'))