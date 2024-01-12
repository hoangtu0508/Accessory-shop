import axios from "axios"

const getEthPrice = async () => {

    const usdToBnbSymbol = 'BNBUSDT'; // BNB to USDT
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
      params: {
        symbol: usdToBnbSymbol,
      },
    });

    const bnbPrice = response.data.price;

    if (bnbPrice) {
        return bnbPrice
    }
}

export const currencyConverterService = {
    getEthPrice,
}