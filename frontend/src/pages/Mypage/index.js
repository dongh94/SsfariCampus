// packages
import { useSelector } from "react-redux";
// utils
import useEth from "../../contexts/EthContext/useEth";
// components
import Notion from "../../components/UserInfo/Notion";
import UserInfo from "../../components/UserInfo";
import PurchaseList from "../../components/UserInfo/PurchaseList";
// css
import styles from "./index.module.css";

function Mypage() {
  const name = useSelector((state) => state.user.name);
  const loginId = useSelector((state) => state.user.loginId);
  const email = useSelector((state) => state.user.email);
  const phone = useSelector((state) => state.user.phone);
  const role = useSelector((state) => state.user.role);
  const companyNumber = useSelector((state) => state.user.companyNumber);

  const { state } = useEth();
  const item =
    state.account !== null ? <PurchaseList /> : <Notion role={role} />;

  return (
    <div className={styles.mypage}>
      <UserInfo
        name={name}
        loginId={loginId}
        email={email}
        phone={phone}
        role={role}
        companyNumber={companyNumber}
      />
      {item}
    </div>
  );
}

export default Mypage;
