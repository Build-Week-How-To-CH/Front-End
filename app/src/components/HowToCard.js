import React from 'react'

export const HowToCard = () => {
  return (
  <div>
    {howTo && <container>
        <h2>{howTo.title}</h2>
        <h3>{howTo.category}</h3>
        <p>{howTo.content}</p>
    </container>}
  </div>
  )
}
