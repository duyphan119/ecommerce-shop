import { Link } from "react-router-dom";
import { formatThousandDigits } from "../../../../utils";

const SearchItem = ({ result }) => {
  return (
    <Link to={`/${result.slug}`} className="d-flex search-item">
      <div className="search-item-img">
        <img src={result.colors[0].images[0].url} alt="" />
      </div>
      <div className="d-flex flex-column justify-content-between">
        <div className="three-dot three-dot-2 search-item-name">
          {result.name}
        </div>
        <div className="three-dot three-dot-2 search-item-price text-primary">
          {formatThousandDigits(result.price)}đ
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
