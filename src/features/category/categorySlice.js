import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "./categoryService";

export const getAllCategory = createAsyncThunk(
    'category/get-categories',
    async (data, thunkAPI) => {
        try {
            const response = await categoryService.getCategory(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getCategoryId = createAsyncThunk(
    'category/get-category-id',
    async (id, thunkAPI) => {
        try {
            const response = await categoryService.getCategoryId(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: null,
        categoryId: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.category = action.payload;
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(getCategoryId.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getCategoryId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categoryId = action.payload;
            })
            .addCase(getCategoryId.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
    }
})

export default categorySlice.reducer;