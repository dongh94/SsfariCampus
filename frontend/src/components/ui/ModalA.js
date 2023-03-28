// packages
// import Web3 from "web3";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// utils
// import useEth from "../../contexts/EthContext/useEth";
// css
import "./ModalA.css";

const ModalA = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modalA" : "modalA"}>
      {open ? (
        <section>
          <header>{header}</header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
  );
};

export default ModalA;
