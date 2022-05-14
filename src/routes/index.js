import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { HeaderOnly } from "../components/Layouts";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/product/:product_slug",
    component: ProductDetail,
  },
  {
    path: "/login",
    component: Login,
    layout: HeaderOnly,
  },
  {
    path: "/register",
    component: Register,
    layout: HeaderOnly,
  },
];
export const privateRoutes = [];
