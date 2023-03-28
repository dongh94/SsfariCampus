// packages
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// utils
import apiPath from "../../api/apiPath";
import { persistor } from "../../store";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
// css
import styles from "./css/LoginUserHeader.module.css";

const LoginUserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);
  const role = useSelector((state) => state.user.role);
  let userName = "";

  if (role === "USER") {
    userName = (
      <button
        onClick={() => {
          navigate("/mypage");
        }}
        className={styles.username}
      >
        {name}
      </button>
    );
  } else {
    userName = (
      <button
        onClick={() => {
          navigate("/orderManage");
        }}
        className={styles.username}
      >
        {name}
      </button>
    );
  }

  async function logout() {
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(apiPath.auth.logout(), {
      method: "POST",
    });
    // const data = await response.json();

    localStorage.removeItem("token");
    // persistor.pause();
    // persistor.flush().then(() => {
    //   return persistor.purge();
    // });
    persistor.purge();

    dispatch(authActions.logout());
    dispatch(userActions.logout());
    navigate("/");
  }

  const logoutHandler = (e) => {
    logout();
  };

  return (
    <div className={styles.Login_ul}>
      <ul>
        <li>{userName}</li>
        <li>
          <button onClick={logoutHandler} className={styles.Logout}>
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LoginUserHeader;
