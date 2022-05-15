import { useEffect } from "react";
import { getAllGenderCategories } from "../../../../redux/genderCategorySlice";
import { API_GENDER_URL } from "../../../../constants";
import CategoryDropdown from "./CategoryDropdown";
import { configAxiosResponse } from "../../../../config/configAxios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const CategoryNavItem = () => {
  const genderCategories = useSelector((state) => state.genderCategory.list);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(`${API_GENDER_URL}`);
      dispatch(getAllGenderCategories(data));
    })();
  }, [dispatch]);
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link text-light" to="/">
          Trang chủ <span className="sr-only">(current)</span>
        </Link>
      </li>
      {genderCategories.map((genderCategory) => (
        <li
          className="nav-item nav-category text-light"
          key={genderCategory.slug}
        >
          <Link className="nav-link text-light" to={`/${genderCategory.slug}`}>
            {genderCategory.name}
          </Link>
          <CategoryDropdown genderCategory={genderCategory} />
        </li>
      ))}
    </ul>
  );
};

export default CategoryNavItem;
