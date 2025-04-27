import axios from "axios";

export const instanse = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        'API-KEY': process.env.REACT_APP_API_KEY
    }
})