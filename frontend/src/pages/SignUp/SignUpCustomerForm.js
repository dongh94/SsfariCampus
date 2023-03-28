// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import apiPath from "../../api/apiPath";
// css
import "./css/SignUpForm.css";
import MPBtn from "../../components/ui/MPBtn";

const CustomerForm = () => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // const [isValidLoginId, setIsValidLoginId] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(null);
  // const [isValidName, setIsValidName] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPhone, setIsValidPhone] = useState(null);

  async function signUp(loginId, password, name, email, phone) {
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(apiPath.user.customer(), {
      method: "POST",
      body: JSON.stringify({
        loginId: loginId,
        password: password,
        name: name,
        email: email,
        phone: phone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await response.json();
    navigate("/login");
  }

  const signUpHandler = (e) => {
    e.preventDefault();

    if (
      !(
        isValidEmail === null &&
        isValidPassword === null &&
        isValidPasswordCheck === null &&
        isValidPhone === null
      )
    ) {
      alert("입력한 내용을 다시 확인해주세요");
      return;
    }

    signUp(loginId, password, name, email, phone);
    setLoginId("");
    setPassword("");
    setPasswordCheck("");
    setName("");
    setEmail("");
    setPhone("");
    navigate("/login");
  };

  const checkPassword = (e) => {
    const pattern1 = /[0-9]/;
    const pattern2 = /[a-zA-Z]/;
    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;
    if (e.target.value.length === 0) {
      setIsValidPassword(null);
    } else if (
      !pattern1.test(e.target.value) ||
      !pattern2.test(e.target.value) ||
      !pattern3.test(e.target.value) ||
      e.target.value.length < 8
    ) {
      setIsValidPassword(
        <div className="inputvalid">
          <p>비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성되어야 합니다</p>
        </div>
      );
    } else {
      setIsValidPassword(null);
    }
    if (passwordCheck.length === 0) {
      setIsValidPasswordCheck(null);
    } else if (e.target.value !== passwordCheck) {
      setIsValidPasswordCheck(
        <div className="inputvalid">
          <p>비밀번호와 일치하지 않습니다</p>
        </div>
      );
    } else {
      setIsValidPasswordCheck(null);
    }
  };

  const checkPasswordCheck = (e) => {
    if (e.target.value.length === 0) {
      setIsValidPasswordCheck(null);
    } else if (e.target.value !== password) {
      setIsValidPasswordCheck(
        <div className="inputvalid">
          <p>비밀번호와 일치하지 않습니다</p>
        </div>
      );
    } else {
      setIsValidPasswordCheck(null);
    }
  };

  const checkPhone = (e) => {
    const pattern = /^[0-9]+$/g;
    if (e.target.value.length === 0) {
      setIsValidPhone(null);
    } else if (!pattern.test(e.target.value)) {
      setIsValidPhone(
        <div className="inputvalid">
          <p>숫자만 입력해 주세요</p>
        </div>
      );
    } else if (
      e.target.value.length !== 11 ||
      e.target.value.substring(0, 3) !== "010"
    ) {
      setIsValidPhone(
        <div className="inputvalid">
          <p>올바른 전화번호를 입력해주세요</p>
        </div>
      );
    } else {
      setIsValidPhone(null);
    }
  };

  const checkEmail = (e) => {
    if (e.target.value.length === 0) {
      setIsValidEmail(null);
    }
    // eslint-disable-next-line no-useless-escape
    else if (!e.target.value.match(/[\w\-\.]+\@[\w\-\.]+\.+/g)) {
      setIsValidEmail(
        <div className="inputvalid">
          <p>올바른 이메일을 입력해주세요</p>
        </div>
      );
    } else {
      setIsValidEmail(null);
    }
  };

  const loginIdChangeHandler = (e) => {
    setLoginId(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    checkPassword(e);
  };
  const passwordCheckChangeHandler = (e) => {
    setPasswordCheck(e.target.value);
    checkPasswordCheck(e);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    checkEmail(e);
  };
  const phoneChangeHandler = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
    setPhone(e.target.value);
    checkPhone(e);
  };

  return (
    <div>
      <form onSubmit={signUpHandler}>
        <div className="inputgroup">
          <label>아이디</label>
          <input
            type="text"
            value={loginId}
            onChange={loginIdChangeHandler}
            placeholder="아이디를 입력해주세요"
          />
          <br />
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            placeholder="비밀번호를 입력해주세요"
          />
          {isValidPassword}
          <br />
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={passwordCheck}
            onChange={passwordCheckChangeHandler}
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
          {isValidPasswordCheck}
          <br />
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={nameChangeHandler}
            placeholder="이름을 입력해주세요"
          />
          <br />
          <label>학교 이메일</label>
          <input
            type="email"
            value={email}
            onChange={emailChangeHandler}
            placeholder="학교 이메일을 입력해주세요"
          />
          {isValidEmail}
          <br />
          <label>전화번호</label>
          <input
            value={phone}
            type="text"
            onChange={phoneChangeHandler}
            maxLength="11"
            placeholder="숫자만 입력해주세요"
          />

          {isValidPhone}
          <br />
        </div>

        <MPBtn type="submit" onClick={signUpHandler}>
          가입하기
        </MPBtn>
      </form>
    </div>
  );
};

export default CustomerForm;
