// utils
import EthProvider from "../../contexts/EthContext/EthProvider";
// components
import WalletItem from "./WalletItem";
import UserInfoItem from "./UserInfoItem";
// css
import styles from "./css/UserInfo.module.css";

const UserInfo = (props) => {
  const UserInfoStyle = props.role === "USER" ? styles.UserInfo : styles.SellerInfo;

  return (
    <div className={UserInfoStyle}>
      <UserInfoItem name={props.name} loginId={props.loginId} email={props.email} phone={props.phone} role={props.role} companyNumber={props.companyNumber} />
      <EthProvider contract="SsfariFactory">
        <WalletItem isWallet={props.isWallet} role={props.role} />
      </EthProvider>
    </div>
  );
};

export default UserInfo;
