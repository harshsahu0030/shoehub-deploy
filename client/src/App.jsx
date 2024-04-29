import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserAction } from "./app/actions/userAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerification from "./pages/OtpVerification";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

//user routes
const Home = lazy(() => import("./pages/Home"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const App = () => {
  //redux
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
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

            <Route
              path="/products/:gender/:category/:id"
              element={<Product />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </section>
        <footer>
          <Footer />
        </footer>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
