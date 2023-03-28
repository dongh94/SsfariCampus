// packages
import { useNavigate } from "react-router-dom";
// css
import styles from "./css/ProductItem.module.css";

const ProductItem = (props) => {
  const navigate = useNavigate();
  let link = "/products/" + props.good[0];

  const move = () => {
    navigate(link, {
      state: {
        itemNo: props.good[0],
      },
    });
  };
  return (
    <div className={styles.ProductItem} onClick={move}>
      <div className={styles.card}>
        <div className={styles.card_top}>
          <img src={props.good[5]} alt="상품사진" />
        </div>
        <div className={styles.card_bottom}>
          <h1>{props.good[1]}</h1>
          <h3>{(props.good[3] * 1).toLocaleString("ko-KR")} 원</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
