import axios from "axios";
import { baseURL, params } from "../../utils/api";

const getAddress = async () => {
    try {
        const response = await axios.get(
            'https://raw.githubusercontent.com/hoangtu0508/BlockCommerce/main/data/DiaGioiHanhChinhVN.json'
        );
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getAddressUser = async (id) => {
    const response = await axios.get(`${baseURL}address-ships/?populate=*&[filters][userId]=${id}`, params)
    if (response.data) {
        return response.data
    }
}

const addAddress = async ({ userId, phone, fullName, address }) => {
    const response = await axios.post(`${baseURL}address-ships/?populate=*`, {
        data: {
            userId: userId,
            phoneReceive: phone,
            nameReceive: fullName,
            address: address,
        }
    }, params)
    if (response.data) {
        return response.data
    }
}

const deleAddress = async (id) => {
    const response = await axios.delete(`${baseURL}address-ships/${id}`, params)
    if (response.data) {
        return response.data
    }
}

const getAddressId = async (id) => {
    const response = await axios.get(`${baseURL}address-ships/?populate=*&[filters][id]=${id}`, params)
    if (response.data) {
        return response.data
    }
}

export const addressService = {
    getAddress,
    getAddressUser,
    addAddress,
    deleAddress,
    getAddressId
}