import React from 'react'

const PetBox = ({ pet }) => (
  <div className="pet">
    <figure>
      <img src={pet.img + `?pet=${pet.id}`} alt="" />
    </figure>
    <div className="pet-name">{pet.name}</div>
    <div className="pet-type">{pet.type}</div>
    <div className="pet-type">{pet.owner.age}</div>
    <div className="pet-type">{pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}</div>
  </div>
)

export default PetBox
