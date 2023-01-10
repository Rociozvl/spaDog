const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    detail: []
}
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        case "FILTER_BY_TEMPERAMENT":
            const allDogs = state.allDogs;
            let filteredDogs = [];
            if(action.payload === "Todos") {
                filteredDogs = allDogs
            } else {
                for (let i = 0; i < allDogs.length; i++) {
                    let found = allDogs[i].temperaments.find(t => t.name === action.payload);
                    if(found) filteredDogs.push(allDogs[i])
                }
            }
            return {
                ...state,
                dogs: filteredDogs
            }
        case "FILTER_BY_SOURCE":
            const allDogsSource = state.allDogs;
            const filteredDogsSource = action.payload === "Todos" ? allDogsSource : allDogsSource.filter(el => el.hasOwnProperty(action.payload))
            return {
                ...state,
                dogs: filteredDogsSource
            }
        case "ORDER_BY_NAME":
            const sortedName = action.payload === "A-Z" ? 
                state.allDogs.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allDogs.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedName
            }
        case "ORDER_BY_WEIGHT":
            const sortedWeight = action.payload === "min_weight" ? 
                state.allDogs.sort((a, b) => {
                    if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                        return 1;
                    }
                    if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allDogs.sort((a, b) => {
                    if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                        return -1;
                    }
                    if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedWeight
            }
        case "DOGS_BY_NAME":
            return {
                ...state,
                dogs: action.payload
            }
        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }

        default: return state
       
    };
};

export default rootReducer;