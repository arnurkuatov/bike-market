import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            const foundItem = state.items.find(item => item.id === action.payload.id)
            if (foundItem) {
                foundItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                console.log(obj)
                return Number(obj.price) + Number(sum);
            }, 0)
            console.log('total price', state.totalPrice)
        },
        removeProduct(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        clearProducts(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    },
})

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) => state.cart.items.find(item => item.id === id)

export const {addProduct, removeProduct, clearProducts  } = cartSlice.actions

export default cartSlice.reducer