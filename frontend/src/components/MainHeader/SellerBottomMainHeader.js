// packages
import { NavLink } from "react-router-dom";
// css
import styles from "./css/BottomMainHeader.module.css";

const SellerBottomMainHeader = () => {
  return (
    <div className={styles.justify_center_seller}>
      <ul>
        <li>
          <NavLink to="/orderManage">주문 관리</NavLink>
        </li>
        <li>
          <NavLink to="/productManage">상품 관리</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SellerBottomMainHeader;
