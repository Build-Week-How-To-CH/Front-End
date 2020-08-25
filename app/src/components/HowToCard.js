//SINGLE HOW-TO
// edit / delete functionality here

import React, {useState, useEffect} from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

export const HowToCard = () => {
  const [howTo, setHowTo] = useState(null)

  useEffect(() => {
    axiosWithAuth().get(`/api/howtos/${id}`) 
    .then((res) =>{
        console.log(res)
        setHowTo(res.data)
    })
    .catch(error => console.log(error))
},[id])

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
