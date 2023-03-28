// packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import useEth from "../../contexts/EthContext/useEth";
// css
import styles from "./css/PurchaseItem.module.css";

const PurchaseItem = ({itemNo, contractID}) => {
  const navigate = useNavigate();
  const {
    state: { contract, account },
  } = useEth();
  const [itemDetail, setItemDetail] = useState([]);
  const [contractDetail, setContractDetail] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const itemInfo = await contract.methods.viewItemByItemNo(itemNo).call({ from: account });
      const contractInfo = await contract.methods.viewPurchaseContractByPurchaseNod(contractID).call({ from: account });
      setItemDetail(itemInfo);
      setContractDetail(contractInfo);
    };
    getDetails();
    // eslint-disable-next-line
  }, [account, contract]);

  const { completed, paid_people, total_people, purchase_address, purchase_No, purchase_name } = contractDetail;
  const { thumbnail_picture, item_name, item_price } = itemDetail;

  let completed_cont = "";

  if (!completed) {
    if (paid_people * 1 < total_people * 1) {
      completed_cont = (
          `${paid_people} / ${total_people} `
      );
    } 
    else {
      completed_cont = parseInt(purchase_address) === parseInt(account) ? "확정필요" : "구매대기";
    }
  } 
  else {
    completed_cont = "구매확정";
  }
  

  return (
    <div>
      <div className={styles.PurchaseItem}>
        <div
          className={styles.PurchaseImg}
          onClick={() => {
            navigate(`/purchaseContract/${purchase_No}`);
          }}
        >
          <img className={styles.PurchaseImgSize} src={thumbnail_picture} alt=""></img>
        </div>
        <div
          className={styles.PurchaseTitle}
          onClick={() => {
            navigate(`/purchaseContract/${purchase_No}`);
          }}
        >
          <p className={styles.PurchaseName}>{item_name}</p>
          <p>{purchase_name}</p>
        </div>
        <div className={styles.PurchaseCheck}>
          <p>{item_price}원</p>
        </div>
        <div className={styles.PurchaseStatus}>
          <p>{completed_cont}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PurchaseItem;
