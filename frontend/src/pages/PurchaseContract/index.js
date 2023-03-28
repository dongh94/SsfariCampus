// packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import useEth from "../../contexts/EthContext/useEth";
// components
import ModalBasic from "./ModalBasic";
import RequestInfo from "./RequestInfo";
import ProductSummary from "../../components/ProductSummary/ProductSummary";
// css
import styles from "./css/index.module.css";
import MPBtn from "../../components/ui/MPBtn";
import ModalA from "../../components/ui/ModalA";
// assets
import CoolDeal from "../../assets/cool_deal.gif";

const PurchaseContract = () => {
  // 모달
  const [modalAOpen, setModalAOpen] = useState(false);
  const openModalA = () => {
    setModalAOpen(true);
  };
  const closeModalA = () => {
    setModalAOpen(false);
  };

  const navigate = useNavigate();
  const {
    state: { contract, account },
  } = useEth();
  const [contractDetail, setContractDetail] = useState("");
  const contract_No = window.location.pathname.split("/")[2];

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchConfirmContract = async () => {
    openModalA();
    try {
      await contract.methods
        .confirmContract(contract_No)
        .send({ from: account, value: 0 });
      navigate("/mypage");
    } catch {
      closeModalA();
    }
  };

  useEffect(() => {
    const getContractDetails = async () => {
      const contractDetail = await contract.methods
        .viewPurchaseContractByPurchaseNod(contract_No)
        .call({ from: account });
      setContractDetail(contractDetail);
    };

    getContractDetails();
  }, [account, contract, contract_No]);

  let Btn = <></>;

  if (!contractDetail.completed) {
    if (contractDetail.paid_people * 1 >= contractDetail.total_people * 1) {
      if (parseInt(contractDetail.purchase_address) === parseInt(account)) {
        Btn = <MPBtn onClick={fetchConfirmContract}>결제 확정하기 </MPBtn>;
      }
    } else {
      Btn = (
        <MPBtn onClick={openModal}>
          {contractDetail.paid_people}/{contractDetail.total_people}
        </MPBtn>
      );
    }
  } else {
    alert("결제가 완료된 계약입니다.");
  }

  return (
    <section className={styles.section}>
      <ProductSummary itemNo={contractDetail.item_No} />
      <RequestInfo contractDetail={contractDetail} />
      {Btn}
      <ModalBasic
        open={modalOpen}
        close={closeModal}
        header="결제 비밀번호를 입력해주세요"
        cont_pass={contractDetail.password}
        itemNo={contractDetail.item_No}
        contract_No={contract_No}
      ></ModalBasic>
      <ModalA open={modalAOpen}>
        <img src={CoolDeal} alt="쿨거래" style={{ width: "200px" }} />
        <div>
          <p>결제확정 중입니다</p>
          <p>잠시만 기다려주세요</p>
        </div>
      </ModalA>
    </section>
  );
};

export default PurchaseContract;
