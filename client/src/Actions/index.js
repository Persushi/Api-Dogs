import axios from 'axios'
const defaultUrl = "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/111549752/original/c12823435eaf76d022dbe7bc9cebb88f94eed2ec/draw-you-a-terrible-picture-of-a-dog.png"
export function getDogs() {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/dogs`)
            .then((response) => {
                dispatch({ type: 'GET_DOGS', payload: response.data })
            }).catch((error) => {
                dispatch({ type: 'SET_STATUS', status: 500 })
            })
    };
}
export function getBreedDetail(id) {
    return function (dispatch) {
        return axios.get("http://localhost:3001/dogs/" + id)
            .then((response) => {
                dispatch({ type: 'GET_BREED_DETAIL', payload: response.data })
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: "SET_STATUS", status: error.response.status })
                } else {
                    dispatch({ type: "SET_STATUS", status: 500 })
                }
            })
    };
}

export function getTemperaments() {
    return function (dispatch) {
        return axios.get("http://localhost:3001/temperaments")
            .then((response) => {
                dispatch({ type: "GET_TEMPERAMENTS", payload: response.data })
            })
    };
}
export function addDog(body) {
    return function (dispatch) {
        let imageChecker = new Image();
        imageChecker.src = body.urlImage;
        imageChecker.decode()
            .then(() => { if (imageChecker.width < 400 || imageChecker.height < 400) body.urlImage = defaultUrl })
            .catch(() => body.urlImage = defaultUrl)
            .finally(() => {
                return axios.post("http://localhost:3001/dog", body)
                    .then((response) => {
                        dispatch({ type: "ADD_DOG", payload: response.data, status: response.status })
                    })
                    .catch((error) => {
                        if (error.response) {
                            dispatch({ type: "SET_STATUS", status: error.response.status })
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log('Error', error.message);
                        }
                    })
            })
    }

}
export function setStatus(state) {
    return function (dispatch) {
        dispatch({ type: "SET_STATUS", status: state })
    }
}
export function filter(filtros) {
    return function (dispatch) {
        dispatch({ type: "FILTER", payload: filtros })
    }
}