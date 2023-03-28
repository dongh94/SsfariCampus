// packages
import Web3 from "web3";
import Postcode from "react-daum-postcode";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import useEth from "../../contexts/EthContext/useEth";
// components
import AddressModal from "./AddressModal";
// css
import "./css/RequestForm.css";
import MPBtn from "../../components/ui/MPBtn";
import SWBtnPBrd from "../../components/ui/SWBtnPBrd";
import ModalA from "../../components/ui/ModalA";
// assets
import CoolDeal from "../../assets/cool_deal.gif";

const RequestForm = () => {
  // 모달
  const [modalAOpen, setModalAOpen] = useState(false);
  const openModalA = () => {
    setModalAOpen(true);
  };
  const closeModalA = () => {
    setModalAOpen(false);
  };

  const navigate = useNavigate();
  const [isModal, setModal] = useState(false);
  const [detailAddress, setDetailAddress] = useState("");
  const [people, setPeople] = useState("");
  const [password, setPassword] = useState("");
  const [buyer, setBuyer] = useState("");
  const [inputs, setInputs] = useState({
    address: "",
    zipCode: "",
  });
  const {
    state: { contract, account },
  } = useEth();

  const { zipCode, address } = inputs;
  const [itemDetail, setItemDetail] = useState("");
  const item_No = window.location.pathname.split("/")[2];

  useEffect(() => {
    const getItemDetails = async () => {
      const itemDetail = await contract.methods
        .viewItemByItemNo(item_No)
        .call({ from: account });
      setItemDetail(itemDetail);
    };
    getItemDetails();
  }, [account, contract, item_No]);
  const sellerAddress = itemDetail[9];

  const openModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleComplete = (data) => {
    let _fullAddress = data.address;
    let _extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        _extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        _extraAddress +=
          _extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      _fullAddress += _extraAddress !== "" ? ` (${_extraAddress})` : "";
    }

    setInputs({
      address: _fullAddress,
      zipCode: data.zonecode,
    });

    closeModal();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const detailAddressChangeHandler = (e) => {
    setDetailAddress(e.target.value);
  };
  const buyerChangeHandler = (e) => {
    setBuyer(e.target.value);
  };
  const peopleChangeHandler = (e) => {
    setPeople(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, "");
    setPassword(onlyNumber);
  };

  const createPurchaseContract = async (e) => {
    e.preventDefault();

    if (
      zipCode === "" ||
      address === "" ||
      detailAddress === "" ||
      buyer === "" ||
      people === "" ||
      password === ""
    ) {
      alert("모든 입력 칸을 채워주세요");
      return;
    }

    const web3 = new Web3(
      Web3.givenProvider ||
        "https://goerli.infura.io/v3/7885ac55f47f453488027010d12acadb"
    );
    openModalA();
    try {
      await contract.methods
        .purchaseItem(
          item_No,
          account,
          buyer,
          "[" + zipCode + "] " + address + " " + detailAddress,
          people,
          0,
          false,
          password,
          sellerAddress
        )
        .send({
          from: account,
          gas: 812040,
          value: web3.utils.toWei("0.000000000000000001", "ether"),
        })
        .then(async () => {
          const contractId = await contract.methods.viewPurchaseNo().call();
          navigate("/purchaseContract/" + contractId);
        });
    } catch {
      closeModalA();
    }
  };
  return (
    <>
      <form className="request_inputgroup">
        <label>배송 주소</label>
        <input
          placeholder="우편 번호"
          id="focus"
          className="shipping_add"
          type="text"
          name="address"
          value={zipCode}
          onChange={onChange}
          readOnly
          autoFocus
        />
        <SWBtnPBrd className="add_search" onClick={openModal}>
          검색
        </SWBtnPBrd>
        <input
          placeholder="주소를 입력해주세요"
          className="shipping_add_1"
          type="text"
          name="address"
          value={address}
          onChange={onChange}
          readOnly
        />
        <br />
        <input
          placeholder="상세 주소 입력해주세요"
          className="shipping_add_1"
          type="text"
          value={detailAddress}
          onChange={detailAddressChangeHandler}
        />
        <br />
        <label>구매자 이름</label>
        <input
          placeholder="이름을 입력해주세요"
          type="text"
          value={buyer}
          onChange={buyerChangeHandler}
        />
        <br />
        <label>총 인원</label>
        <input
          placeholder="총 인원을 입력해주세요"
          type="number"
          min="1"
          value={people}
          onChange={peopleChangeHandler}
        />
        <br />
        <label>거래 비밀번호</label>
        <input
          placeholder="비밀번호를 입력해주세요"
          type="text"
          value={password}
          onChange={passwordChangeHandler}
        />
        <br />
        <MPBtn onClick={createPurchaseContract}>신청하기</MPBtn>
      </form>
      <AddressModal open={isModal} close={closeModal}>
        <Postcode onComplete={handleComplete} />
      </AddressModal>
      <ModalA open={modalAOpen}>
        <img src={CoolDeal} alt="쿨거래" style={{ width: "200px" }} />
        <div>
          <p>계약요청 중입니다</p>
          <p>잠시만 기다려주세요</p>
        </div>
      </ModalA>
    </>
  );
};

export default RequestForm;
