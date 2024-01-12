import axios from "axios"
import { baseURL, config } from "../../utils/api"

const getAllCollection = async (data) => {
    const response = await axios.get(`${baseURL}collections?populate=*`, data, config)
    if (response.data) {
        return response.data
    }
}

const getCollection = async (id) => {
    const response = await axios.get(`${baseURL}collections/?populate=*&[filters][id]=${id}`, id, config)
    if (response.data) {
        return response.data
    }
}

export const collectionService = {
    getAllCollection,
    getCollection,
}