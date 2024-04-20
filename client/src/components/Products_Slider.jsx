// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import propTypes from "prop-types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductCart from "./ProductCart";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const Products_Slider = ({ products }) => {
  //state
  const [inWidth, setInWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="products_slider_container">
      <Swiper
        slidesPerView={inWidth && inWidth > 1024 ? 4 : inWidth > 800 ? 3 : 2}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {!products ? (
          <Loader />
        ) : (
          products.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductCart product={item} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

Products_Slider.propTypes = {
  products: propTypes.array,
};

export default Products_Slider;
