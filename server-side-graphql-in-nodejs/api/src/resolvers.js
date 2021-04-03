/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    // demo(_, __, { models }) {
    //   models.Pet.findMany({})
    // }
    pets(_, { input }, ctx) {
      return ctx.models.Pet.findMany(input)
    },
    pet(_, { input }, ctx) {
      return ctx.models.Pet.findOne(input)
    }
  },
  Mutation: {
    newPet(_, { input }, ctx) {
      const pet = ctx.models.Pet.create(input);
      return pet;
    },
    updatePet(_, {input}, ctx) {
      const pet = ctx.models.Pet.update(iput.id, input.updates);
      return pet;
    }
  },
  Pet: {
    // img(pet) {
    //   return pet.type === 'DOG'
    //     ? 'https://placedog.net/300/300'
    //     : 'http://placekitten.com/300/300'
    // }
  },
  // User: {

  // }
}