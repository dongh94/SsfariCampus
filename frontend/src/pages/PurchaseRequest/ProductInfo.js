// packages
import { useState, useEffect } from "react";
// utils
import useEth from "../../contexts/EthContext/useEth";
// css
import "./css/ProductInfo.css";

const ProductInfo = () => {
  const {
    state: { contract, account },
  } = useEth();

  const item_No = window.location.pathname.split("/")[2];
  const [itemDetail, setItemDetail] = useState("");
  const title = itemDetail[1];
  const subtitle = itemDetail[2];
  const price = itemDetail[3];
  const imgUrl = itemDetail[5];

  useEffect(() => {
    const getItemDetails = async () => {
      const itemDetail = await contract.methods
        .viewItemByItemNo(item_No)
        .call({ from: account });
      setItemDetail(itemDetail);
    };

    getItemDetails();
  }, [account, contract, item_No]);

  return (
    <div className="info_card">
      <div className="productinfo_item">
        <img src={imgUrl} alt="" />
        <div className="productinfo_item_title">
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
        </div>
        <div className="productinfo_item_price">
          <h3>{price}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
