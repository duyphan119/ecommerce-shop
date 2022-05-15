import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { HeaderOnly } from "../components/Layouts";
import ProductSearchResult from "../pages/ProductSearchResult";
import SwitchPages from "../components/Common/SwitchPages";

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
    path: "/:category_slug",
    component: SwitchPages,
  },
];
export const privateRoutes = [];
