import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService'
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.register(userData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.login(userData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getDataUser = createAsyncThunk(
    'auth/get-user',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.getUser(userData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        dataUser: null,
        isLoading: false,
        isRegister: false,
        isLogin: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRegister = true
                state.user = action.payload;
                if (state.isRegister === true) {
                    toast.info("User Created Successfully !")
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isRegister = false
                state.error = action.payload;
                if (state.error === true) {
                    toast.error(action.payload.respone.data.message)
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLogin = true
                state.error = false
                state.user = action.payload
                if (state.isLogin === true) {
                    localStorage.setItem("token", action.payload.jwt)
                    toast.info("User Login Successfully !")

                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isLogin = false
                state.error = true
                state.message = action.error
                if (state.error === true) {
                    toast.error(action?.payload?.respone?.data.message)
                }
            })
            .addCase(getDataUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDataUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLogin = true
                state.error = false
                state.dataUser = action.payload

            })
            .addCase(getDataUser.rejected, (state, action) => {
                state.isLoading = false
                state.isLogin = false
                state.error = true
                state.message = action.error
                if (state.error === true) {
                    toast.error(action?.payload?.respone?.data.message)
                }
            })
    },
});

export default authSlice.reducer;