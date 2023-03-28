// packages
import { Link } from "react-router-dom";
// css
import "./css/SignUpChoice.css";
// assets
import Sazang from "../../assets/사장.svg";
import Pandang from "../../assets/판당.svg";

const SignUpChoice = () => {
  return (
    <div>
      <div className="signup_display">
        <Link to="/signup/customer">
          <img src={Sazang} alt="" />
        </Link>

        <Link to="/signup/seller">
          <img src={Pandang} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default SignUpChoice;
