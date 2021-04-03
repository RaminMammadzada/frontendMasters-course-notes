import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`;

const NEW_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
      __typename
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS)
  const [createPet, newPet] = useMutation(NEW_PET, {
    update(cache, { data: { addPet } }) {
      const data = cache.readQuery({
        query: ALL_PETS
      });
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...data.pets] },
      });
    },
    optimisticResponse: {
      __typename: "Mutation",
      addPet: {
        __typename: 'Pet',
        id: Math.floor(Math.random() * 10000) + '',
        name: "from name",
        type: "from type",
        img: 'https://via.placeholder.com/300?__cf_chl_jschl_tk__=16e008ebeaab5b39e25c86f2e78d99c42a9a6d29-1617476016-0-AXT2hPHbCKW3etadkQJpFQoy5u0grRyWVaHRU0T7S3_BBzGkS201XBmoaG6l3Nrlt9s22yalkYHgLTprVP4dd1YEDEuzMIJdrzmvVlmKPp989G-TBWsoXjsA0vgnq5J05NYyS2GtuG_IbXrVyy6ezCSMK7KQKzXKIrUUWso2mnhYRkY6-aUT8bV4Esp_Cyc9cGjFjtiyDRRP6S6QJZPFsD2HODOavTyDInL-jekY8teq-kU6PNu5Q-6kzZM3-mqgRFjMJZ3vRrVawYE8e89vkrtGDlTMjlg2F9_i1sdv6-nDZiUP1na5I27vbcnWrQIcGddjC1ZwEnYOtNGt2PjmJNoVu1sIoyLoH40-Y7teylGxH0geqyCLJUjrlPN9OIksWw'
      }
    }
  });


  const onSubmit = input => {
    setModal(false)

    // if (newPet.loading) {
    //   return <Loader />
    // }
    // if (newPet.error) {
    //   return <p>error!!</p>
    // }

    createPet({
      variables: {
        newPet: input
      },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          __typename: 'Pet',
          id: Math.floor(Math.random() * 10000) + '',
          name: input.name,
          type: input.type,
          img: 'https://via.placeholder.com/300?__cf_chl_jschl_tk__=16e008ebeaab5b39e25c86f2e78d99c42a9a6d29-1617476016-0-AXT2hPHbCKW3etadkQJpFQoy5u0grRyWVaHRU0T7S3_BBzGkS201XBmoaG6l3Nrlt9s22yalkYHgLTprVP4dd1YEDEuzMIJdrzmvVlmKPp989G-TBWsoXjsA0vgnq5J05NYyS2GtuG_IbXrVyy6ezCSMK7KQKzXKIrUUWso2mnhYRkY6-aUT8bV4Esp_Cyc9cGjFjtiyDRRP6S6QJZPFsD2HODOavTyDInL-jekY8teq-kU6PNu5Q-6kzZM3-mqgRFjMJZ3vRrVawYE8e89vkrtGDlTMjlg2F9_i1sdv6-nDZiUP1na5I27vbcnWrQIcGddjC1ZwEnYOtNGt2PjmJNoVu1sIoyLoH40-Y7teylGxH0geqyCLJUjrlPN9OIksWw'
        }
      }
    });
  }

  if (loading) {
    return <Loader />
  }

  if (error || newPet.error) {
    return <p>error!</p>
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}
