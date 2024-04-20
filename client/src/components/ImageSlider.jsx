import { useState } from "react";

import propTypes from "prop-types";

const ImageSlider = ({ images }) => {
  //state
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="image_slider_container">
      <div className="left">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="img"
            className={currentIndex === index ? "active_img" : ""}
            onMouseEnter={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <div className="right">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="img"
            className={currentIndex === index ? "img_show" : ""}
          />
        ))}
      </div>
    </div>
  );
};

ImageSlider.propTypes = {
  images: propTypes.array,
};

export default ImageSlider;
