import { FaStar } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider";
import { SlHandbag } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TbStars } from "react-icons/tb";

import {
  addReviewProductAction,
  getProductAction,
} from "../app/actions/productAction";
import { toast } from "react-toastify";
import { CLEAR_ERRORS, CLEAR_MESSAGES } from "../app/constants/userConstant";
import { Markup } from "interweave";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  addCartAction,
  addWishlistAction,
  loadUserAction,
} from "../app/actions/userAction";
import { homeData } from "../data/home";
import ReviewCart from "../components/ReviewCart";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => state.getProduct);
  const { user } = useSelector((state) => state.user);

  const {
    // loading: userCartWishlistLoading,
    message: userCartWishlistMessage,
    error: userCartWishlistError,
  } = useSelector((state) => state.userCartWishlist);
  const {
    // loading: reviewLoading,
    message: reviewMessage,
    error: reviewError,
  } = useSelector((state) => state.productReview);

  //state
  const [toggleButton, setToggleButton] = useState("description");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [size, setSize] = useState();

  //ref
  const addCommentRef = useRef();

  //function
  const handleVisibleAddComment = (text) => {
    setRating(0);
    setHover(0);
    setComment("");
    if (text === "visible") {
      addCommentRef.current.style.opacity = 1;
      addCommentRef.current.style.visibility = "visible";
    } else {
      addCommentRef.current.style.opacity = 0;
      addCommentRef.current.style.visibility = "hidden";
    }
  };

  //function
  const hangleToggle = (text) => {
    setToggleButton(text);
  };

  const handleClick = (getCurrentIndex) => {
    setRating(getCurrentIndex);
  };

  const handleMouseEnter = (getCurrentIndex) => {
    setHover(getCurrentIndex);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addReviewProductAction(id, rating, comment));
    dispatch(getProductAction(id));

    setRating(0);
    setHover(0);
    setComment("");
    handleVisibleAddComment();
  };

  const handleWishlist = async () => {
    await dispatch(addWishlistAction(id));
    dispatch(loadUserAction());
  };

  const handleCart = async () => {
    await dispatch(addCartAction(id, size));
    dispatch(loadUserAction());
  };

  //useEffect
  useEffect(() => {
    if (error) {
      toast(error);
      dispatch({ type: CLEAR_ERRORS });
      navigate(-1);
    }
    if (reviewMessage) {
      toast.success(reviewMessage);
      dispatch({ type: CLEAR_MESSAGES });
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch({ type: CLEAR_ERRORS });
    }
    if (userCartWishlistMessage) {
      toast.success(userCartWishlistMessage);
      dispatch({ type: CLEAR_MESSAGES });
    }
    if (userCartWishlistError) {
      toast.error(userCartWishlistError);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [
    dispatch,
    error,
    navigate,
    reviewMessage,
    reviewError,
    userCartWishlistMessage,
    userCartWishlistError,
  ]);

  useMemo(() => {
    dispatch(getProductAction(id));
  }, [dispatch, id]);

  return (
    product &&
    !loading && (
      <div className="product_container">
        <div className="wrapper">
          <Breadcrumbs />

          {/* product section */}
          <div className="product_section">
            {/* slider */}
            <div className="left">
              <ImageSlider images={product.images} />
            </div>

            {/* product info */}
            <div className="right">
              <div className="top">
                <h4>{product.brand}</h4>
                <h1>{product.title}</h1>

                <div>
                  <span>
                    <span>Gender: </span>
                    <span>{product.gender}</span>
                  </span>
                  |
                  <span>
                    <span></span>
                    <span>
                      {product.ratings} <FaStar /> / {product.numOfReviews}
                      Review
                    </span>
                  </span>{" "}
                  |
                  <span>
                    <span>Category:</span>
                    <span>{product.category}</span>
                  </span>
                </div>
              </div>

              {/* price */}
              <div className="price">
                <div className="top">
                  <span>₹{product.mrp}</span>
                  <span>₹{product.price}</span>
                  <span>{`(${product.discount}% OFF)`}</span>
                </div>
                <div className="bottom">inclusive of all taxes</div>
              </div>

              {/* colore */}
              <div className="colors">
                <h5>MORE COLORS</h5>

                {/* <div>
                  {images.map((item, index) => (
                    <img key={index} src={item.url} alt="image" />
                  ))}
                </div> */}
              </div>

              {/* sizes */}
              <div className="sizes">
                <h5>SELECT SIZE (UK Size)</h5>

                <div>
                  {product.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item.size)}
                      className={
                        parseInt(size) === parseInt(item.size) ? "active" : ""
                      }
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
              </div>

              <hr />

              {/* buttons */}
              <div className="add_buttons">
                <button onClick={handleCart}>
                  {user &&
                  user.cart &&
                  user.cart.find((item) => item.product === id) ? (
                    <>
                      <SlHandbag />
                      ALREADY IN CART
                    </>
                  ) : (
                    <>
                      <SlHandbag />
                      ADD TO BAG
                    </>
                  )}
                </button>
                <button onClick={handleWishlist}>
                  {user && user.wishlist && user.wishlist.includes(id) ? (
                    <>
                      <FaRegHeart />
                      ALREADY IN WISHLIST
                    </>
                  ) : (
                    <>
                      <FaRegHeart />
                      ADD TO WISHLIST
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* product section 02 */}
          <div className="overview_section">
            <div className="left">
              <h3>
                RATINGS <TbStars />
              </h3>

              <div className="ratings_range">
                <h5>
                  {product.ratings} <FaStar />
                </h5>
                <hr />
                <p>{product.numOfOrders} Verified Buyurs</p>
              </div>
            </div>
            <div className="right">
              <div>
                {homeData.features &&
                  homeData.features.map((item, i) => (
                    <div key={i}>
                      <span className="left">
                        {React.createElement(item.icon)}
                      </span>
                      <span className="right">{item.desc}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* product section 03 */}
          <div className="info_section">
            <div className="top">
              <span
                className={
                  toggleButton === "description" ? "active" : "unactive"
                }
                onClick={() => hangleToggle("description")}
              >
                DESCRIPTION
              </span>
              <span
                className={
                  toggleButton === "specifications" ? "active" : "unactive"
                }
                onClick={() => hangleToggle("specifications")}
              >
                SPECIFICATIONS
              </span>
              <span
                className={toggleButton === "reviews" ? "active" : "unactive"}
                onClick={() => hangleToggle("reviews")}
              >
                REVIEWS
              </span>
            </div>

            <hr />

            <div className="bottom">
              {toggleButton === "description" && (
                <div className="description fade">
                  <Markup content={product.description} />
                </div>
              )}

              {toggleButton === "specifications" && (
                <div className="specifications fade">
                  <table>
                    <tbody>
                      {product.features.map((item, index) => (
                        <tr key={index}>
                          <td>{item.key}</td>
                          <td>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {toggleButton === "reviews" && (
                <div className="reviews fade">
                  <div className="top">
                    <h4>
                      {product.numOfReviews} REVIEW FOR {[product.title]}
                    </h4>
                    <button onClick={() => handleVisibleAddComment("visible")}>
                      Add Review
                    </button>

                    <div className="forward_box_container" ref={addCommentRef}>
                      <div className="wrapper">
                        <div className="top">
                          <IoCloseSharp onClick={handleVisibleAddComment} />
                          <h3>Add Review</h3>
                          <p>
                            Enter your reviews and It will help other to choose
                            better products.
                          </p>
                        </div>
                        <form className="bottom" onSubmit={addCommentHandler}>
                          <div className="stars">
                            {[...Array(5)].map((_, index) => {
                              index += 1;

                              return (
                                <FaStar
                                  key={index}
                                  className={
                                    index <= (hover || rating)
                                      ? "active"
                                      : "inactive"
                                  }
                                  onClick={() => handleClick(index)}
                                  onMouseMove={() => handleMouseEnter(index)}
                                  onMouseLeave={() => handleMouseLeave()}
                                />
                              );
                            })}
                          </div>
                          <div className="input_single_container">
                            <label htmlFor="comment">
                              Enter your comment *
                            </label>
                            <textarea
                              type="text"
                              placeholder="Enter comment"
                              name="comment"
                              rows={5}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                            />
                          </div>
                          <button type="submit">ADD COMMENT</button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="bottom">
                    {product.reviews.slice(0, 12).map((item, index) => (
                      <ReviewCart key={index} review={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Product;
