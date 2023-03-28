// css
import styles from "./css/ProductImage.module.css";

const ProductImage = (props) => {
  return (
    <div className={styles.ProductImage}>
      <h1>상품 상세</h1>
      <img src={props.dUrl} alt="" className={styles.ProductImg} />
    </div>
  );
};

export default ProductImage;
