import React, {useState, useEffect} from 'react'
// import { axiosWithAuth } from '../utils/axiosWithAuth'

export default function HowTos(props){
    // console.log(props)
    // const [howTo, setHowTo] = useState(null);
     
    // useEffect(() => {
    //     axiosWithAuth()
    //     .get(`/api/auth/howtos/${props.ht.id}`)
    //     .then((res) =>{setHowTo(res.data)})
    //     .catch((err) => console.log(err));
    // },[])

    return(
        <div>
            {props.howTo && <container>
                <h2>{props.howTo.title}</h2>
                <h3>{props.howTo.category}</h3>
                <p>{props.howTo.content}</p>
            </container>}
        </div>
    )
};