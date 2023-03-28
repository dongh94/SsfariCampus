// components
import TransactionItem from "./TransactionItem";
// css
import styles from "./css/TransactionList.module.css";

const TransactionList = () => {
  const tests = [
    ["2022.09.25", "09:51:20", "rkd5755", "jinhasky", "12,900"],
    ["2022.09.25", "09:51:20", "rkd5755", "jinhasky", "12,900"],
    ["2022.09.25", "09:51:20", "rkd5755", "jinhasky", "12,900"],
  ];
  const transactionItem = tests.map((test, idx) => (
    <TransactionItem
      key={idx}
      date={test[0]}
      time={test[1]}
      from={test[2]}
      to={test[3]}
      cost={test[4]}
    />
  ));

  return (
    <div className={styles.TransactionList}>
      <div className={styles.TransactionList_content}>
        <p className={styles.List_date}>일시</p>
        <p>내용</p>
        <p className={styles.List_cost}>금액</p>
      </div>
      {transactionItem}
    </div>
  );
};

export default TransactionList;
