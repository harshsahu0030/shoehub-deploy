import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../components/Breadcrumbs";
import WishlistProductCart from "../components/WishlistProductCart";
import { useEffect } from "react";
import {
  getWishlistUserAction,
  loadUserAction,
} from "../app/actions/userAction";

const Wishlist = () => {
  //redux
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.getWishlistProducts);

  //useEffect
  useEffect(() => {
    dispatch(loadUserAction());
    dispatch(getWishlistUserAction());
  }, [dispatch]);

  return (
    <div className="wishlist_container">
      <div className="wrapper">
        <Breadcrumbs />
        <h1>MY WISHLIST -- {products && products.length} ITEMS</h1>

        <div className="wishlist_products">
          {products && products.length > 0 ? (
            products.map((item, i) => (
              <WishlistProductCart key={i} product={item} />
            ))
          ) : (
            <h3>No Products in your Wishlist</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
