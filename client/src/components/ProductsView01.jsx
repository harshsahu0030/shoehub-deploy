import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductsView01 = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="products_view_container">
      <div className="left">
        <img src={product.images[0].url} alt="img" />
      </div>
      <div className="right">
        <div className="heading">
          <h5>{product.brand}</h5>
          <h4
            onClick={() =>
              navigate(
                `/products/${product.gender}/${product.category}/${product._id}`
              )
            }
          >
            {product.title}
          </h4>
        </div>
        <div className="price">
          <span>₹{product.mrp}</span>
          <span>₹{product.price}</span>
        </div>
      </div>
    </div>
  );
};

ProductsView01.propTypes = {
  product: propTypes.object,
};

export default ProductsView01;
