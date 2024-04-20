import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getWishlistUserAction,
  loadUserAction,
  removeWishlistAction,
} from "../app/actions/userAction";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { CLEAR_ERRORS, CLEAR_MESSAGES } from "../app/constants/userConstant";

const WishlistProductCart = ({ product }) => {
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.userCartWishlist
  );

  //function
  const handleRemove = async () => {
    await dispatch(removeWishlistAction(product._id));
    dispatch(loadUserAction());
    dispatch(getWishlistUserAction());
  };

  //useEffect
  useMemo(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: CLEAR_MESSAGES });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, error, message]);

  return (
    product && (
      <div className="wishlist_product_cart_container">
        <div className="top">
          <img src={product.images[0].url} alt="img" />
        </div>
        <div className="center">
          <div className="heading">
            <h5>{product.brand}</h5>
            <h4>{product.title}</h4>
          </div>
          <div className="price">
            <span>₹{product.mrp}</span>
            <span>₹{product.price}</span>
            <span>{product.discount}%</span>
          </div>
        </div>
        <div className="bottom">
          <button onClick={handleRemove} disabled={loading}>
            REMOVE FROM WISHLIST
          </button>
          <button
            onClick={() => {
              navigate(
                `/products/${product.gender}/${product.category}/${product._id}`
              );
            }}
          >
            READ MORE
          </button>
        </div>
      </div>
    )
  );
};

WishlistProductCart.propTypes = {
  product: propTypes.object,
};

export default WishlistProductCart;
