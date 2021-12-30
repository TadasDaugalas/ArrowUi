import {createSlice} from "@reduxjs/toolkit";
import {addLocalStorage, getLocalStorage} from "../../storage/localStorage";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existingProduct = state.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.count++;
            } else {
                product.count = 1;
                state.push(product);
            }
        },
        removeFromCart(state, {payload: id}) {
            return state.filter(p => p.id !== id);
        }
    }
});
let previousCart = [];
const subscribeToStorage = (store) => {
    store.subscribe(() => {
        const cart = store.getState().cart;
        if (previousCart !== cart) {
            addLocalStorage('cart', cart);
            previousCart = cart;
        }
    });
}
const loadCartFromLocalStorage = () => getLocalStorage('cart') || [];


// const cartReducer = (state = [], action) => {
//     switch (action.type) {
//         case ADD_TO_CART : {
//             const existProduct = state.find(p => p.id === action.product.id);
//             if (existProduct) {
//                 existProduct.count++;
//                 return [...state];
//             } else {
//                 const {product} = action;
//                 product.count = 1;
//                 return [...state, product]
//             }
//         }
//         case REMOVE_FROM_CART: {
//             return state.filter(p => p.id !== action.id);
//         }
//         default:
//             return state;
//     }
// }
//
// const addToCart = (product) => ({type: ADD_TO_CART, product});
// const removeFromCart = (id) => ({type: REMOVE_FROM_CART, id});
export default cartSlice.reducer;
export const {addToCart, removeFromCart} = cartSlice.actions;
export {subscribeToStorage, loadCartFromLocalStorage};