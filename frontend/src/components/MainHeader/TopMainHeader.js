// packages
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
// components
import UserHeader from "./UserHeader.js";
import LoginUserHeader from "./LoginUserHeader.js";
// css
import styles from "./css/TopMainHeader.module.css";
// assets
import { ReactComponent as Reservation } from "../../assets/Logo.svg";

const TopMainHeader = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userHeader = isAuth ? <LoginUserHeader /> : <UserHeader />;
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const keywordChangeHandler = (e) => {
    setKeyword(e.target.value);
  };

  const search = () => {
    if (keyword.length > 0) {
      navigate("/main/search/" + keyword);
      setKeyword("");
    }
  };

  return (
    <div className={styles.justify_between}>
      <div className={styles.Logo}>
        <NavLink to="/main">
          <Reservation width="18rem" height="6rem" />
        </NavLink>
      </div>
      <div className={styles.inputPosition}>
        <input type="text" placeholder="검색어를 입력하세요." value={keyword} className={styles.Search_input} onKeyUp={onKeyUp} onChange={keywordChangeHandler} autoFocus />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styles.inputglass} onClick={search}>
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
        </svg>
      </div>
      {userHeader}
    </div>
  );
};

export default TopMainHeader;
