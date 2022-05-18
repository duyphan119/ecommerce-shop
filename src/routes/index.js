import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { HeaderOnly } from "../components/Layouts";
import ProductSearchResult from "../pages/ProductSearchResult";
import SwitchPages from "../components/Common/SwitchPages";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import CheckoutSuccess from "../pages/CheckoutSuccess";

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
    path: "/search",
    component: ProductSearchResult,
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
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/checkout/success",
    component: CheckoutSuccess,
  },
  {
    path: "/:category_slug",
    component: SwitchPages,
  },
];
export const privateRoutes = [];
