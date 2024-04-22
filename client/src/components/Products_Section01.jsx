import { categories, colorPallets, products_discount } from "../data/category";
import { FaCircle } from "react-icons/fa";
import propTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { IoCloseSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Products_Section01 = ({
  gender,
  setGender,
  category,
  setCategory,
  brand,
  price,
  ratings,
  discount,
  setDiscount,
  colorSlice,
  setColorSlice,
  handleCheckColor,
  handleCheckBrand,
  handleCheckCategory,
  handleVisible,
  handleReset,
  handleRatingChange,
  handlePriceChange,
  showRef,
  handlefilterMenuVisible,
  products,
  filteredProductsCount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="products_section01_container">
      <IoClose onClick={() => handlefilterMenuVisible()} />
      <h3>
        FILTERS{" "}
        <span>({filteredProductsCount && filteredProductsCount} Products)</span>
      </h3>
      <button onClick={handleReset}>RESET ALL</button>
      <hr />
      <div>
        <ul>
          {categories &&
            categories.map((item, i) => (
              <li key={i}>
                <div className="input_radio_container">
                  <input
                    type="radio"
                    onChange={() => {
                      setGender(item.gender);
                      setCategory([]);
                      navigate(`/products/${item.gender}`);
                    }}
                    checked={gender === item.gender}
                  />
                  <label htmlFor={item.gender}>{item.gender}</label>
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
                  <label htmlFor={item}>{item}</label>
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
                    <label htmlFor={item}>{item}</label>
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
                  <label htmlFor={item}>{item}</label>
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
                    onChange={() => {
                      handleCheckColor(item.name);
                    }}
                  />
                  <FaCircle
                    style={{
                      color: `rgb(${item.color.R},${item.color.G},${item.color.B})`,
                    }}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
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
                    onChange={() => setDiscount(item.value)}
                    checked={discount === item.value}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

Products_Section01.propTypes = {
  gender: propTypes.string,
  setGender: propTypes.func,
  category: propTypes.array,
  setCategory: propTypes.func,
  brand: propTypes.array,
  price: propTypes.array,
  ratings: propTypes.array,
  discount: propTypes.number,
  setDiscount: propTypes.func,
  colorSlice: propTypes.bool,
  setColorSlice: propTypes.func,
  handleCheckColor: propTypes.func,
  handleCheckBrand: propTypes.func,
  handleCheckCategory: propTypes.func,
  handleVisible: propTypes.func,
  handleReset: propTypes.func,
  handleRatingChange: propTypes.func,
  handlePriceChange: propTypes.func,
  showRef: propTypes.object,
  handlefilterMenuVisible: propTypes.func,
  products: propTypes.array,
  filteredProductsCount: propTypes.number,
};

export default Products_Section01;
