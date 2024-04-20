import { useEffect, useRef, useState } from "react";
import { categories, colorPallets, products_discount } from "../data/category";
import ProductCart from "./ProductCart";
import { IoCloseSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../app/actions/productAction";
import Slider from "@mui/material/Slider";
import PaginationCom from "./Pagination";
import Loader from "./Loader";
import { IoClose } from "react-icons/io5";
import { RiMenuUnfoldLine } from "react-icons/ri";

const Products_Section01 = () => {
  const navigate = useNavigate();
  const { gender: paramsGender, category: paramsCatgeory } = useParams();

  //redux
  const dispatch = useDispatch();
  const { products, resultPerPage, filteredProductsCount, loading } =
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

  // useEffect
  useEffect(() => {
    if (paramsGender !== undefined) {
      setGender(paramsGender);
    }
    if (paramsCatgeory !== undefined) {
      let cat = paramsCatgeory.split(",");
      setCategory([...cat]);
    }
  }, [paramsGender, paramsCatgeory]);

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
    <div className="products_section01_container">
      <div className="left" ref={filterMenuVisible}>
        <IoClose onClick={() => handlefilterMenuVisible()} />
        <h3>
          FILTERS{" "}
          <span>
            ({filteredProductsCount && filteredProductsCount} Products)
          </span>
        </h3>
        <hr />
        <div>
          <ul>
            {categories &&
              categories.map((item, i) => (
                <li key={i}>
                  <div className="input_radio_container">
                    <input
                      type="radio"
                      name="gender"
                      onChange={() => {
                        setGender(item.gender);
                        setCategory([]);
                        navigate(`/products/${item.gender}`);
                      }}
                      checked={gender === item.gender}
                    />
                    <label htmlFor="">{item.gender}</label>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <hr />

        <div>
          <h4>CATEGORIES</h4>
          <ul>
            {categories
              .find((item) => item.gender === gender)
              .types.slice(0, 10)
              .map((item, i) => (
                <li key={i}>
                  <div className="input_checkbox_container">
                    <input
                      type="checkbox"
                      value={item}
                      checked={category.includes(item)}
                      onChange={() => handleCheckCategory(item)}
                    />
                    <label htmlFor="">{item}</label>
                  </div>
                </li>
              ))}
          </ul>
          <span onClick={() => handleVisible("visible")}>+ More</span>

          <div className="show_box_container" ref={showRef}>
            <h4>
              Categories
              <IoCloseSharp onClick={handleVisible} />
            </h4>
            <hr />

            <ul className="items">
              {categories
                .find((item) => item.gender === gender)
                .types.map((item, i) => (
                  <li key={i}>
                    <div className="input_checkbox_container">
                      <input
                        type="checkbox"
                        value={item}
                        checked={category.includes(item)}
                        onChange={() => handleCheckCategory(item)}
                      />
                      <label htmlFor="">{item}</label>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <hr />

        <div>
          <h4>BRAND</h4>
          <ul>
            {[...new Set(products && products.map((o) => o.brand))].map(
              (item, i) => (
                <li key={i}>
                  <div className="input_checkbox_container">
                    <input
                      type="checkbox"
                      value={item}
                      checked={brand.includes(item)}
                      onChange={() => handleCheckBrand(item)}
                    />
                    <label htmlFor="">{item}</label>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        <hr />

        <div>
          <h4>PRICE</h4>
          <Slider
            value={price}
            onChange={handlePriceChange}
            aria-labelledby="range-slider"
            min={100}
            max={50000}
            c
            valueLabelDisplay="off"
          />

          <div className="range">
            <span>
              <span>Min:</span>
              <span>₹{price[0]}</span>
            </span>
            <span>
              <span>Max:</span>
              <span>₹{price[1]}</span>
            </span>
          </div>
        </div>

        <hr />

        <div>
          <h4>RATINGS</h4>
          <Slider
            value={ratings}
            onChange={handleRatingChange}
            aria-labelledby="range-slider"
            min={0}
            max={5}
            valueLabelDisplay="off"
          />

          <div className="range">
            <span>
              <span>Min:</span>
              <span>{ratings[0]}</span>
            </span>
            <span>
              <span>Max:</span>
              <span>{ratings[1]}</span>
            </span>
          </div>
        </div>

        <hr />

        <div>
          <h4>COLORS</h4>
          <ul>
            {colorPallets
              .slice(0, !colorSlice ? 10 : colorPallets.length)
              .map((item, i) => (
                <li key={i}>
                  <div className="input_checkbox_container">
                    <input
                      type="checkbox"
                      value={item.name}
                      name="color"
                      onChange={() => {
                        handleCheckColor(item.name);
                      }}
                    />
                    <FaCircle
                      style={{
                        color: `rgb(${item.color.R},${item.color.G},${item.color.B})`,
                      }}
                    />
                    <label htmlFor="">{item.name}</label>
                  </div>
                </li>
              ))}
          </ul>
          <span onClick={() => setColorSlice(!colorSlice)}>
            {colorSlice ? "- Show Less" : "+ Show More"}
          </span>
        </div>
        <hr />

        <div>
          <h4>DISCOUNT</h4>
          <ul>
            {products_discount &&
              products_discount.map((item, i) => (
                <li key={i}>
                  <div className="input_checkbox_container">
                    <input
                      type="radio"
                      name="discount"
                      onChange={() => setDiscount(item.value)}
                      checked={discount === item.value}
                    />
                    <label htmlFor="">{item.name}</label>
                  </div>
                </li>
              ))}
          </ul>
        </div>
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
              {products &&
                products.map((item, i) => (
                  <ProductCart key={i} product={item} />
                ))}
            </div>

            <div className="bottom">
              {products && (
                <PaginationCom
                  products={filteredProductsCount}
                  resultPerPage={resultPerPage}
                  setPage={setPage}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products_Section01;
