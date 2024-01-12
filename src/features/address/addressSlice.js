import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addressService } from "./addressService";
import { toast } from "react-toastify";

export const getAddressShipping = createAsyncThunk(
    'address/get-address',
    async (data, thunkAPI) => {
        try {
            const response = await addressService.getAddress(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getAddresShipsUser = createAsyncThunk(
    'address/get-address-user',
    async (data, thunkAPI) => {
        try {
            const response = await addressService.getAddressUser(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const addAddressShip = createAsyncThunk(
    'address/add-address',
    async (data, thunkAPI) => {
        try {
            const response = await addressService.addAddress(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteAddress = createAsyncThunk(
    'address/dele-address',
    async (data, thunkAPI) => {
        try {
            const response = await addressService.deleAddress(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getAddressShipId = createAsyncThunk(
    'address/get-address-id',
    async (data, thunkAPI) => {
        try {
            const response = await addressService.getAddressId(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: null,
        addressUser: null,
        addressShipID: null,
        addressDelivery: null,
        addressShip: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        setAddressDelivery: (state, action) => {
            state.addressDelivery = action.payload
        },

        setIdAddress: (state, action) => {
            state.addressShipID = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAddressShipping.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAddressShipping.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.address = action.payload;
            })
            .addCase(getAddressShipping.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(getAddresShipsUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAddresShipsUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.addressUser = action.payload;
            })
            .addCase(getAddresShipsUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(addAddressShip.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(addAddressShip.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                if (state.isSuccess) {
                    toast.success("Add to Address Success");
                }
            })
            .addCase(addAddressShip.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                if (state.isSuccess) {
                    toast.success("Delete to Address Success");
                }
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(getAddressShipId.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAddressShipId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.addressShip = action.payload;
            })
            .addCase(getAddressShipId.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
    }
})

export const { setAddressDelivery, setIdAddress } = addressSlice.actions;
export default addressSlice.reducer;