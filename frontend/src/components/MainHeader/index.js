// packages
import { useSelector } from "react-redux";
// components
import TopMainHeader from "./TopMainHeader.js";
import BottomMainHeader from "./BottomMainHeader";
import SellerTopMainHeader from "./SellerTopMainHeader.js";
import SellerBottomMainHeader from "./SellerBottomMainHeader";
// css
import styles from "./css/MainHeader.module.css";

const MainHeader = () => {
  const role = useSelector((state) => state.user.role);
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const TopHeader = role === "COMPANY" ? <SellerTopMainHeader /> : <TopMainHeader />;
  const BottomHeader = role === "COMPANY" ? <SellerBottomMainHeader /> : <BottomMainHeader />;
  const HeaderSize = role === "COMPANY" ? styles.HeaderCompany : styles.header;
  // 그니까 지금 우리 로그인한 상태에서 /이게나오면 안없애야 되는데 없어진다.
  // 그러면 로그인한 상태를먼저 체크하고 /를 체크하면 되잖아
  if (isLogin) {
    return (
      <header className={HeaderSize}>
        <nav>
          {TopHeader}
          {BottomHeader}
        </nav>
        <hr />
      </header>
    );
  } else {
    if (window.location.pathname === "/") return null;
  }
};

export default MainHeader;
