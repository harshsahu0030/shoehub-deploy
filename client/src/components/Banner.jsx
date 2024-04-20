import { Swiper, SwiperSlide } from "swiper/react";

//import banner images
import Banner01 from "../assets/banner01.png";
import Banner02 from "../assets/banner02.png";
import Banner03 from "../assets/banner03.png";
import Banner04 from "../assets/banner04.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <div className="banner_container">
      <div className="left"></div>
      <div className="right">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={Banner04} alt="Banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner02} alt="Banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner03} alt="Banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner01} alt="Banner" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
