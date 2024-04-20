import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosExpand } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import propTypes from "prop-types";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWishlistAction } from "../app/actions/userAction";
import { toast } from "react-toastify";
import { CLEAR_ERRORS, CLEAR_MESSAGES } from "../app/constants/userConstant";
import Loader from "./Loader";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { message, error } = useSelector((state) => state.userCartWishlist);

  //state
  const [inWishlist, setInWishlist] = useState(false);

  // function
  const handleAddWishlist = async () => {
    await dispatch(addWishlistAction(product._id));
    setInWishlist(true);
  };

  useMemo(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: CLEAR_MESSAGES });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [message, error, dispatch]);

  //useEffect
  useEffect(() => {
    if (user && user.wishlist) {
      if (user.wishlist.includes(product && product._id)) {
        setInWishlist(true);
      }
    }
  }, [product, user]);

  return (
    <div className="product_cart_container">
      {!product ? (
        <Loader />
      ) : (
        <>
          <div className="top">
            <img src={product.images[0].url} alt="img" />
            <div className="left">
              <span className="discount">{product.discount}%</span>
            </div>
            <div className="right">
              <span className="expand">
                <IoIosExpand />
              </span>
              <span className="wishlist" onClick={handleAddWishlist}>
                {inWishlist ? <FaHeart /> : <FaRegHeart />}
              </span>
            </div>
          </div>
          <div className="bottom">
            <div className="heading">
              <h5>{product.brand}</h5>
              <h4
                onClick={() => {
                  navigate(
                    `/products/${product.gender}/${product.category}/${product._id}`
                  );
                }}
              >
                {product.title}
              </h4>
            </div>

            <div className="star_rating">
              <div>
                {[...Array(5)].map((_, index) => {
                  index += 1;
                  return (
                    <FaStar
                      key={index}
                      className={
                        index <= product.ratings ? "active" : "inactive"
                      }
                    />
                  );
                })}
              </div>

              <span>{product.numOfReviews}</span>
            </div>

            <div className="price">
              <span>₹ {product.mrp} </span>
              <span>₹ {product.price} </span>
            </div>

            <button
              onClick={() => {
                navigate(
                  `/products/${product.gender}/${product.category}/${product._id}`
                );
              }}
            >
              Read More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

ProductCart.propTypes = {
  product: propTypes.object,
};

export default ProductCart;
