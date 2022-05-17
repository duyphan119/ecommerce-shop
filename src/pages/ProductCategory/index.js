import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/Common/BreadCrumb";
import Pagination from "../../components/Common/Pagination";
import Product from "../../components/Product";
import { configAxiosResponse } from "../../config/configAxios";
import { API_PRODUCT_URL, PRODUCTS_PER_PAGE } from "../../constants";
import "./ProductCategory.scss";
import Sidebar from "./Sidebar";
import SortSelect from "./SortSelect";
const ProductCategory = ({ genderCategory, groupCategory, category }) => {
  const [product, setProduct] = useState();
  const [page, setPage] = useState(1);
  console.log(category);
  // const [queryParams] = useSearchParams();
  // const q = queryParams.get("q");
  const { category_slug } = useParams();
  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(
        `${API_PRODUCT_URL}/category/${category_slug}?include=true&limit=${PRODUCTS_PER_PAGE}&p=${page}`
      );
      setProduct(data);
    })();
  }, [category_slug, page]);

  useEffect(() => {
    (async function () {
      //
    })();
  }, []);

  function getBreadCrumb() {
    const array = [
      {
        title: "Trang chủ",
        href: "/",
      },
    ];
    if (genderCategory) {
      array.push({
        title: genderCategory.name,
        href: `/${genderCategory.slug}`,
      });
      if (groupCategory) {
        array.push({
          title: groupCategory.name,
          href: `/${groupCategory.slug}`,
        });
        if (category) {
          array.push({
            title: category.name,
            href: `/${category.slug}`,
          });
        }
      }
    }

    return array;
  }
  return (
    <div className="container bg-white">
      <BreadCrumb items={getBreadCrumb()} />
      <div className="row">
        <div className="col-3 col-sm-3 col-md-3 col-lg-3">
          <Sidebar />
        </div>
        <div className="col-9 col-sm-9 col-md-9 col-lg-9">
          <div className="row align-items-center">
            <div className="p-1 col-6 col-sm-6 col-md-6 col-lg-6">
              <SortSelect />
            </div>
            <div className="px-2 py-1 text-right col-6 col-sm-6 col-md-6 col-lg-6">
              <div className="">
                {product && product.total_rows
                  ? `${product.total_rows} sản phẩm`
                  : ""}
              </div>
            </div>
          </div>
          <div className="row">
            {product &&
              product.items &&
              product.items.map((product) => (
                <div
                  className="col-6 col-sm-6 col-md-4 col-lg-3 product-category-item my-1 px-1 "
                  key={product.slug}
                >
                  <Product product={product} />
                </div>
              ))}
          </div>
          <Pagination
            currentPage={page}
            totalPage={product && product.total_page ? product.total_page : 0}
            onChange={(p) => {
              setPage(p);
            }}
            onPrev={() => {
              setPage(page - 1);
            }}
            onNext={() => {
              setPage(page + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
