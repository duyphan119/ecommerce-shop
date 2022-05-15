import React from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = ({ genderCategory }) => {
  return (
    <div className="category-dropdown">
      <div className="container">
        <div className="row">
          {genderCategory.group_categories.map((groupCategory) => (
            <div
              className="col-3 col-sm-3 col-md-3 col-lg-3"
              key={groupCategory.slug}
            >
              <Link
                to={`/${groupCategory.slug}`}
                className="category-dropdown-item-group text-uppercase"
              >
                {
                  groupCategory.name
                    .toLowerCase()
                    .split(genderCategory.name.toLowerCase())[0]
                }
              </Link>
              <ul>
                {groupCategory.categories.map((category) => (
                  <li key={category.slug} className="category-dropdown-item">
                    <Link to={`/${category.slug}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
