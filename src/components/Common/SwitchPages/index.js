import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCustomer from "../../../pages/ProductCustomer";
import ProductCategory from "../../../pages/ProductCategory";
const SwitchPages = () => {
  const { category_slug } = useParams();
  const genderCategories = useSelector((state) => state.genderCategory.list);

  function switchPages() {
    for (const genderCategory of genderCategories) {
      if (genderCategory.slug === category_slug) {
        return <ProductCustomer genderCategory={genderCategory} />;
      }
      for (const groupCategory of genderCategory.group_categories) {
        if (groupCategory.slug === category_slug) {
          return (
            <ProductCategory
              genderCategory={genderCategory}
              groupCategory={groupCategory}
            />
          );
        }
        for (const category of groupCategory.categories) {
          if (category.slug === category_slug) {
            return (
              <ProductCategory
                genderCategory={genderCategory}
                category={category}
                groupCategory={groupCategory}
              />
            );
          }
        }
      }
    }
    return <></>;
  }

  return <div>{switchPages()}</div>;
};

export default SwitchPages;
