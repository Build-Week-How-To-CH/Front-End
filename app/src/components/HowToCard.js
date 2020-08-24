import React from 'react'

export const HowToCard = () => {
  return (
  <div>
    {howTo && <container>
        <h2>{howTo.name}</h2>
        <h3>{howTo.description}</h3>
        <h3>{howTo.category}</h3>
        <h3>{howTo.complexity}</h3>
        <p>{howTo.steps}</p>
    </container>}
  </div>
  )
}
