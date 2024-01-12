import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import metamaskReducer from '../features/metamask/metamaskSlice'
import authReducer from '../features/auth/authSlice'
import categoryReducer from '../features/category/categorySlice'
import collectionReducer from '../features/collection/collectionSlice';
import productReducer from '../features/product/productSlice'
import cartReducer from '../features/cart/cartSlice'
import addressReducer from '../features/address/addressSlice'
import currencyConverterReducer from '../features/currencyConverter/currencyConverterSlice';
import orderReducer from '../features/order/orderSlice'
import reviewReducer from '../features/review/reviewSlice'

export const store = configureStore({
    reducer: {
        metamask: metamaskReducer,
        auth: authReducer,
        category: categoryReducer,
        collection: collectionReducer,
        product: productReducer,
        cart: cartReducer,
        address: addressReducer,
        currency: currencyConverterReducer,
        order: orderReducer,
        review: reviewReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});