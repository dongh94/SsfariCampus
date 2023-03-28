// packages
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// utils
import useEth from "../../contexts/EthContext/useEth";
// components
import Banner from "./Banner.js";
import ProductCarousel from "./ProductCarousel.js";
import Loading from "../../components/ui/Loading.js";
// css
import styles from "./css/MainHeader.module.css";

const MainPage = () => {
  const { state } = useEth();
  const navigate = useNavigate();
  const [TimeCheck, setTimeCheck] = useState(true);

  let MainCompo = <></>;

  if (state.account) {
    MainCompo = (
      <>
        <Banner />
        <ProductCarousel />
      </>
    );
  } else {
    if (TimeCheck === true) {
      setTimeout(() => {
        setTimeCheck(false);
      }, 1000);
      MainCompo = (
        <div className={styles.loading_center}>
          <Loading />
        </div>
      );
    } else {
      alert("MyPage에서 지갑을 연결하세요");
      // cogoToast.success('지갑을 연결하세요');
      navigate("/mypage");
    }
  }

  return <div>{MainCompo}</div>;
};

export default MainPage;
