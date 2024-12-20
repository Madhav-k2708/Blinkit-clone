import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import UploadProduct from "../pages/UploadProduct";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import AdminPermission from "../layouts/AdminPermission";
import ProductAdmin from "../pages/ProductAdmin";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckOutPage from "../pages/CheckOutPage";
import Success from "../pages/Success";
import Cancle from "../pages/Cancle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp-verification",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrder />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "product",
            element: (
              <AdminPermission>
                {" "}
                <ProductAdmin />{" "}
              </AdminPermission>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermission>
                {" "}
                <UploadProduct />{" "}
              </AdminPermission>
            ),
          },
          {
            path: "category",
            element: (
              <AdminPermission>
                {" "}
                <Category />{" "}
              </AdminPermission>
            ),
          },
          {
            path: "subCategory",
            element: (
              <AdminPermission>
                {" "}
                <SubCategory />{" "}
              </AdminPermission>
            ),
          },
        ],
      },
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },
      {
        path: "cart",
        element: <CartMobile />,
      },
      {
        path: "checkout",
        element: <CheckOutPage />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path : 'cancel',
        element : <Cancle />
      }
    ],
  },
]);

export default router;
