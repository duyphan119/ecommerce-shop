import "./Pagination.scss";

const Pagination = ({ onPrev, onNext, onChange, currentPage, totalPage }) => {
  if (totalPage < 2 || currentPage < 1 || currentPage > totalPage) return "";
  return (
    <div className="my-2">
      <ul className="pagination justify-content-center">
        <li
          className={`page-item page-link ${currentPage > 1 ? "" : "disabled"}`}
          onClick={() => {
            if (currentPage > 1) {
              onPrev();
            }
          }}
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </li>
        {currentPage > 1 && (
          <li
            className="page-item page-link"
            onClick={() => onChange(currentPage - 1)}
          >
            {currentPage - 1}
          </li>
        )}

        <li className="page-item page-link active">{currentPage}</li>
        {currentPage < totalPage && (
          <li
            className="page-item page-link"
            onClick={() => onChange(currentPage + 1)}
          >
            {currentPage + 1}
          </li>
        )}
        <li
          className={`page-item page-link ${
            currentPage < totalPage ? "" : "disabled"
          }`}
          onClick={() => {
            if (currentPage < totalPage) {
              onNext();
            }
          }}
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
