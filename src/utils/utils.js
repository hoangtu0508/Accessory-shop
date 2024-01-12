import axios from "axios";
import Web3 from 'web3';
import { baseURL, config, params } from "./api";

export const calculateTotalPrice = (productPayment) => {
    return productPayment?.reduce((acc, item) => {
        return acc + item?.product?.attributes?.productPrice * item?.quantity;
    }, 0);
};

export const getSelectedProducts = (productCart) => {
    // Chỉ lấy các sản phẩm có isSelected là true
    const selectedProducts = productCart?.filter((product) => product.isSelected);
    return selectedProducts
};

export const areAllSelected = (productCart) => {
    return productCart?.every((item) => item.isSelected);
};

export const converEth = (ethPrice, shipping) => {
    // const usdPrice = ethPrice?.ethereum.usd
    const results = shipping / ethPrice
    if (results) {
        return results
    }
}

export const initWeb3 = async () => {
    try {
        if (!window.ethereum)
            await window.ethereum.send("eth_requestAccounts");
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            // Nếu đã có tài khoản, sử dụng đối tượng Web3 đã khởi tạo
            return new Web3(window.ethereum);
        } else {
            // Nếu chưa có tài khoản, thực hiện kết nối
            await window.ethereum.enable();
            return new Web3(window.ethereum);
        }
    } catch (error) {

    }
};

export const sendTransaction = async (total) => {
    console.log(total);
    const paymentAddress = '0xF60c400d364a5FE7f543d66c8375cbc8202BF5E6';
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const senderAddress = accounts[0];
    const Wei = 1e18;

    const params = [
        {
            from: senderAddress,
            to: paymentAddress,
            value: Number(total * Wei).toString(16),
            gasPrice: Number(10000000000).toString(16),
        }
    ]

    try {
        const result = await window.ethereum.request({ method: 'eth_sendTransaction', params });
        console.log('Transaction Successful:', result);
        return result
    } catch (error) {
        console.error('Transaction Error:', error);
    }
}

export const handleConnectWallet = async () => {
    try {
        let web3;

        // Kiểm tra xem đã kết nối với MetaMask chưa
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
        } else {
            // Nếu chưa kết nối, thực hiện kết nối bằng hàm initWeb3
            web3 = await initWeb3();
        }

        const accounts = await web3.eth.requestAccounts();
        const walletAddress = accounts[0];

        // Gọi phương thức eth_getBalance
        const weibalance = await web3.eth.getBalance(walletAddress);
        const balance = web3.utils.fromWei(weibalance, 'ether');

        // Trả về đối tượng chứa địa chỉ ví và số dư tiền
        return { walletAddress, balance };
    } catch (error) {
        console.error(error);
        // Xử lý lỗi kết nối
    }
};

export const updateCart = (arr) => {
    return arr.filter(item => !item.isSelected);
}

export const updateReview = async ({ id, review }) => {
    const response = await axios.get(`${baseURL}products/${id}`, params)

    if (response.data) {
        return response.data
    }
}

export const handleSpent = (orders) => {
    return orders?.reduce((acc, order) => {
        return acc = acc + order.attributes?.totalPrice
    }, 0)
}

export const getProductId = async (id) => {
    try {
        const response = await axios.get(`${baseURL}products/?populate=*&[filters][id]=${id}`, config);
        if (response.data && response.data.data.length > 0) {
            const quantity = response.data.data[0].attributes.productQuantity;
            return quantity;
        }
        return 0; // Trả về 0 hoặc giá trị mặc định nếu không có dữ liệu
    } catch (error) {
        console.error('Error fetching product quantity:', error);
        throw error; // Re-throw lỗi để bắt ở nơi gọi
    }
};

export const uploadQuantity = async ({productId,quantity}) => {

    console.log(productId, quantity);
    try {
        const res = await axios.put(
            `${baseURL}products/${productId}?populate=*`,
            {
                data: {
                    productQuantity: quantity,
                },
            }
        );
    } catch (error) {
        console.error('Error fetching product quantity:', error);
        throw error; // Re-throw lỗi để bắt ở nơi gọi
    }
};

