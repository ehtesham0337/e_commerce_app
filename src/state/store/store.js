// import {legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducers'
import { configureStore } from "@reduxjs/toolkit";
import cartActiveReducer from "../cartActive/cartActiveSlice";
import productsReducer from "../products/productsSlice";
import { cartReducer } from "../reducers/cart";
import { api } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cartActive: cartActiveReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
