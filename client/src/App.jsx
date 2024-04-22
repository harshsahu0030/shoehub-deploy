import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import MyAccount from "./pages/MyAccount";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserAction } from "./app/actions/userAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerification from "./pages/OtpVerification";
import SearchPage from "./pages/SearchPage";

const App = () => {
  //redux
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header>
        <Header />
      </header>
      <nav>
        <Navbar />
      </nav>
      <section className="categories_section">
        <Categories />
      </section>
      <section className="routes_section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/my-account/:pathname" element={<MyAccount />} />

          <Route
            path="/register-verification/:id"
            element={<OtpVerification />}
          />
          <Route path="/products" element={<Products />} />

          <Route path="/products/:gender" element={<Products />} />

          <Route path="/products/:category" element={<Products />} />

          <Route path="/products/:gender/:category" element={<Products />} />

          <Route path="/products/:gender/:category/:id" element={<Product />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </section>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
};

export default App;
