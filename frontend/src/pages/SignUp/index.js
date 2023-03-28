// components
import SignUpChoice from "./SignUpChoice";
// assets
import { ReactComponent as Reservation } from "../../assets/Signup.svg";
// css
import "./css/index.css";

const SignUpMain = () => {
  return (
    <div className="Login_container">
      <div className="Login_logo">
        <Reservation width="18rem" height="11rem" />
      </div>
      <hr />
      <SignUpChoice />
    </div>
  );
};

export default SignUpMain;
