// packages
import { useState } from "react";
// components
import ModalPassword from "./ModalPassword";
// css
import styles from "./css/UserInfoItem.module.css";
import BtnPTxt from "../ui/BtnPTxt";
import { BsFillKeyFill } from "react-icons/bs";

const UserInfoItem = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const phoneNumber = props.phone.slice(0, 3) + "-" + props.phone.slice(3, 7) + "-" + props.phone.slice(7, 11);
  const EorN = props.companyNumber ? props.companyNumber : props.email;

  return (
    <div className={styles.UserInfoItem}>
      <div>
        <h2>
          {props.name} ({props.loginId}){" "}
        </h2>
        <p>{EorN}</p>
        <p>{phoneNumber}</p>
      </div>
      <div className={styles.Passchange}>
        <BtnPTxt onClick={openModal}>
          <BsFillKeyFill />
          비밀번호 변경
        </BtnPTxt>
        <ModalPassword open={modalOpen} close={closeModal} header="비밀번호 변경"></ModalPassword>
      </div>
    </div>
  );
};

export default UserInfoItem;
