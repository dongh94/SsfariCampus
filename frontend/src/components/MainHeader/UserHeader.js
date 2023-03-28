// packages
import { NavLink } from "react-router-dom";
// css
import styles from "./css/UserHeader.module.css";

const UserHeader = () => {
  return (
    <ul className={styles.loginUl}>
      <li className={styles.loginname}>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signup">SignUp</NavLink>
      </li>
    </ul>
  );
};

export default UserHeader;
