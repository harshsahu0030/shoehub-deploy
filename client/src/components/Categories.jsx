import { IoIosMenu } from "react-icons/io";
import {
  IoChevronDownSharp,
  IoChevronUpSharp,
  IoCloseSharp,
} from "react-icons/io5";
import { categories } from "../data/category";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MdNewReleases } from "react-icons/md";
import { GiStarSwirl } from "react-icons/gi";
import { BiSolidDiscount } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { SlHandbag } from "react-icons/sl";
import { AiOutlineHeart } from "react-icons/ai";

const Categories = () => {
  const navigate = useNavigate();

  //states
  const [toggleDownButtom, setToggleDownButtom] = useState();

  const nav = useLocation();

  //functions
  const handleCategoryDown = () => {
    setToggleDownButtom((prev) => !prev);
  };

  //useEffect
  useEffect(() => {
    if (nav.pathname === "/") {
      setToggleDownButtom(false);
    } else {
      setToggleDownButtom(true);
    }
  }, [nav.pathname, setToggleDownButtom]);

  return (
    <div className="categories_container">
      <div className="wrapper">
        <div className="left">
          <div>
            <button onClick={handleCategoryDown}>
              {toggleDownButtom ? <IoIosMenu /> : <IoCloseSharp />}
              LOOK AT
              {toggleDownButtom ? <IoChevronDownSharp /> : <IoChevronUpSharp />}
              <span>ONE STOP SHOP</span>
            </button>
          </div>
          <ul
            className="dropdown"
            style={
              !toggleDownButtom
                ? {
                    opacity: 1,
                    visibility: "visible",
                  }
                : {
                    opacity: 0,
                    visibility: "hidden",
                  }
            }
          >
            {categories.map((cat, i) => (
              <li key={i} onClick={() => navigate(`/products/${cat.gender}`)}>
                {React.createElement(cat.icon)}
                {cat.gender}
              </li>
            ))}
            <hr />
            <li>
              <MdNewReleases />
              Newly Launched
            </li>
            <li>
              <GiStarSwirl />
              Trending
            </li>
            <li>
              <BiSolidDiscount />
              Best Sellers
            </li>
            <hr />
            <li onClick={() => navigate("/my-account")}>
              <AiOutlineUser />
              My Account
            </li>{" "}
            <li onClick={() => navigate("/cart")}>
              <SlHandbag />
              Cart
            </li>
            <li onClick={() => navigate("/wishlist")}>
              <AiOutlineHeart />
              Wishlist
            </li>
          </ul>
        </div>
        <div className="right">
          <ul>
            <li>
              <span>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Home
                </NavLink>
              </span>
            </li>

            {categories &&
              categories.map((cat, i) => (
                <li key={i}>
                  <span
                    onDoubleClick={() => navigate(`/products/${cat.gender}`)}
                  >
                    {cat.gender}
                    <IoChevronDownSharp />
                  </span>
                  <ul className="dropdown">
                    {cat.types.sort().map((item, i) => (
                      <li
                        key={i}
                        onClick={() =>
                          navigate(`/products/${cat.gender}/${item}`)
                        }
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}

            <li>
              <span>
                <NavLink
                  to="/blog"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Blog
                </NavLink>
              </span>
            </li>
            <li>
              <span>
                <NavLink
                  to="/contact"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Contact
                </NavLink>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
