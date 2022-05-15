import { Link } from "react-router-dom";
export function isShowLoadMore(obj, limit, onClick) {
  if (obj && obj.items && obj.items.length > 0) {
    if (obj.items.length >= limit && obj.total_page > 1) {
      return <Button onClick={onClick} label="Xem thêm" />;
    }
  }
  return <></>;
}

export function isShowCollapse(obj, limit, onClick) {
  if (obj && obj.items && obj.items.length > 0) {
    if (obj.total_page === 1 && obj.items.length > limit) {
      return <Button onClick={onClick} label="Thu gọn" />;
    }
  }
  return <></>;
}
export const Button = ({ onClick, label }) => {
  return (
    <div className="text-center my-2">
      <button className="btn btn-primary" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};
export const ButtonLink = ({ link, label }) => {
  return (
    <div className="text-center my-2">
      <Link to={link} className="btn btn-primary">
        {label}
      </Link>
    </div>
  );
};
