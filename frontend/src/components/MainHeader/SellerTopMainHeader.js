// packages
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// components
import UserHeader from "./UserHeader.js";
import LoginUserHeader from "./LoginUserHeader.js";
// css
import styles from "./css/TopMainHeader.module.css";
// assets
import { ReactComponent as Reservation } from "../../assets/Logo_company.svg";

const SellerTopMainHeader = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userHeader = isAuth ? <LoginUserHeader /> : <UserHeader />;

  return (
    <div className={styles.justify_between}>
      <div className={styles.Logo}>
        <NavLink to="/orderManage">
          <Reservation width="18rem" height="6rem" />
        </NavLink>
      </div>
      {userHeader}
    </div>
  );
};

export default SellerTopMainHeader;
