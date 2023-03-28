// packages
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// utils
import useEth from "../../contexts/EthContext/useEth";
import "./css/ContractItem.css";

const ContractItem = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [keyword, setKeyword] = useState("");

  const {
    state: { contract, account },
  } = useEth();
  const [contractDetails, setContractDetails] = useState([]);
  if (location.split("/")[2] && keyword !== location.split("/")[2]) {
    setKeyword(location.split("/")[2]);
  }
  useEffect(() => {
    const getContractDetails = async () => {
      const contractDetails = await contract.methods.viewPurchaseContract().call({ from: account });
      setContractDetails(contractDetails);
    };
    getContractDetails();
    // eslint-disable-next-line
  }, [account, contract]);

  const processingItem = contractDetails
    .filter((contractDetail) => contractDetail.item_No === keyword && contractDetail.paid_people * 1 < contractDetail.total_people * 1)
    .reverse()
    .map((contractDetail, idx) => (
      <>
        {/* item_no === params일 때만 뜬다 */}
        <div
          className="item_card"
          onClick={() => {
            navigate("/purchaseContract/" + contractDetail.purchase_No);
          }}
        >
          <div className="item_flex name">
            <p className="color">{contractDetail.purchase_name}</p>
            <p>
              ({contractDetail.paid_people}/{contractDetail.total_people})
            </p>
          </div>
          <div className="process_margin">
            <p>진행중</p>
          </div>
          <div className="btn_flex">
            <button
              className="join_btn"
              onClick={() => {
                navigate("/purchaseContract/" + contractDetail.purchase_No);
              }}
            >
              참여하기
            </button>
          </div>

          {/* 여기다 만들었습니다 잘 쓰세여 */}
        </div>
        <hr className="item_hr" />
      </>
    ));

  return <div className="item_cardbox type2">{processingItem}</div>;
};

export default ContractItem;
