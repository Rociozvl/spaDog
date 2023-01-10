import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs",{

        });
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        })
    }
}
export function getTemperaments() {
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data
        })
    }
}

export function FilterByTemperament(payload) {
    return { 
        type: "FILTER_BY_TEMPERAMENT",
        payload
    }
}

export function FilterBySource(payload) {
    return { 
        type: "FILTER_BY_SOURCE",
        payload
    }
}

export function OrderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
}

export function getDogsByTemperament(payload) {
    return { 
        type: "DOGS_BY_TEMPERAMENT",
        payload
    }
}

export function getDogsByName (payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs?name=" + payload)
            return dispatch ({
                type: "DOGS_BY_NAME",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function OrderByWeight(payload) {
    return { 
        type: "ORDER_BY_WEIGHT",
        payload
    }
}

export function postDog(payload) {
    return async function () {
        const data = await axios.post("http://localhost:3001/dog", payload);
        return data;
    }
}

export function getDetail (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}