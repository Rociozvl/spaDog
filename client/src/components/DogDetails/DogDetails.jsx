import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import DogDetailsCSS from "./DogDetails.module.css"

export default function DogDetails () {
    const dispatch = useDispatch()
    let { id } = useParams()
    console.log(id)
    
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch])

    const dog = useSelector((state) => state.detail)

    console.log(dog)

    let fixedTemps = []
    dog[0]?.temperaments?.forEach((el) => fixedTemps.push(el.name))

    return (
        <div className={DogDetailsCSS.container}>
            
                <Link to="/home">
                    <h3>Home</h3>
                </Link>
           
                
            {
                dog.length > 0 ?
                    <div className={DogDetailsCSS.dog_container}>
                        <div className={DogDetailsCSS.img_container}>
                            <img src={dog[0].image} alt="Imagen" />
                        </div>

                        <div className={DogDetailsCSS.details_container}>
                            <div className={DogDetailsCSS.h1_container}>
                                <h1> {dog[0].name} </h1>
                            </div>
                                <div className={DogDetailsCSS.temperaments_container}>
                                    {fixedTemps.map(el => <div className={DogDetailsCSS.temp}>{el}</div>)}
                                </div>
                                <div className={DogDetailsCSS.dog_info}>
                                    <div><h2>Height:</h2><h4>Between {dog[0].height[0]} and {dog[0].height[1]} cms</h4></div>
                                    <div><h2>Weight:</h2><h4>Between {dog[0].weight[0]} and {dog[0].weight[1]} Kg</h4></div>
                                    <div><h2>Lifespan:</h2><h4>Between {dog[0].life_span} </h4></div>
                                </div>

                        </div>
                    </div>

                 :  
                <p>Loading...</p>
            }
        </div>
    )
}