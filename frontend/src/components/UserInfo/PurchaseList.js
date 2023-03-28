// packages
import { useEffect, useState } from "react";
// utils
import useEth from "../../contexts/EthContext/useEth";
// components
import PurchaseItem from "./PurchaseItem";
// css
import styles from "./css/PurchaseList.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
const PurchaseList = (props) => {
  const {
    state: { contract, account },
  } = useEth();
  const [myContracts, setMyContracts] = useState([]);

  useEffect(() => {
    const getPaidContract = async () => {
      const paidContracts = await contract.methods.viewPaidContract().call({ from: account });
      const myPaidContracts = paidContracts.filter((paidContract) => {
        return parseInt(paidContract.paid_address) === parseInt(account);
      });
      setMyContracts(myPaidContracts);
    };
    getPaidContract();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, contract]);

  let ListTitle = props.role === "COMPANY" ? <h1>구매 리스트</h1> : <h1>주문 리스트</h1>;
  const purchaseItem =
    myContracts.length > 0 ? (
      myContracts.map((myContract, idx) => {
        return <PurchaseItem key={idx} itemNo={myContract.item_No} contractID={myContract.purchase_No} />;
      })
    ) : (
      <div className={styles.empty}>
        <AiOutlineInfoCircle size="150" />
        <div>구매 내역이 없습니다.</div>
      </div>
    );

  return (
    <div className={styles.container_purchaseList}>
      <div>
        {ListTitle}
        <hr />
      </div>
      {purchaseItem}
    </div>
  );
};

export default PurchaseList;
