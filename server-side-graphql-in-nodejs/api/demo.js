const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  enum ShoeType {
    JORDAN
    NIKE
    ADIDDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String!
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
    sport: String
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
    hasGrip: Boolean!
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

const user = {
  id: 1,
  email: 'ramin@ramin.com',
  avatar: 'http://ramin.png',
  shoes: []
}

const shoes = [
  { brand: 'NIKE', size: 12, sport: 'basketball', user: 1 },
  { brand: 'TIMBERLAND', size: 14, hasGrip: true, user: 1 },
]

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return shoes
    },
    me() {
      return {
        id: 1,
        email: 'ramin@ramin.com',
        avatar: 'http://ramin.png',
        shoes: []
      }
    }
  },
  Mutation: {
    newShoe(_, { input }) {
      return input
    }
  },
  User: {
    shoes() {
      return shoes;
    }
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return 'Sneaker'
      return 'Boot'
    }
  },
  Sneaker: {
    user(shoe) {
      return user;
    }
  },
  Boot: {
    user(shoe) {
      return user;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000)
  .then(() => console.log('listening on port 4000'))