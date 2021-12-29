import axios from "axios";
import store from "../store/store";

const HTTP = axios.create({
    baseURL: '/arrow'
});

HTTP.interceptors.request.use(config => {
    const token = store.getState().user.jwtToken;
    if (token) {
        config.headers.authorization = 'Bearer ' + token;
    }

    return config;
});

export default HTTP;