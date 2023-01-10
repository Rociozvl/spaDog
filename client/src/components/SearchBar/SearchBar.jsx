import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../actions";
import SearchBarCSS from "./SearchBar.module.css"

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getDogsByName(name))
    }


    return (
        <div className={SearchBarCSS.container}>
            <input 
            className={SearchBarCSS.input}
            type="text"
            onChange={(e) => handleInput(e)}
            
            />
            <button className={SearchBarCSS.btn} onClick={(e) => handleSubmit(e)} type="submit">Buscar</button>
        </div>
    )
}