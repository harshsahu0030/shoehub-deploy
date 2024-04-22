import Products_Section01 from "../components/Products_Section01";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../app/actions/productAction";
import { RiMenuUnfoldLine } from "react-icons/ri";
import Loader from "../components/Loader";
import ProductCart from "../components/ProductCart";
import PaginationCom from "../components/Pagination";

const Products = () => {
  const navigate = useNavigate();
  const { gender: paramsGender, category: paramsCategory } = useParams();

  //redux
  const dispatch = useDispatch();
  const { products, resultPerPage, filteredProductsCount, loading, brands } =
    useSelector((state) => state.getProducts);

  //states
  const [gender, setGender] = useState("all");
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [color, setColor] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [colorSlice, setColorSlice] = useState(false);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([100, 50000]);
  const [ratings, setRatings] = useState([0, 5]);
  let limit = 10;

  //ref
  const showRef = useRef();
  const filterMenuVisible = useRef();

  //function
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRatings(e.target.value);
  };

  const handleReset = () => {
    navigate(`/products`);
  };

  const handlefilterMenuVisible = (text) => {
    if (text === "visible") {
      filterMenuVisible.current.style.opacity = 1;
      filterMenuVisible.current.style.visibility = "visible";
      filterMenuVisible.current.style.width = "100%";
    } else {
      filterMenuVisible.current.style.opacity = 0;
      filterMenuVisible.current.style.visibility = "hidden";
      filterMenuVisible.current.style.width = "0";
    }
  };

  const handleVisible = (text) => {
    if (text === "visible") {
      showRef.current.style.opacity = 1;
      showRef.current.style.visibility = "visible";
    } else {
      showRef.current.style.opacity = 0;
      showRef.current.style.visibility = "hidden";
    }
  };

  const handleCheckCategory = (cat) => {
    let newArr = [...category];
    if (category.includes(cat)) {
      newArr.splice(newArr.indexOf(cat), 1);
      setCategory(newArr);
    } else {
      setCategory((prev) => [...prev, cat]);
    }
  };

  const handleCheckBrand = (bnd) => {
    let newArr = [...brand];
    if (brand.includes(bnd)) {
      newArr.splice(newArr.indexOf(bnd), 1);
      setBrand(newArr);
    } else {
      setBrand((prev) => [...prev, bnd]);
    }
  };

  const handleCheckColor = (cat) => {
    if (color.includes(cat)) {
      let newArr = [...color];
      newArr.splice(newArr.indexOf(cat), 1);
      setColor(newArr);
    } else {
      setColor((prev) => [...prev, cat]);
    }
  };

  useEffect(() => {
    if (paramsGender) {
      setGender(paramsGender);
    } else {
      setGender("all");
    }

    if (paramsCategory) {
      let cat = paramsCategory.split(",");
      setCategory([...cat]);
    } else {
      setCategory([]);
    }
  }, [paramsGender, paramsCategory]);

  // useEffect
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    dispatch(
      getProductsAction(
        gender,
        category.join(","),
        brand.join(","),
        color.join(","),
        price,
        ratings,
        discount,
        page,
        limit
      )
    );
  }, [
    dispatch,
    gender,
    category,
    brand,
    color,
    price,
    ratings,
    discount,
    page,
    limit,
  ]);
  return (
    <div className="products_container">
      <div className="wrapper">
        <div className="left" ref={filterMenuVisible}>
          <Products_Section01
            gender={gender}
            setGender={setGender}
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            color={color}
            setColor={setColor}
            price={price}
            setPrice={setPrice}
            ratings={ratings}
            setRatings={setRatings}
            discount={discount}
            setDiscount={setDiscount}
            page={page}
            setPage={setPage}
            colorSlice={colorSlice}
            setColorSlice={setColorSlice}
            limit={limit}
            handleCheckColor={handleCheckColor}
            handleCheckBrand={handleCheckBrand}
            handleCheckCategory={handleCheckCategory}
            handleVisible={handleVisible}
            handleReset={handleReset}
            handleRatingChange={handleRatingChange}
            handlePriceChange={handlePriceChange}
            filterMenuVisible={filterMenuVisible}
            handlefilterMenuVisible={handlefilterMenuVisible}
            showRef={showRef}
            products={products}
            resultPerPage={resultPerPage}
            filteredProductsCount={filteredProductsCount}
            loading={loading}
            brands={brands}
          />
        </div>

        <div className="right">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="top">
                <span
                  className="filter"
                  onClick={() => handlefilterMenuVisible("visible")}
                >
                  F<RiMenuUnfoldLine />
                </span>
              </div>
              <div className="center">
                {products ? (
                  products.map((item, i) => (
                    <ProductCart key={i} product={item} />
                  ))
                ) : (
                  <Loader />
                )}
              </div>

              <div className="bottom">
                {products ? (
                  <PaginationCom
                    products={filteredProductsCount}
                    resultPerPage={resultPerPage}
                    setPage={setPage}
                    page={page}
                  />
                ) : (
                  <Loader />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
