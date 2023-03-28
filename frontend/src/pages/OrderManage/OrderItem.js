// packages
import { useNavigate } from "react-router-dom";
// css
import styles from "./css/OrderItem.module.css";

const OrderItem = (props) => {
  const navigate = useNavigate();
  const { title, isComplete, totalPrice, imgURL, contractID, totalPeople, paidPeople, productID, customerBoss } = props.contractInfo;
  return (
    <div>
      <div className={styles.OrderItem}>
        <div className={styles.OrderImg}>
          <img
            className={styles.OrderImgSize}
            src={imgURL}
            alt="상품사진"
            onClick={() => {
              navigate("/orderDetail/" + productID + "/" + contractID);
            }}
          />
        </div>
        <div
          className={styles.OrderTitle}
          onClick={() => {
            navigate("/orderDetail/" + productID + "/" + contractID);
          }}
        >
          <p className={styles.OrderName}>{title}</p>
          <p>{customerBoss}</p>
        </div>
        <div className={styles.OrderCheck}>
          <p>{(totalPrice * 1).toLocaleString("ko-KR")}원</p>
        </div>
        <div className={styles.OrderStatus}>
          <p>{isComplete ? "결제 완료" : paidPeople + " / " + totalPeople}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default OrderItem;
