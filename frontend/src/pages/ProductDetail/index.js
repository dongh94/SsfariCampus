// packages
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// utils
import useEth from "../../contexts/EthContext/useEth";
// components
import ContractItem from "./ContractItem";
import ProductImage from "./ProductImage";
import ProductSummary from "../../components/ProductSummary/ProductSummary";
// css
import styles from "./css/index.module.css";
import LPBtn from "../../components/ui/LPBtn";

const ProductDetail = () => {
  const location = useLocation();

  const {
    state: { contract, account },
  } = useEth();
  const itemNo_param = location.pathname.split("/")[2];

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [tUrl, setTurl] = useState("");
  const [dUrl, setDurl] = useState("");
  const [itemNo, setItemNo] = useState("");
  const [descript, setDescript] = useState("");
  const [seller, setSeller] = useState("");
  const [period, setPeriod] = useState("");

  useEffect(() => {
    const displayItem = async () => {
      const item = await contract.methods
        .viewItemByItemNo(itemNo_param)
        .call({ from: account });
      // const contractList = await contract.methods.viewPurchaseContract().call({ from: account });
      setItemNo(item[0]);
      setTitle(item[1]);
      setSubtitle(item[2]);
      setCategory(item[4]);
      setDescript(item[8]);
      setSeller(item[10]);
      setPeriod(item[7]);
      setPrice(item[3]);
      setTurl(item[5]);
      setDurl(item[6]);
    };
    displayItem();
  }, [account, contract, itemNo_param]);

  const myRole = useSelector((state) => state.user.role);
  let changeComponent = "";

  let contr_list = <></>;
  if (myRole === "USER") {
    contr_list = <ContractItem />;
  }

  const navigate = useNavigate();
  if (myRole === "COMPANY") {
    changeComponent = <div></div>;
  } else {
    changeComponent = (
      <div>
        <LPBtn
          onClick={() => {
            navigate("/product/" + itemNo_param + "/request");
          }}
        >
          구매신청
        </LPBtn>
      </div>
    );
  }
  return (
    <section className={styles.section}>
      <ProductSummary
        itemNo={itemNo}
        title={title}
        subtitle={subtitle}
        category={category}
        descript={descript}
        seller={seller}
        period={period}
        price={price}
        tUrl={tUrl}
      />
      {contr_list}
      <ProductImage dUrl={dUrl} />
      {changeComponent}
    </section>
  );
};

export default ProductDetail;
