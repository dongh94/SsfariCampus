// components
import TransactionList from "./TransactionList";
// css
import styles from "./css/index.module.css";

const TransactionDetail = () => {
  return (
    <div className={styles.TransactionDetail}>
      <h1>거래 내역</h1>
      <hr />
      <TransactionList />
    </div>
  );
};

export default TransactionDetail;
