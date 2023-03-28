// packages
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import meetbanner from "../../assets/고기배너.jpg"
import exambanner from "../../assets/시험배너.jpg"
import eggbanner from "../../assets/달걀배너.jpg"

// css
import "./css/Banner.css";

const Banner = () => {
  const navigate = useNavigate();
  const imagelist = [
    meetbanner,
    exambanner,
    eggbanner
  ];

  const imageCarousel = imagelist.map((image, idx) => {
    return (
      <SwiperSlide key={idx}>
        <img
          className="img-back"
          src={image}
          alt=""
          onClick={() => {
            navigate("/products/:productId");
          }}
        />
      </SwiperSlide>
    );
  });

  return (
    <div className="Main-Carousel">
      <Swiper
        grabCursor={true}
        className="mySwiper"
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {imageCarousel}
      </Swiper>
    </div>
  );
};

export default Banner;
