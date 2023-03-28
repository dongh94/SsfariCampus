// components
import ProductInfo from "./ProductInfo";
import RequestForm from "./RequestForm";

const PurchaseRequest = () => {
  return (
    <div className="container">
      <h1>구매 신청</h1>
      <hr />
      <ProductInfo className="card_center" />
      <RequestForm />
    </div>
  );
};

export default PurchaseRequest;
