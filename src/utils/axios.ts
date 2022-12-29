import axios from "axios"

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`
})

instance.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json"
        }
    }
})

instance.interceptors.response.use(
    (response) => {
        return response.data
    }, function (error) {
        return Promise.reject(error);
    });


export default instance
