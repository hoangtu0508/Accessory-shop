import axios from "axios"
import { baseURL, params } from "../../utils/api"

const addOrder = async ({ userId, shipId, totalAll, address, productPayment, userDataState, active, addressShipId }) => {
    const response = await axios.post(`${baseURL}orders/?populate=*`, {
        data: {
            userId: userId,
            shipping: shipId,
            status: Number(1),
            totalPrice: totalAll,
            deliveryAddress: address,
            products: productPayment,
            userDetail: userDataState,
            payment: active,
            address_ship: addressShipId
        }
    }, params)
    if (response.data) {
        return response.data
    }

}

const getOrder = async (userId) => {
    const response = await axios.get(`${baseURL}orders/?populate=*&[filters][userId]=${userId}`, params)
    if (response.data) {
        return response.data
    }
}

const getOrderId = async (id) => {
    const response = await axios.get(`${baseURL}orders/?populate=*&[filters][id]=${id}`, params)
    if (response.data) {
        return response.data
    }
}

export const orderService = {
    addOrder,
    getOrder,
    getOrderId,
}