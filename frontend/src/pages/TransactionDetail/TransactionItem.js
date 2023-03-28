// css
import styles from "./css/TransactionItem.module.css";

const TransactionItem = (props) => {
  return (
    <div>
      <div className={styles.Transaction}>
        <div className={styles.Transaction_date}>
          <p>{props.date}</p>
          <p>{props.time}</p>
        </div>
        <div className={styles.TransactionCheck}>
          <div>{props.from}</div>
          <div>⇒</div>
          <div>{props.to}</div>
        </div>
        <div className={styles.TransactionCost}>
          <p>{props.cost}원</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default TransactionItem;
