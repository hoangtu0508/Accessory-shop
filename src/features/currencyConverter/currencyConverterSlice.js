import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { currencyConverterService } from "./currencyConverterService"

export const getPriceEth = createAsyncThunk(
    'currency/get-eth-price',
    async (thunkAPI) => {
        try {
            return await currencyConverterService.getEthPrice()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const currencyConverterSlice = createSlice({
    name: 'currency',
    initialState: {
        ethPrice: null,
        isConnect: false
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getPriceEth.pending, (state) => {
                state.isConnect = true
            })
            .addCase(getPriceEth.fulfilled, (state, action) => {
                state.isConnect = true
                state.ethPrice = action.payload
            })
            .addCase(getPriceEth.rejected, (state, action) => {
                state.isConnect = false
                state.ethPrice = null
            })
    }
})

// Action creators are generated for each case reducer function
export default currencyConverterSlice.reducer
