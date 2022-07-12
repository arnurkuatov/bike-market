import { configureStore } from '@reduxjs/toolkit'
import bikes from "./slices/bikeSlice"
import cart from "./slices/cartSlice"


export const store = configureStore({
    reducer: {
        bikes,
        cart
    },
})