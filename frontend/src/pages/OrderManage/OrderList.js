// packages
import { useEffect, useState } from "react";
// utils
import useEth from "../../contexts/EthContext/useEth";
// components
import OrderItem from "./OrderItem";
// css
import styles from "./css/OrderList.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
const OrderList = (props) => {
  const {
    state: { contract, account },
  } = useEth();
  const [contractList, setContractList] = useState([]);

  useEffect(() => {
    const getContractDetails = async () => {
      const contractItems = [];
      let contractItem = {};
      const contractDetails = await contract.methods
        .viewPurchaseContract()
        .call({ from: account });
      let nowItem = "";
      for (let i = 0; i < contractDetails.length; i++) {
        nowItem = await contract.methods
          .viewItemByItemNo(contractDetails[i].item_No)
          .call({ from: account });
        if (!(parseInt(nowItem.seller_address) === parseInt(account))) {
          continue;
        }
        contractItem["productID"] = nowItem[0];
        contractItem["title"] = nowItem[1];
        contractItem["subTitle"] = nowItem[2];
        contractItem["imgURL"] = nowItem[5];
        contractItem["totalPrice"] = contractDetails[i][7];
        contractItem["isComplete"] =
          contractDetails[i][6] * 1 >= contractDetails[i][5] * 1;
        contractItem["totalPeople"] = contractDetails[i][5] * 1;
        contractItem["paidPeople"] = contractDetails[i][6] * 1;
        contractItem["contractID"] = contractDetails[i][0];
        contractItem["customerBoss"] = contractDetails[i][3];

        contractItems.push(contractItem);
        contractItem = {};
      }
      setContractList(contractItems);
    };
    getContractDetails();
  }, [account, contract]);

  const orderItem =
    contractList.length > 0 ? (
      contractList.map((contract, idx) => (
        <OrderItem key={idx} contractInfo={contract} />
      ))
    ) : (
      <div className={styles.empty}>
        <AiOutlineInfoCircle size="150" />
        <div>들어온 주문이 없습니다.</div>
      </div>
    );

  let ListTitle = "";
  if (props.role === "COMPANY") {
    ListTitle = <h1>구매 리스트</h1>;
  } else {
    ListTitle = <h1>주문 리스트</h1>;
  }
  return (
    <div className={styles.container_orderList}>
      <div>
        {ListTitle}
        <hr />
      </div>
      {orderItem}
    </div>
  );
};

export default OrderList;
