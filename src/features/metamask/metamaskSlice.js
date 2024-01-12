import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { metamaskService } from '../metamask/metamaskService';
import { toast } from 'react-toastify';

export const connectWallet = createAsyncThunk(
    'metamask/connect',
    async (thunkAPI) => {
        try {
            return await metamaskService.handleConnectWallet()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const metamaskSlice = createSlice({
    name: 'metamask',
    initialState: {
        walletInfo: null,
        isConnect: false
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.pending, (state) => {
                state.isConnect = true
            })
            .addCase(connectWallet.fulfilled, (state, action) => {
                state.isConnect = true
                state.walletInfo = action.payload
            })
            .addCase(connectWallet.rejected, (state, action) => {
                state.isConnect = false
                state.walletInfo = null
            })
    }
})

// Action creators are generated for each case reducer function
export default metamaskSlice.reducer