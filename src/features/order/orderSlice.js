import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { orderService } from '../order/orderService';
import { toast } from 'react-toastify';

export const addOrderUser = createAsyncThunk(
    'order/add-order',
    async (data, thunkAPI) => {
        try {
            return await orderService.addOrder(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getOrderUser = createAsyncThunk(
    'order/get-order-user',
    async (data, thunkAPI) => {
        try {
            const response = await orderService.getOrder(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const handleGetOrderId = createAsyncThunk(
    'order/get-order-id',
    async (data, thunkAPI) => {
        try {
            const response = await orderService.getOrderId(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const orderSkice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        orderUser: null,
        orderId: null,
        isConnect: false,
        isSuccessCart: null
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(addOrderUser.pending, (state) => {
                state.isConnect = true
            })
            .addCase(addOrderUser.fulfilled, (state, action) => {
                state.isSuccessCart = true;
                state.isError = false;
                state.order = action.payload;
                if (state.isSuccessCart) {
                    toast.success("Order Product Success");
                }

            })
            .addCase(addOrderUser.rejected, (state, action) => {
                state.isConnect = false
            })
            .addCase(getOrderUser.pending, (state) => {
                state.isConnect = true
            })
            .addCase(getOrderUser.fulfilled, (state, action) => {
                state.isSuccessCart = true;
                state.isError = false;
                state.orderUser = action.payload;

            })
            .addCase(getOrderUser.rejected, (state, action) => {
                state.isConnect = false
            })
            .addCase(handleGetOrderId.pending, (state) => {
                state.isConnect = true
            })
            .addCase(handleGetOrderId.fulfilled, (state, action) => {
                state.isSuccessCart = true;
                state.isError = false;
                state.orderId = action.payload;

            })
            .addCase(handleGetOrderId.rejected, (state, action) => {
                state.isConnect = false
            })
    }
})

// Action creators are generated for each case reducer function
export default orderSkice.reducer