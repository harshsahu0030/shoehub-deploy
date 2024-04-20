import { FaStar } from "react-icons/fa";
import propTypes from "prop-types";

const ReviewCart = ({ review }) => {
  return (
    <div className="review_cart_container">
      <span>
        {review.rating} <FaStar />
      </span>
      <p>{review.comment}</p>
      <p>By :- {review.name} </p>
    </div>
  );
};

ReviewCart.propTypes = {
  review: propTypes.object,
};

export default ReviewCart;
