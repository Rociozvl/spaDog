import React from "react";
import CardCSS from "./Card.module.css"

export default function Card({image , name , temperaments , weight , id}){

    let fixedTemps = []
    temperaments?.forEach((el)=> fixedTemps.push(el.name))

    return(
        <div className={CardCSS.container}>
            <div className={CardCSS.overlay}>
                <a href={`http://localhost:3000/dogs/${id}`}><h3>Details</h3></a>
            </div>
            <div className={CardCSS.img_container}>
            <img className={CardCSS.img} src={image} alt="img not found" />
            </div>
            <div className={CardCSS.data_container}>
            <h2>{name}</h2>
            <p>{fixedTemps?.join(", ")}</p>
            <h5>Between {weight[0]} and {weight[1]} kg</h5>
            </div>

        </div>
        
    )
}