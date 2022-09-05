import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
let cookie = new Cookies()
export const userSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        user: {},
        counter: 0,
        response: '',
        error: ''
    },
    reducers: {
        
        setCounter: (state, action) => {
            state.counter = action.payload
        },
        
    },
    extraReducers: builder => {
        // builder.addCase(fetchProducts.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(fetchProducts.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.products = action.payload
        //     state.error = ''
        // })
        // builder.addCase(fetchProducts.rejected, (state, action) => {
        //     state.loading = false
        //     state.products = []
        //     state.error = action.error.message
        // })
//////////////////////////////
        builder.addCase(fetchUser.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            cookie.set('user', action.payload)
            state.loading = false
            state.user = {...action.payload}
            state.error = ''
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.error.message
        })
////////////////////////////
        builder.addCase(editProduct.pending, state => {
            state.loading = true
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.error = ''
        })
        builder.addCase(editProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.response = null
        })
        //////////////////////////
        builder.addCase(createUser.pending, state => {
            state.loading = true
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.error = ''
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.response = null
        })



    }
})

const createUser = createAsyncThunk('user/createUser', ({user}) => {
    return axios.post('http://don-mai.herokuapp.com/users', {user: user})
    .then( response => response.data.db)
})
const fetchUser = createAsyncThunk('users/fetchUser', ({filter, value, password}) => {
    console.log(value);
    return axios.get(`http://don-mai.herokuapp.com/users/?filter=${filter}&value=${value}&password=${password}`)
    .then( response => response.data)
})
const editProduct = createAsyncThunk('products/editProduct', ({id, findBy, infoUpdated}) => {
    // console.log(value);
    return axios.put(`http://don-mai.herokuapp.com/products/update`, {
        id,
        findBy,
        infoUpdated
    })
    .then( response => response.data)
})
export const { 
    setCounter

} = userSlice.actions
// export const productSliceReducer = productSlicetest.reducer
export const createOneUser = createUser
export const fetchOneUser = fetchUser //
export const editOneProduct = editProduct
