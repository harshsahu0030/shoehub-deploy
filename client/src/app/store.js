import { configureStore } from "@reduxjs/toolkit";
import {
  getCartProductsReducer,
  getWishllistProductsReducer,
  userCartWishlistReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  addDeleteReviewReducer,
  getBestSellerProductsReducer,
  getProductReducer,
  getProductsReducer,
  getSearchProductsReducer,
  getTendingProductsReducer,
  getTopRatedProductsReducer,
} from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    getProducts: getProductsReducer,
    getSearchProducts: getSearchProductsReducer,
    getProduct: getProductReducer,
    getBestSellerProducts: getBestSellerProductsReducer,
    getTopRatedProducts: getTopRatedProductsReducer,
    getTrendingProducts: getTendingProductsReducer,
    productReview: addDeleteReviewReducer,
    userCartWishlist: userCartWishlistReducer,
    getWishlistProducts: getWishllistProductsReducer,
    getCartProducts: getCartProductsReducer,
  },
});
