import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BreadCrumb from "../../components/Common/BreadCrumb";
import EmptyProductList from "../../components/Common/EmplyProductList";
import Pagination from "../../components/Common/Pagination";
import Product from "../../components/Product";
import { configAxiosResponse } from "../../config/configAxios";
import { API_PRODUCT_URL, PRODUCTS_PER_PAGE } from "../../constants";
import "./ProductCategory.scss";
import Sidebar from "./Sidebar";
import SortSelect from "./SortSelect";
const ProductCategory = ({ genderCategory, groupCategory, category }) => {
  const [queryParams] = useSearchParams();
  const p = queryParams.get("p");
  const material = queryParams.get("material");
  const color = queryParams.get("color");
  const size = queryParams.get("size");
  const price = queryParams.get("price");
  const [product, setProduct] = useState();
  const [page, setPage] = useState(initPage(p));
  const [sort, setSort] = useState();
  const [filters, setFilters] = useState([]);
  const [filterPrice, setFilterPrice] = useState();
  const { category_slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  function initPage(_p) {
    try {
      let __p = parseInt(_p);
      if (isNaN(__p)) {
        return 1;
      }
      return __p;
    } catch (error) {
      return 1;
    }
  }

  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(
        `${API_PRODUCT_URL}/${
          category ? "category" : "group-category"
        }/${category_slug}?${queryParams.toString()}&include=true&limit=${PRODUCTS_PER_PAGE}`
      );
      setProduct(data);
    })();
  }, [queryParams, category, category_slug]);

  useEffect(() => {
    let url;

    if (sort && sort.sortBy && sort.sortType) {
      // objQuery.sortBy = sort.sortBy;
      // objQuery.sortType = sort.sortType;
      queryParams.set("sortBy", sort.sortBy);
      queryParams.set("sortType", sort.sortType);
    } else {
      queryParams.delete("sortBy");
      queryParams.delete("sortType");
    }

    if (page > 1) {
      queryParams.set("p", page);
    } else {
      queryParams.delete("p");
    }

    if (filters) {
      filters.forEach((filter) => {
        if (filter.items.length > 0) {
          queryParams.set(filter.key, JSON.stringify(filter.items));
        } else {
          queryParams.delete(filter.key);
        }
      });
    }

    if (filterPrice && filterPrice.value !== JSON.stringify([])) {
      queryParams.set("price", filterPrice.value);
    } else {
      queryParams.delete("price");
    }

    url = queryParams.toString();
    if (!window.location.href.endsWith(url)) {
      navigate(location.pathname + "?" + url);
    }
  }, [navigate, sort, location, page, filters, queryParams, filterPrice]);

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
          <Sidebar
            material={material}
            color={color}
            size={size}
            price={price}
            getFilter={(item) => {
              setFilters(item);
            }}
            getFilterPrice={(item) => setFilterPrice(item)}
          />
        </div>
        <div className="col-9 col-sm-9 col-md-9 col-lg-9">
          <div className="row align-items-center">
            <div className="p-1 col-6 col-sm-6 col-md-6 col-lg-6">
              <SortSelect
                getFilter={(item) => {
                  setSort(item);
                }}
              />
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
            {product && product.items && product.items.length > 0 ? (
              product.items.map((product) => (
                <div
                  className="col-6 col-sm-6 col-md-4 col-lg-3 product-category-item my-1 px-1 "
                  key={product.slug}
                >
                  <Product product={product} />
                </div>
              ))
            ) : (
              <EmptyProductList />
            )}
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
