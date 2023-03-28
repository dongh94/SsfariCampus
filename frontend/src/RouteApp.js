import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import FirstMain from "./pages/NewMainPage";
import ProductDetail from "./pages/ProductDetail";
import SignUpMain from "./pages/SignUp";
import SignUpSeller from "./pages/SignUp/SignUpSeller";
import SignUpCustomer from "./pages/SignUp/SignUpCustomer";

import MyPage from "./pages/Mypage";
import PurchaseContract from "./pages/PurchaseContract";
import PurchaseRequest from "./pages/PurchaseRequest";
import TransactionDetail from "./pages/TransactionDetail";

import OrderDetail from "./pages/OrderDetail";
import OrderManage from "./pages/OrderManage";
import ProductManage from "./pages/ProductManage";
import ProductRegist from "./pages/ProductRegist";

function RouteApp() {
  const userType = useSelector((state) => state.user.role);
  const isLogin = useSelector((state) => state.auth.isAuthenticated);

  const Pages = (
    <Fragment>
      <Route path="/main" element={<MainPage />} />
      <Route path="/main/search/:word" element={<MainPage />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
    </Fragment>
  );

  const GuestPages = (
    <Fragment>
      <Route path="*" element={<FirstMain />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpMain />} />
      <Route path="/signup/customer" element={<SignUpCustomer />} />
      <Route path="/signup/seller" element={<SignUpSeller />} />
    </Fragment>
  );

  const CustomerPages = (
    <Fragment>
      <Route path="*" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route
        path="/purchaseContract/:transactionId"
        element={<PurchaseContract />}
      />
      <Route path="/product/:productId/request" element={<PurchaseRequest />} />
      <Route
        path="/mypage/:transactionId/transactionDetail"
        element={<TransactionDetail />}
      />
    </Fragment>
  );

  const SellerPages = (
    <Fragment>
      <Route path="*" element={<OrderManage />} />
      <Route path="/orderManage" element={<OrderManage />} />
      <Route path="/productRegist" element={<ProductRegist />} />
      <Route path="/orderDetail/:productId/:contractID" element={<OrderDetail />} />
      <Route path="/productManage" element={<ProductManage />} />
      <Route path="/productManage/:productId" element={<ProductDetail />} />
    </Fragment>
  );

  return (
    <Routes>
      {Pages}
      {isLogin ? null : GuestPages}
      {userType === "USER" ? CustomerPages : null}
      {userType === "COMPANY" ? SellerPages : null}
    </Routes>
  );
}

export default RouteApp;
