// css
import "./css/RequestInfo.css";

const RequestInfo = ({ contractDetail }) => {
  return (
    <div className="request_info">
      <div>
        <div className="request_item">
          <p className="request_label">배송지</p>
          <p className="request_content">{contractDetail.shipping_address}</p>
        </div>
        <div className="request_item">
          <p className="request_label">총 인원</p>
          <p className="request_content">{contractDetail.total_people} 명</p>
        </div>
        <div className="request_item">
          <p className="request_label">총 가격</p>
          <p className="request_content">
            {(contractDetail.total_price * 1).toLocaleString("ko-KR")} 원
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestInfo;
