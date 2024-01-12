import axios from "axios"
import { baseURL, params } from "../../utils/api"

const addToCart = async ({ userId, product, quantity }) => {
    // Kiểm tra xem người dùng đã có giỏ hàng hay chưa
    const existingCart = await axios.get(`${baseURL}carts/?populate=*&[filters][userId]=${userId}`, params);

    if (existingCart?.data?.data?.length > 0) {
        // Nếu người dùng đã có giỏ hàng, kiểm tra xem sản phẩm có trong giỏ hàng chưa
        const cartId = existingCart?.data?.data[0].id;
        const existingProducts = existingCart?.data?.data[0]?.attributes?.products;

        // Biến kiểm tra sản phẩm có trong giỏ hàng hay không
        let productExists = false;

        // Duyệt qua từng sản phẩm trong giỏ hàng
        for (let i = 0; i < existingProducts?.length; i++) {
            const existingProduct = existingProducts[i];

            // Kiểm tra xem sản phẩm có trùng id không
            if (existingProduct?.product?.id === product.id) {
                // Nếu trùng id, cập nhật quantity
                existingProduct.quantity += quantity;
                productExists = true;
                break;
            }
        }

        // Nếu sản phẩm không tồn tại, thêm mới vào mảng existingProducts
        if (!productExists) {
            existingProducts?.push({ product, quantity: quantity, isSelected: true });
        }

        // Cập nhật giỏ hàng với các sản phẩm đã được cập nhật
        const updatedCart = await axios.put(
            `${baseURL}carts/${cartId}`,
            { data: { products: existingProducts } },
            params
        );

        if (updatedCart.data) {
            return updatedCart.data;
        }
    } else {
        // Nếu người dùng chưa có giỏ hàng, tạo giỏ hàng mới và thêm sản phẩm vào đó
        const newCartResponse = await axios.post(
            `${baseURL}carts`,
            { data: { products: [{ product, quantity: quantity, isSelected: true }], userId } },
            params
        );

        if (newCartResponse.data) {
            return newCartResponse.data;
        }
    }
};

const getCart = async (userId) => {
    const response = await axios.get(`${baseURL}carts/?populate=*&[filters][userId]=${userId}`, params)
    if (response.data) {
        return response.data
    }
}

const RemoveProduct = async ({ indexId, productCart, cartId }) => {
    // const response = await axios.get(`${baseURL}carts/?populate=*&[filters][userId]=${userId}`, userId, params)
    const updataCart = productCart.filter((item, index) => index !== indexId)

    const response = await axios.put(`${baseURL}carts/${cartId}`, { data: { products: updataCart } }, params)

    if (response.data) {
        return response.data
    }
}

const incrementQuantityCart = async ({ indexId, productCart, cartId }) => {
    // const response = await axios.get(`${baseURL}carts/?populate=*&[filters][userId]=${userId}`, userId, params)
    if (indexId >= 0 && indexId < productCart.length) {
        const productUpdate = productCart.map((item, index) => {
            if (index === indexId) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item
        })

        const response = await axios.put(`${baseURL}carts/${cartId}`, { data: { products: productUpdate } }, params)

        if (response.data) {
            return response.data
        }
    }

}

const decrementQuantityCart = async ({ indexId, productCart, cartId }) => {
    if (indexId >= 0 && indexId < productCart.length) {
        const productUpdate = productCart.map((item, index) => {
            if (index === indexId && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });

        const response = await axios.put(`${baseURL}carts/${cartId}`, { data: { products: productUpdate } }, params);

        if (response.data) {
            return response.data;
        }
    }
};

const isSelectedCart = async ({ indexId, productCart, cartId }) => {
    if (indexId >= 0 && indexId < productCart.length) {
        const updatedProductCart = productCart.map((item, index) => {
            if (index === indexId) {
                return {
                    ...item,
                    isSelected: !item.isSelected,
                };
            }
            return item;
        });

        const response = await axios.put(`${baseURL}carts/${cartId}`, { data: { products: updatedProductCart } }, params);

        if (response.data) {
            return response.data;
        }
    }
};

const updateAllSelected = async ({ productCart, cartId }) => {
    // Kiểm tra nếu productCart tồn tại
    if (productCart) {
        // Tạo một bản sao của productCart với tất cả isSelected là true
        const updatedSellected = productCart.map((item) => ({
            ...item,
            isSelected: true,
        }));

        // Gửi updatedProductCart lên server
        const response = await axios.put(`${baseURL}carts/${cartId}`, { data: { products: updatedSellected } }, params);

        if (response.data) {
            return response.data;
        }
    }
    // Trả về null hoặc giá trị mặc định tùy vào trường hợp của bạn
    return null;
};

const getShipping = async () => {
    const response = await axios.get(`${baseURL}shippings/?populate=*`, params)
    if (response.data) {
        return response.data
    }
}

const updateCart = async ({data, cartId}) => {
    const response = await axios.put(`${baseURL}carts/${cartId}`, { data: { products: data } }, params);

    if (response.data) {
        return response.data;
    }
}


export const cartService = {
    addToCart,
    getCart,
    RemoveProduct,
    incrementQuantityCart,
    decrementQuantityCart,
    isSelectedCart,
    updateAllSelected,
    getShipping,
    updateCart,
}