// packages
import { useSelector } from "react-redux";
import React, { useState } from "react";
import cogoToast from "cogo-toast";
// utils
import apiPath from "../../api/apiPath";
// css
import "./css/ModalPassword.css";

const ModalBasic = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const { loginId, email, phone } = useSelector((state) => state.user);
  const [changePassword, setChangePassword] = useState("");
  const [nowPassword, setNowPassword] = useState("");

  const changePasswordHandler = (e) => {
    setChangePassword(e.target.value);
  };
  const nowPasswordHandler = (e) => {
    setNowPassword(e.target.value);
  };

  async function passwordChange() {
    const pattern1 = /[0-9]/;
    const pattern2 = /[a-zA-Z]/;
    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;
    if (!pattern1.test(changePassword) || !pattern2.test(changePassword) || !pattern3.test(changePassword) || changePassword.length < 8) {
      cogoToast.error("비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성되어야 합니다");
      return;
    }
    const response = await fetch(apiPath.user.update(), {
      method: "PUT",
      body: JSON.stringify({
        changePassword: changePassword,
        email: email,
        loginId: loginId,
        nowPassword: nowPassword,
        phone: phone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const { statusCode } = data;

    if (statusCode === 200) {
      cogoToast.info("비밀번호 변경 성공");
      close();
    } else if (statusCode === 401) {
      cogoToast.error("현재 비밀번호를 다시 확인해주세요");
    } else {
      cogoToast.error("비밀번호 변경 실패");
    }
    setNowPassword("");
    setChangePassword("");
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modalP" : "modalP"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {props.children}
            <div className="passbox">
              <p className="p_label">현재 비밀번호</p>
              <input type="password" value={nowPassword} onChange={nowPasswordHandler} />
            </div>

            <div className="passbox">
              <p className="p_label">새 비밀번호</p>
              <input type="password" value={changePassword} onChange={changePasswordHandler} />
            </div>
          </main>
          <footer>
            <button className="accept" onClick={passwordChange}>
              변경하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalBasic;
