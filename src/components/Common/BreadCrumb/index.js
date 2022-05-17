import { Link } from "react-router-dom";
import "./BreadCrumb.scss";

const BreadCrumb = ({ items, centerContent }) => {
  if (!items) return "";
  return (
    <div
      className={`breadcrumb p-2 ${
        centerContent ? "justify-content-center" : ""
      }`}
    >
      {items.map((item, index) => (
        <div
          className={`breadcrumb-item ${
            index === items.length - 1 ? "active" : ""
          }`}
          key={index}
        >
          {index === items.length - 1 ? (
            item.title
          ) : (
            <Link className="breadcrumb-item-link" to={item.href}>
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
