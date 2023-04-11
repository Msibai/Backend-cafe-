import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuItem from "./pages/MenuItem";
import Order from "./pages/Order";
import OrderStatus from "./pages/OrdersStatus";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddMenu from "./pages/addMenu";
import UpdateMenu from "./pages/UpdateMenu";
import UpdateMenuItem from "./pages/UpdateMenuItem";
import AboutUs from "./pages/AboutUs";
import MyAccount from "./pages/MyAccount";
import DeleteMenuItem from "./pages/DeleteMenuItem";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="menu" element={<Menu />}>
        <Route path=":menuid" element={<MenuItem />} />
      </Route>
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="orders" element={<OrderStatus />}>
        <Route path=":orderid" element={<Order />} />
      </Route>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="/dashboard/addmenu" element={<AddMenu />} />
      <Route path="/dashboard/updatemenu" element={<UpdateMenu />} />
      <Route
        path="/dashboard/update-menu-item/:id"
        element={<UpdateMenuItem />}
      />
      <Route
        path="/dashboard/delete-menu-item/:id"
        element={<DeleteMenuItem />}
      />

      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="myaccount" element={<MyAccount />} />
    </Route>,
  ])
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
