import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterByTemperament, getDogs, getTemperaments, FilterBySource, OrderByName, OrderByWeight } from "../../actions";
import {Link} from "react-router-dom"
import Card from "../Card/Card";
import Paginado from "../Pagination/Paginado";
import TemperamentsSelect from "../TemperamentsSelect/TemperamentsSelect";
import SearchBar from "../SearchBar/SearchBar";
import HomeCSS from "./Home.module.css"

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)

    const [CurrentPage, setCurrentPage] = useState(1);
    const [DogsOnPage, setDogsOnPage] = useState(8);
    const indexLastDog = CurrentPage * DogsOnPage;
    const indexFirstDog = indexLastDog - DogsOnPage;
    const CurrentDogs = allDogs.slice(indexFirstDog, indexLastDog);
    const [orden, setOrden] = useState("")

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments())
    },[dispatch]);

    const handleFilterByTemperament = (e) => {
        dispatch(FilterByTemperament(e.target.value))
        setCurrentPage(1)
    }

    const handleFilterBySource = (e) => {
        dispatch(FilterBySource(e.target.value))
    }

    const handleOrderByName = (e) => {
        dispatch(OrderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleOrderByWeight = (e) => {
        dispatch(OrderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    

    return (
        
        <div  className={HomeCSS.home} >
            <div className={HomeCSS.top_bar}>
                
                <div className={HomeCSS.creatingDog}>
                    <Link to= "/dog">Crear</Link>
                </div>

                <div className={HomeCSS.filters_container}>        
                    
                    <select onChange={handleOrderByName}>
                        <option disabled selected>Alphabetical order</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                        
                    <select onChange={handleOrderByWeight}>
                        <option disabled selected>Filter by weight</option>
                        <option value="max_weight">Max</option>
                        <option value="min_weight">Min</option>
                    </select>
                        
                    <select onChange={handleFilterBySource} >
                        <option disabled selected>Filter by source</option>
                        <option value="Todos">All</option>
                        <option value="createdInDB">Created</option>
                        <option value="api">API</option>
                    </select>
                
                    <TemperamentsSelect 
                        allTemperaments={allTemperaments} 
                        handleFilterByTemperament={handleFilterByTemperament}
                    />

                </div>

                <SearchBar/>

            </div>

            <div className={HomeCSS.cards_container}>
                {CurrentDogs.map(d => (
                    <Card
                    key={d.ID}
                    id={d.ID} 
                    name={d.name} 
                    image={d.image} 
                    temperaments={d.temperaments} 
                    weight={d.weight}/>    
                ))}
            </div>
                
            <Paginado
                DogsOnPage={DogsOnPage}
                allDogs={allDogs.length}
                paginado={paginado}
            /> 

        </div>    
    )
}