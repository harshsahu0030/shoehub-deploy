import Section_heading from "./Section_heading";
import Products_Slider from "./Products_Slider";
import ProductsView01 from "./ProductsView01";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { homeData } from "../data/home";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBestSellerProductsAction,
  getTopRatedProductsAction,
  getTrendingProductsAction,
} from "../app/actions/productAction";
import Loader from "./Loader";

const Home_Section01 = () => {
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch();
  const { products: trendingProducts } = useSelector(
    (state) => state.getTrendingProducts
  );
  const { products: topRatedProducts } = useSelector(
    (state) => state.getTopRatedProducts
  );
  const { products: bestSellerProducts } = useSelector(
    (state) => state.getBestSellerProducts
  );

  useMemo(() => {
    dispatch(getTrendingProductsAction());
    dispatch(getTopRatedProductsAction());
    dispatch(getBestSellerProductsAction());
  }, [dispatch]);
  return (
    <div
      className="home_section01_container
  "
    >
      <div className="left">
        <div className="vertical_banners">
          {homeData.banner.vertical &&
            homeData.banner.vertical.map((item, i) => (
              <img
                key={i}
                src={item.img}
                alt="banner"
                onClick={() => navigate(item.url, { state: item.state })}
              />
            ))}
        </div>

        <div className="features">
          {homeData.features &&
            homeData.features.map((item, i) => (
              <div key={i}>
                <span className="left">{React.createElement(item.icon)}</span>
                <span className="right">{item.desc}</span>
              </div>
            ))}
        </div>

        <div className="trending_products">
          <h4>
            TRENDING PRODUCTS
            <Link to={"#"}>
              View All <IoIosArrowRoundForward />
            </Link>
          </h4>

          {!trendingProducts ? (
            <Loader />
          ) : (
            trendingProducts
              .slice(0, 6)
              .map((item, i) => <ProductsView01 key={i} product={item} />)
          )}
        </div>
      </div>

      <div className="right">
        <Section_heading
          heading={"BEST SELLERS"}
          highlighted={""}
          description={"Do not miss the current offers until the end of April."}
          url={"#"}
        />

        <Products_Slider products={bestSellerProducts} />

        <img
          className="long_banner"
          src={homeData.banner.horizontal[0]}
          alt="banner"
        />

        <Section_heading
          heading={"HOT PRODUCT FOR"}
          highlighted={"THIS WEEK"}
          description={
            "Dont miss this opportunity at a special discount just for this week."
          }
          url={"#"}
        />

        <Products_Slider products={trendingProducts} />

        <div className="split_banners">
          <img src={homeData.banner.small[0]} alt="banner" />
          <img src={homeData.banner.small[1]} alt="banner" />
        </div>

        <Section_heading
          heading={"TOP RATED"}
          highlighted={""}
          description={"New products with updated stocks."}
          url={"#"}
        />

        <Products_Slider products={topRatedProducts} />

        <div className="split_banners">
          <img src={homeData.banner.small[2]} alt="banner" />
          <img src={homeData.banner.small[3]} alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default Home_Section01;
