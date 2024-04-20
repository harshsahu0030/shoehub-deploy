import {
  ADD_CART_PRODUCT_FAIL,
  ADD_CART_PRODUCT_REQUEST,
  ADD_CART_PRODUCT_SUCCESS,
  ADD_WISHLIST_PRODUCT_FAIL,
  ADD_WISHLIST_PRODUCT_REQUEST,
  ADD_WISHLIST_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  GET_CART_PRODUCTS_FAIL,
  GET_CART_PRODUCTS_REQUEST,
  GET_CART_PRODUCTS_SUCCESS,
  GET_WISHLIST_PRODUCTS_FAIL,
  GET_WISHLIST_PRODUCTS_REQUEST,
  GET_WISHLIST_PRODUCTS_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REMOVE_CART_PRODUCT_FAIL,
  REMOVE_CART_PRODUCT_REQUEST,
  REMOVE_CART_PRODUCT_SUCCESS,
  REMOVE_WISHLIST_PRODUCT_FAIL,
  REMOVE_WISHLIST_PRODUCT_REQUEST,
  REMOVE_WISHLIST_PRODUCT_SUCCESS,
  VERIFIED_REGISTER_USER_FAIL,
  VERIFIED_REGISTER_USER_REQUEST,
  VERIFIED_REGISTER_USER_SUCCESS,
} from "../constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case VERIFIED_REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        message: action.payload.message,
        otp: action.payload.otp,
      };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
    case VERIFIED_REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload.message,
        user: action.payload.user,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
      };

    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
    case REGISTER_USER_FAIL:
    case VERIFIED_REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        message: action.payload.message,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export const getWishllistProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WISHLIST_PRODUCTS_REQUEST:
      return {
        loading: true,
      };

    case GET_WISHLIST_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };

    case GET_WISHLIST_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export const getCartProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_PRODUCTS_REQUEST:
      return {
        loading: true,
      };

    case GET_CART_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };

    case GET_CART_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export const userCartWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CART_PRODUCT_REQUEST:
    case ADD_WISHLIST_PRODUCT_REQUEST:
    case REMOVE_CART_PRODUCT_REQUEST:
    case REMOVE_WISHLIST_PRODUCT_REQUEST:
      return {
        loading: true,
      };

    case ADD_CART_PRODUCT_SUCCESS:
    case ADD_WISHLIST_PRODUCT_SUCCESS:
    case REMOVE_CART_PRODUCT_SUCCESS:
    case REMOVE_WISHLIST_PRODUCT_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };

    case ADD_CART_PRODUCT_FAIL:
    case ADD_WISHLIST_PRODUCT_FAIL:
    case REMOVE_CART_PRODUCT_FAIL:
    case REMOVE_WISHLIST_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
