// packages
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// utils
import useEth from "../../contexts/EthContext/useEth";
// css
import "./ProductSummary.css";
import MKBtn from "../ui/MKBtn";
// assets
import LPBtn from "../ui/LPBtn";

const ProductSummary = (props) => {
  const navigate = useNavigate();
  const myRole = useSelector((state) => state.user.role);

  const nowPath = window.location.pathname.split("/")[1];
  const item_No = nowPath === 'purchaseContract' ? props.itemNo : window.location.pathname.split("/")[2];

  const {
    state: { contract, account },
  } = useEth();
  const [itemDetail, setItemDetail] = useState("");

  useEffect(() => {
    const getItemDetails = async () => {
      const contractDetail = await contract.methods.viewItemByItemNo(item_No).call({ from: account });
      setItemDetail(contractDetail);
    };

    getItemDetails();
  }, [account, contract, item_No, nowPath]);

  // 버튼 형태 결정
  let changeComponent = "";
  const price_component = myRole === "COMPANY" ? "product_price_seller" : "product_price";
  if (nowPath === "purchaseContract" || nowPath === "orderDetail") {
    changeComponent = <div></div>;
  } else if (nowPath === "products" && myRole !== "COMPANY") {
    changeComponent = (
      <LPBtn
        onClick={() => {
          navigate("/product/" + item_No + "/request");
        }}
        className="purchase_btn1"
      >
        구매신청
      </LPBtn>
    );
  } else {
    changeComponent = (
      <div>
        <MKBtn>삭제하기</MKBtn>
      </div>
    );
  }

  return (
    <div className="product_summary_center">
      <div className="product_summary">
        <div>
          <img src={itemDetail.thumbnail_picture} alt="" />
        </div>
        <div className="product_summary_de">
          <div className="product_main">
            <p className="product_title">{itemDetail.item_name}</p>
            <p className="product_subtitle">{itemDetail.oneline_description}</p>
            <p className={price_component}>{(itemDetail.item_price * 1).toLocaleString("ko-KR")}원</p>
          </div>
          <div>
            <div className="product_mini">
              <p className="product_label">배송</p>
              <p className="product_content">{itemDetail.delivery_period}</p>
            </div>
            <div className="product_mini">
              <p className="product_label">판매자</p>
              <p className="product_content">{itemDetail.seller_name}</p>
            </div>
            <div className="product_mini_last">
              <p className="product_label">상품설명</p>
              <p className="product_content">{itemDetail.detail_description}</p>
            </div>
          </div>
          <br />
          <div className="purchase_btn">{changeComponent}</div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
