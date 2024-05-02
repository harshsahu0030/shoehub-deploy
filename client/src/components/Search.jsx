import { useMemo, useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProductsAction } from "../app/actions/productAction";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDebounce } from "../hooks/debounce";

const Search = () => {
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();

  //state
  const [search, setSearch] = useState("");
  const { products } = useSelector((state) => state.getSearchProducts);

  //hook
  const debouncedSearch = useDebounce(search);

  //ref
  const dropDownRef = useRef();

  //function
  const handleShowDropdown = () => {
    dropDownRef.current.style.opacity = 1;
    dropDownRef.current.style.visibility = "visible";
    dropDownRef.current.style.height = "auto";
  };

  const handlehiddenDropdown = () => {
    dropDownRef.current.style.opacity = 0;
    dropDownRef.current.style.visibility = "hidden";
    dropDownRef.current.style.height = "0";
  };

  //useEffect
  useMemo(() => {
    dispatch(getSearchProductsAction(debouncedSearch));
  }, [dispatch, debouncedSearch]);

  return (
    <div className="search_container" onMouseLeave={handlehiddenDropdown}>
      <div className="search_box">
        <input
          type="search"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onMouseEnter={handleShowDropdown}
        />
        <RiSearch2Line />
      </div>

      <div className="drop_down" ref={dropDownRef}>
        <ul>
          {products && products.length > 0
            ? products.slice(0, 10).map((item, i) => (
                <li key={i}>
                  <div className="left">
                    <LazyLoadImage src={item.images[0].url} alt="" />
                  </div>
                  <div
                    className="right"
                    onClick={() => {
                      navigate(
                        `/products/${item.gender}/${item.category}/${item._id}`
                      );

                      handlehiddenDropdown();
                    }}
                  >
                    <span>{item.title}</span>
                    <div>
                      <span>{item.brand}</span>|<span>{item.category}</span>|
                      <span>{item.gender}</span>
                    </div>
                  </div>
                </li>
              ))
            : "No Product Found"}
        </ul>
      </div>
    </div>
  );
};

export default Search;
