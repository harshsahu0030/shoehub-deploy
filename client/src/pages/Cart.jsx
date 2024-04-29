import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartUserAction,
  removeCartAction,
  updateCartProductAction,
} from "../app/actions/userAction";
import Loader from "../components/Loader";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { CLEAR_ERRORS, CLEAR_MESSAGES } from "../app/constants/userConstant";

const Cart = () => {
  //redux
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.getCartProducts);
  const {
    loading: cardLoading,
    error,
    message,
  } = useSelector((state) => state.userCartWishlist);

  //states
  const [subTotal, setSubTotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [total, setTotal] = useState(0);

  //function
  const handleUpdateSize = async (id, value) => {
    await dispatch(
      updateCartProductAction({
        id,
        size: value,
      })
    );

    dispatch(getCartUserAction());
  };

  const handleUpdateQuantity = async (id, value) => {
    await dispatch(
      updateCartProductAction({
        id,
        quantity: value,
      })
    );
    dispatch(getCartUserAction());
  };

  const handleRemoveProductfromCart = async (id) => {
    await dispatch(removeCartAction(id));
    dispatch(getCartUserAction());
  };

  //useMemo
  useMemo(() => {
    if (error) {
      toast(error);
      dispatch({ type: CLEAR_ERRORS });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: CLEAR_MESSAGES });
    }
  }, [dispatch, error, message]);

  //userEffect
  useEffect(() => {
    dispatch(getCartUserAction());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setSubTotal(
        products
          .filter(
            (item) =>
              item.product.sizes.find((s) => s.size === item.size).stock >
              item.quantity
          )
          .map((item) => item.product.price * item.quantity)
          .reduce((acc, curr) => (acc += curr), 0)
      );
    }

    if (subTotal > 0) {
      setShippingCharges(150);
      setTotal(subTotal + shippingCharges);
    }
  }, [products, subTotal, shippingCharges]);
  return (
    <div className="cart_container">
      <div className="wrapper">
        <div className="left">
          {/* IN STOCK */}
          <h2>IN STOCK</h2>
          <table>
            <thead>
              <tr>
                <th>Img</th>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Qty.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader />
              ) : products ? (
                products.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <img src={item.product.images[0].url} alt="images" />
                    </td>
                    <td>
                      <span>{`${item.product.title.slice(0, 40)}...`}</span>
                    </td>
                    <td>
                      <span>
                        <select
                          className={cardLoading ? "disabled" : ""}
                          name="cart-size"
                          id="cart-size"
                          value={item.size}
                          onChange={(e) =>
                            handleUpdateSize(item._id, e.target.value)
                          }
                        >
                          {item.product.sizes &&
                            item.product.sizes.map((item, i) => (
                              <option
                                disabled={item.stock <= 0}
                                value={item.size}
                                key={i}
                              >
                                {item.size}UK
                              </option>
                            ))}
                        </select>
                      </span>
                    </td>
                    <td>
                      <span>₹{item.product.price}</span>
                    </td>

                    <td>
                      <span>
                        <FaMinus
                          className={
                            cardLoading || item.quantity <= 1 ? "disabled" : ""
                          }
                          onClick={() =>
                            handleUpdateQuantity(
                              item._id,
                              parseInt(item.quantity) - 1
                            )
                          }
                        />
                        {item.product.sizes.find((s) => s.size === item.size)
                          .stock > 0 ? (
                          item.quantity
                        ) : (
                          <span style={{ color: "red" }}>Out Of Stock</span>
                        )}
                        <IoMdAdd
                          className={
                            !cardLoading &&
                            item.product.sizes.find((s) => s.size === item.size)
                              .stock > item.quantity
                              ? ""
                              : "disabled"
                          }
                          onClick={() =>
                            handleUpdateQuantity(
                              item._id,
                              parseInt(item.quantity) + 1
                            )
                          }
                        />
                      </span>
                    </td>
                    <td>
                      <IoClose
                        onClick={() => {
                          handleRemoveProductfromCart(item._id);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                "No products available in your Cart"
              )}
            </tbody>
          </table>
        </div>
        <div className="right">
          <h3>CARD TOTALS</h3>
          <hr />
          <div>
            <h5>Subtotal</h5>
            <span>₹ {subTotal}</span>
          </div>
          <hr />
          <div>
            <h5>Shipping</h5>
            <span className="shipping_address">
              <span>₹ {shippingCharges}</span>
            </span>
          </div>
          <hr />
          <div>
            <h5>Total</h5>
            <span className="total_value">₹ {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
