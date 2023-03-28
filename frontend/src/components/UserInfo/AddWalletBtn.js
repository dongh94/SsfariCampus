// css
import styles from "./css/AddWalletBtn.module.css";

const AddWalletBtn = () => {
  return (
    <div className={styles.AddWalletBtn}>
      <button
        type="button"
        onClick={() => window.open("https://metamask.io/download/", "_blank")}
      >
        +
      </button>
    </div>
  );
};

export default AddWalletBtn;
