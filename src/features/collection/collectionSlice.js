import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collectionService } from "./collectionService";

export const getCollections = createAsyncThunk(
    'collection/get-collection',
    async (data, thunkAPI) => {
        try {
            const response = await collectionService.getAllCollection(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getCollectionId = createAsyncThunk(
    'collection/get-collection-id',
    async (id, thunkAPI) => {
        try {
            const response = await collectionService.getCollection(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        collection: null,
        currentCollection: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCollections.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getCollections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.collection = action.payload;
            })
            .addCase(getCollections.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(getCollectionId.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getCollectionId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentCollection = action.payload;
            })
            .addCase(getCollectionId.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
    }

})

export default collectionSlice.reducer;