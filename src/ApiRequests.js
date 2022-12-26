import axios from "axios";


export const sendApiGetRequest = (request, callback) => {
    axios.get(request)
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}

export const sendApiGetRequestWithParams = (request ,params, callback) => {
    axios.get(request, {
        params
    })
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


export const sendApiPostRequest = (request, params, callback) => {
    axios.post(request, null, {
        params
    }).then(response => {
        if (callback) {
            callback(response);
        }
    })
}
