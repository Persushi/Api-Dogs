const initialState = {
    dogsLoaded: [],
    dogsFilter: [],
    breedDetail: {},
    arrayTemps: [],
    stateCode: 0,
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_BREED":
            return {
                ...state,
            }
        case "GET_DOGS":
            return {
                ...state,
                dogsLoaded: action.payload,
                dogsFilter: action.payload
            };

        case "GET_TEMPERAMENTS":
            return {
                ...state,
                arrayTemps: action.payload
            };
        case "ADD_DOG":
            return {
                ...state,
                stateCode: action.status
            };
        case "SET_STATUS":
            return {
                ...state,
                stateCode: action.status
            };
        case "GET_BREED_DETAIL":
            return {
                ...state,
                breedDetail: action.payload
            };
        case "FILTER":
            const filtro = (array) => {
                switch (action.payload.ord) {
                    case "a": array = array.sort(function (a, b) {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0;
                    })
                        break;
                        ;
                        ;
                    case "z": array = array.sort(function (a, b) {
                        if (a.name < b.name) return 1;
                        if (a.name > b.name) return -1;
                        return 0;
                    })
                        break;
                        ;
                    case "p": array = array.sort(function (a, b) {
                        let pesoA, pesoB;
                        a.weight.metric ? pesoA = a.weight.metric : pesoA = a.weight;
                        b.weight.metric ? pesoB = b.weight.metric : pesoA = b.weight;
                        if (parseInt(pesoA) < parseInt(pesoB)) return 1;
                        if (parseInt(pesoA) > parseInt(pesoB)) return -1;
                        return 0;
                    })
                        break;
                        ;
                    case "m": array = array.sort(function (a, b) {
                        let pesoA, pesoB;
                        a.weight.metric ? pesoA = a.weight.metric : pesoA = a.weight;
                        b.weight.metric ? pesoB = b.weight.metric : pesoA = b.weight;
                        if (parseInt(pesoA) > parseInt(pesoB)) return 1;
                        if (parseInt(pesoA) < parseInt(pesoB)) return -1;
                        return 0;
                    })
                        break;
                        ;
                    default: break;
                }
                if (action.payload.temp !== "default") {
                    array = array.filter(obj => {
                        if (Array.isArray(obj.temperament)) {
                            for (let i = 0; i < obj.temperament.length; i++) {
                                if (obj.temperament[i].name.includes(action.payload.temp)) return true
                            }
                            return false
                        }
                        if (obj.temperament) {
                            return obj.temperament
                                .includes(action.payload.temp)
                        }
                        return false
                    });
                }
                array = array.filter(obj => obj.name.toLowerCase()
                    .includes(action.payload.name.toLowerCase().trim()));
                return array
            }
            return {
                ...state,
                dogsFilter: filtro(state.dogsLoaded)

            }

        default: return state;

    }

}

export default rootReducer;