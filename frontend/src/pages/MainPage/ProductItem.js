// packages
import { useNavigate } from "react-router-dom";
// css
import styles from "./css/ProductItem.module.css";

const ProductItem = (props) => {
  // 상품 이름의 길이가 15자 이상이라면 생략 처리 함수
  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }

  const productName = truncate(props.item[1], 15);
  const navigate = useNavigate();
  return (
    <div className={styles.product_item}>
      <div className={styles.card}>
        <div className={styles.card_top}>
          <img
            src={props.item[5]}
            onClick={() => {
              navigate("");
            }}
            alt="상품사진"
          />
        </div>
        <div className={styles.card_bottom}>
          <h1>{productName}</h1>
          <h3>{(props.item[3] * 1).toLocaleString("ko-KR")} 원</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
