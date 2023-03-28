// packages
import "swiper/css";
import "swiper/css/navigation";
import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// components
import WalletCarouselItem from "./WalletCarouselItem";
// css
import styles from "./css/WalletCarousel.module.css";

const WalletCarousel = () => {
  return (
    <div className={styles.div_size}>
      <Swiper
        grabCursor={true}
        className="mySwiper"
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
      >
        <SwiperSlide>
          <WalletCarouselItem title="ETH" />
        </SwiperSlide>
        <SwiperSlide>
          <WalletCarouselItem title="CASH" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default WalletCarousel;
