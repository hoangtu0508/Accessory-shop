import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productService";

export const getProductCollection = createAsyncThunk(
    'product/get-product-collection',
    async (id, thunkAPI) => {
        try {
            const response = await productService.getProductCollection(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getProduct = createAsyncThunk(
    'product/get-product',
    async (data, thunkAPI) => {
        try {
            const response = await productService.getAllProduct(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getProductCategory = createAsyncThunk(
    'product/get-product-category',
    async (id, thunkAPI) => {
        try {
            const response = await productService.getProductCate(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getProductDetails = createAsyncThunk(
    'product/get-product-details',
    async (id, thunkAPI) => {
        try {
            const response = await productService.getProductDetails(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateQuantity = createAsyncThunk(
    'product/update-quantity',
    async (data, thunkAPI) => {
        try {
            const response = await productService.updataQuantityProduct(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        productCollection: null,
        products: null,
        quantity: {},
        productDetails: null,
        productCate: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        increment: (state, action) => {
            const { productId } = action.payload;
            if (state[productId]) {
                state[productId].quantity += 1;
            } else {
                state[productId] = { quantity: 2 };
            }
        },
        decrement: (state, action) => {
            const { productId } = action.payload;
            if (state[productId] && state[productId].quantity > 0) {
                state[productId].quantity -= 1;
            }
        },
        resetQuantity: (state, action) => {
            const { productId } = action.payload;
            state[productId] = { quantity: 1 };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductCollection.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getProductCollection.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.productCollection = action.payload;
            })
            .addCase(getProductCollection.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(getProductCategory.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.productCate = action.payload;
            })
            .addCase(getProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.productDetails = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(updateQuantity.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = action.payload;
            })
    }

})

export const { increment, decrement, resetQuantity } = ProductSlice.actions;
export default ProductSlice.reducer;