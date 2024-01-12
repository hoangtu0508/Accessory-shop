import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'review',
    initialState: {
        productReview: null,
        isError: false,
        isSuccessCart: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        setproductReview: (state, action) => {
            state.productReview = action.payload
        },
        // setShippingEth: (state, action) => {
        //     state.shipEth = action.payload
        // },
        // setTotalPrice: (state, action) => {
        //     state.totalPrice = action.payload
        // },
        // setTotalEth: (state, action) => {
        //     state.totalEth = action.payload
        // }
    },
}
)
export const { setproductReview } = cartSlice.actions
export default cartSlice.reducer;