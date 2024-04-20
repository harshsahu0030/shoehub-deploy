import axios from "axios";
import {
  ADD_CART_PRODUCT_FAIL,
  ADD_CART_PRODUCT_REQUEST,
  ADD_CART_PRODUCT_SUCCESS,
  ADD_WISHLIST_PRODUCT_FAIL,
  ADD_WISHLIST_PRODUCT_REQUEST,
  ADD_WISHLIST_PRODUCT_SUCCESS,
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

// register
export const registerUserAction = (signupForm) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/register`, signupForm, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// register
export const verifiedRegisterUserAction =
  (id, otpNumber) => async (dispatch) => {
    try {
      dispatch({ type: VERIFIED_REGISTER_USER_REQUEST });

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
        crossorigin: true,
        credentials: "include",
        "Access-Control-Allow-Origin": "*",
      };

      const { data } = await axios.post(
        `/api/v1/register/${id}`,
        {
          otp: otpNumber,
        },
        config
      );
      dispatch({ type: VERIFIED_REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: VERIFIED_REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Login
export const loginUserAction = (loginForm) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
      crossorigin: true,
      credentials: "include",
      "Access-Control-Allow-Origin": "*",
    };

    const { data } = await axios.post(`/api/v1/login`, loginForm, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Load User
export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`/api/v1/load`, config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const logoutUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    const { data } = await axios.get(`/api/v1/logout`, {});

    dispatch({ type: LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//----------------------------------------------------------------

//get wishlist
export const getWishlistUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WISHLIST_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/wishlist`);

    dispatch({ type: GET_WISHLIST_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// add wishlist
export const addWishlistAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_WISHLIST_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/wishlist/add/${id}`, {});

    dispatch({ type: ADD_WISHLIST_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// remove wishlist
export const removeWishlistAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_WISHLIST_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/wishlist/remove/${id}`, {});

    dispatch({ type: REMOVE_WISHLIST_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_WISHLIST_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//----------------------------------------------------------------
//get Cart
export const getCartUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/cart`);

    dispatch({ type: GET_CART_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CART_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// add Cart
export const addCartAction =
  (id, size, quantity = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_CART_PRODUCT_REQUEST });

      const { data } = await axios.post(`/api/v1/cart/add/${id}`, {
        size,
        quantity,
      });

      dispatch({ type: ADD_CART_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_CART_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// remove cart
export const removeCartAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/cart/remove/${id}`, {});

    dispatch({ type: REMOVE_CART_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
