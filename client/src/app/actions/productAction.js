import axios from "axios";
import {
  ADD_REVIEW_PRODUCT_FAIL,
  ADD_REVIEW_PRODUCT_REQUEST,
  ADD_REVIEW_PRODUCT_SUCCESS,
  DELETE_REVIEW_PRODUCT_FAIL,
  DELETE_REVIEW_PRODUCT_REQUEST,
  DELETE_REVIEW_PRODUCT_SUCCESS,
  GET_BESTSELLER_PRODUCTS_FAIL,
  GET_BESTSELLER_PRODUCTS_REQUEST,
  GET_BESTSELLER_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_SEARCH_PRODUCTS_FAIL,
  GET_SEARCH_PRODUCTS_REQUEST,
  GET_SEARCH_PRODUCTS_SUCCESS,
  GET_TOPRATED_PRODUCTS_FAIL,
  GET_TOPRATED_PRODUCTS_REQUEST,
  GET_TOPRATED_PRODUCTS_SUCCESS,
  GET_TRENDING_PRODUCTS_FAIL,
  GET_TRENDING_PRODUCTS_REQUEST,
  GET_TRENDING_PRODUCTS_SUCCESS,
} from "../constants/productConstatnt";

// get products
export const getProductsAction =
  (
    gender = "",
    category = "",
    brand,
    color = "",
    price,
    ratings,
    discount,
    page = 1,
    limit = 10
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_REQUEST });

      const { data } = await axios.get(
        `/api/v1/products?${
          gender && gender === "all" ? "" : `gender=${gender}`
        }${category && `&category=${category}`}${brand && `&brand=${brand}`}${
          color && `&color=${color}&page=${page}`
        }${price && `&price[gte]=${price[0]}&price[lte]=${price[1]}`}${
          ratings &&
          `&ratings[gte]=${ratings[0]}&ratings[lte]=${ratings[1]}${
            discount && `&discount=${discount}`
          }&page=${page}&limit=${limit}`
        }`
      );

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// getsearch products
export const getSearchProductsAction = (search) => async (dispatch) => {
  try {
    dispatch({ type: GET_SEARCH_PRODUCTS_REQUEST });

    const { data } = await axios.get(
      `/api/v1/products?${search && `keyword=${search}`}`
    );

    dispatch({ type: GET_SEARCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SEARCH_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get product
export const getProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get trending products
export const getTrendingProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TRENDING_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/products?sort=createdAt,-1`);

    dispatch({ type: GET_TRENDING_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TRENDING_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get top rated products
export const getTopRatedProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOPRATED_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/products?sort=ratings,-1`);

    dispatch({ type: GET_TOPRATED_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TOPRATED_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get best seller products
export const getBestSellerProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BESTSELLER_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/products?sort=numOfOrders,-1`);

    dispatch({ type: GET_BESTSELLER_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_BESTSELLER_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//----------------------------------------------------------------
//add review
export const addReviewProductAction =
  (id, rating, comment) => async (dispatch) => {
    try {
      dispatch({ type: ADD_REVIEW_PRODUCT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/v1/product/review/${id}`,
        {
          rating,
          comment,
        },
        config
      );

      dispatch({ type: ADD_REVIEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_REVIEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//delete review
export const deleteReviewProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/product/review/${id}`);

    dispatch({ type: DELETE_REVIEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
