import Products_Section01 from "../components/Products_Section01";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../app/actions/productAction";
import { RiMenuUnfoldLine } from "react-icons/ri";
import Loader from "../components/Loader";
import ProductCart from "../components/ProductCart";
import PaginationCom from "../components/Pagination";

const Products = () => {
  const navigate = useNavigate();
  const { gender: paramsGender, category: paramsCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

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
    setCategory([]);
    setBrand([]);
    setDiscount(0);
    setColor([]);
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
    if (category.includes(cat)) {
      let newArr = [...category];
      newArr.splice(newArr.indexOf(cat), 1);
      setCategory(newArr);
      setBrand([]);
    } else {
      let newArr = [...category, cat];
      setCategory(newArr);
      setBrand([]);
    }
  };

  const handleCheckBrand = (bnd) => {
    if (brand.includes(bnd)) {
      let newArr = [...brand];
      newArr.splice(newArr.indexOf(bnd), 1);
      setBrand(newArr);
    } else {
      let newArr = [...brand, bnd];
      setBrand(newArr);
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

  //use Memo
  useMemo(() => {
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

    if (searchParams.get("cat")) {
      setCategory(searchParams.get("cat").split("%3"));
    }

    if (searchParams.get("bnd")) {
      setBrand(searchParams.get("bnd").split("%3"));
    }

    if (searchParams.get("clr")) {
      setColor(searchParams.get("clr").split("%3"));
    }

    if (searchParams.get("dis")) {
      setDiscount(searchParams.get("dis"));
    }

    if (searchParams.get("p")) {
      setPage(searchParams.get("p"));
    }
  }, [paramsGender, paramsCategory, searchParams]);

  useEffect(() => {
    setSearchParams({
      cat: category.join("%3"),
      bnd: brand.join("%3"),
      clr: color.join("%3"),
      ph: price[0],
      pl: price[1],
      rh: ratings[0],
      rl: ratings[1],
      dis: discount,
      p: page,
    });
  }, [setSearchParams, category, brand, color, discount, page, price, ratings]);

  // useEffect
  useMemo(() => {
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
            discount={parseInt(discount)}
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
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            paramsCategory={paramsCategory}
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
                    page={parseInt(page)}
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
