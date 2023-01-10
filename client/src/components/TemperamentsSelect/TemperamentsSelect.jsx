import React from "react";

export default function TemperamentsSelect ({allTemperaments, handleFilterByTemperament}) {
    return (
        <select onChange={handleFilterByTemperament}>
            <option disabled selected>Temperaments</option>
            <option value="Todos">All</option>
            {allTemperaments.map(temp => (
                <option value={temp.name}>{temp.name}</option>
            ))}
        </select>
    );
};