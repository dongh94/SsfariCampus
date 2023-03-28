// css
import styles from "./MainFooter.module.css";
import { useSelector } from "react-redux";
const MainFooter = () => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);

  if (isLogin) {
    return (
      <footer className={styles.footer}>
        <p>Copyright 2022. Rotiple All pictures can not be copied without permission</p>
      </footer>
    );
  } else {
    if (window.location.pathname === "/") return null;
  }
};

export default MainFooter;
