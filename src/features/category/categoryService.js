import axios from "axios"
import { baseURL, config } from "../../utils/api"

const getCategory = async (data) => {
    const response = await axios.get(`${baseURL}brands`, data, config)
    if (response.data) {

        return response.data
    }
}

const getCategoryId = async (id) => {
    const response = await axios.get(`${baseURL}brands/?populate=*&[filters][id]=${id}`, id, config)
    if (response.data) {
        return response.data
    }
}



export const categoryService = {
    getCategory,
    getCategoryId,
}