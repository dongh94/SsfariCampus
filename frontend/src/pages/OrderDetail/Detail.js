// packages
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
// utils
import useEth from "../../contexts/EthContext/useEth";
// css
import "./css/Detail.css";

const Detail = () => {
  const location = useLocation();
  const contractID = location.pathname.split('/')[3];
  const {
    state: { contract, account },
  } = useEth();
  const [contractInfo, setContractInfo] = useState([]);

  useEffect(() => {
    const getContractDetail = async () => {
      const contractDetail = await contract.methods
        .viewPurchaseContractByPurchaseNod(contractID)
        .call({ from: account });
      setContractInfo(contractDetail);
    };
    getContractDetail();
    // eslint-disable-next-line
  }, [account, contract]);

  const customer = contractInfo[3];
  const customerAddress = contractInfo[4];
  const totalPeople = contractInfo[5];
  const paidPeople = contractInfo[6];
  const totalPrice = (contractInfo[7] * 1).toLocaleString('ko-KR');
  const isComplete = contractInfo[8];

  return (
    <div className="detail_info">
      <div>
        <div className="detail_item">
          <p className="detail_label">구매자</p>
          <p className="detail_content">{customer}</p>
        </div>
        <div className="detail_item">
          <p className="detail_label">배송지</p>
          <p className="detail_content">
            {customerAddress}
          </p>
        </div>
        <div className="detail_item">
          <p className="detail_label">총 인원</p>
          <p className="detail_content">{totalPeople} 명</p>
        </div>
        <div className="detail_item">
          <p className="detail_label">총 가격</p>
          <p className="detail_content">{totalPrice} 원</p>
        </div>
        <div className="detail_item">
          <p className="detail_label">결제 상태</p>
          <p className="detail_content">{isComplete? '결제 완료' : '결제 진행중 ( ' + paidPeople + ' / ' + totalPeople + ' )'}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
