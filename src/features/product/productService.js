import axios from "axios"
import { baseURL, config } from "../../utils/api"

const getProductCollection = async (id) => {
    const response = await axios.get(`${baseURL}collections/?[filters][id]=${id}&populate[products][populate][0]=category&populate[products][populate][1]=productImg`, id, config)
    if (response.data) {
        return response.data
    }
}

const getAllProduct = async (data) => {
    const response = await axios.get(`${baseURL}products/?populate=*`, data, config)
    if (response.data) {
        return response.data
    }
}

const getProductCate = async (id) => {
    const response = await axios.get(`${baseURL}brands/?[filters][id]=${id}&populate[products][populate][0]=category&populate[products][populate][1]=productImg`, id, config)
    if (response.data) {
        return response.data
    }
}

const getProductDetails = async (id) => {
    const response = await axios.get(`${baseURL}products/?populate=*&[filters][id]=${id}`, id, config).then()
    if (response.data) {
        return response.data
    }
}

const updataQuantityProduct = async (productPayment) => {
    productPayment.forEach((product) => {
        const productId = product.product.id
        const qty = product.quantity
        console.log(productId, qty);
        const response = axios.get(`${baseURL}products/?populate=*&[filters][id]=${productId}`, config)

        console.log(response);
        const quantity = response.data.attributes.productQuantity
        console.log(quantity);
        const res = axios.put(
            `${baseURL}products/${productId}?populate=*`,
            {
                data: {
                    productQuantity: quantity - qty,
                }
            }
        );
    })
}


export const productService = {
    getProductCollection,
    getAllProduct,
    getProductCate,
    getProductDetails,
    updataQuantityProduct,
}