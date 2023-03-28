// packages
import { useSelector } from "react-redux";
// utils
import Web3 from "web3";
import useEth from "../../contexts/EthContext/useEth";
// css
import styles from "./css/WalletCarouselItem.module.css";
import XsPBtn from "../ui/XsPBtn";
import XsKBtn from "../ui/XsKBtn";

const WalletCarouselItem = (props) => {
  const myRole = useSelector((state) => state.user.role);
  const { state } = useEth();

  let UserInfoStyle = "";
  const chargeMoney = async () => {
    const web3 = new Web3(
      Web3.givenProvider ||
        "https://goerli.infura.io/v3/7885ac55f47f453488027010d12acadb"
    );
    await state.contract.methods.transferMoney(state.account).send({
      from: state.account,
      gas: 402004,
      value: web3.utils.toWei("0", "ether"),
    });

    alert("충전되었습니다!");
  };

  if (myRole === "USER") {
    UserInfoStyle = (
      <div className={styles.btn_div}>
        <XsPBtn onClick={chargeMoney}>충전</XsPBtn>
      </div>
    );
  } else {
    UserInfoStyle = (
      <div className={styles.btn_div}>
        <XsKBtn onClick={chargeMoney}>충전</XsKBtn>
      </div>
    );
  }
  let balance = state.balance;
  let unit = "";

  balance = (state.balance / 1e18).toFixed(4);
  unit = "eth";
  let cash = (balance * 20000000).toLocaleString("ko-KR");

  let don = <></>;
  if (props.title === "CASH") {
    don = <>{cash} 원</>;
  } else {
    don = (
      <>
        {balance} {unit}
      </>
    );
  }
  return (
    <div className={styles.WalletCarouselItem}>
      <h2>{props.title}</h2>
      <p>{don}</p>
      {UserInfoStyle}
    </div>
  );
};

export default WalletCarouselItem;
