// packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";
// utils
import apiPath from "../../api/apiPath";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
// css
import "./css/LoginForm.css";
import LPBtn from "../../components/ui/LPBtn";
import LWBtnPBrd from "../../components/ui/LWBtnPBrd";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  if (isAuth) {
    navigate("/main");
  }

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    login(loginId, password);
  };
  const loginIdChangeHandler = (e) => {
    setLoginId(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    return () => {
      if (localStorage.getItem("token")) {
        dispatch(authActions.login());
      }
    };
  });

  async function login(loginId, password) {
    const response = await fetch(apiPath.auth.login(), {
      method: "POST",
      body: JSON.stringify({
        loginId: loginId,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const { statusCode, accessToken } = data;

    if (statusCode === 200) {
      localStorage.setItem("token", accessToken);
      dispatch(userActions.login(data.user));
      if (data.user.role === "USER") {
        navigate("/main");
      } else {
        navigate("/orderManage");
      }
    } else {
      cogoToast.error("로그인 실패");
    }
  }

  return (
    <div className="Login_inputgroup">
      <form onSubmit={loginHandler}>
        <input
          placeholder="아이디를 입력해주세요"
          type="text"
          value={loginId}
          onChange={loginIdChangeHandler}
        />
        <br />
        <input
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <br />
        <br />
        <LPBtn type="submit" onClick={loginHandler}>
          로그인
        </LPBtn>
      </form>
      <LWBtnPBrd
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </LWBtnPBrd>
    </div>
  );
};

export default LoginForm;
