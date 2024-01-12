import axios from "axios";
import { params, baseURL, config } from "../../utils/api";

const register = async (userData) => {
    const response = await axios.post(`${baseURL}auth/local/register`, userData, config)
    if (response.data) {
        if (response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data))
        }
        return response.data
    }
}

const login = async (userData) => {
    const response = await axios.post(`${baseURL}auth/local`, userData, config)
    if (response.data) {
        if (response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data))
            localStorage.setItem("token", JSON.stringify(response.data.jwt))
        }
        return response.data
    }
}

const getUser = async (userData) => {
    const response = await axios.get(`${baseURL}users/?populate=*&[filters][id]=${userData}`, params)
    if (response.data) {
        return response.data
    }
}


export const authService = {
    register,
    login,
    getUser,
}