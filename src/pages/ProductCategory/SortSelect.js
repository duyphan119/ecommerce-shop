import React, { useState } from "react";

const SortSelect = () => {
  const [sort, setSort] = useState({
    isShow: false,
    items: [
      {
        title: "Mặc định",
        sortBy: "id",
        sortType: "desc",
      },
      {
        title: "Tên A - Z",
        sortBy: "name",
        sortType: "asc",
      },
      {
        title: "Tên Z - A",
        sortBy: "name",
        sortType: "desc",
      },
    ],
  });
  const [selectedSort, setSelectedSort] = useState(0);

  function handleSelectDropdownItem(index) {
    setSelectedSort(index);
    setSort({ ...sort, isShow: !sort.isShow });
  }

  return (
    <div className="d-flex align-items-center">
      <div className="mr-2">Sắp xếp theo</div>
      <div className="sort-select-list">
        <div
          className="sort-select-item active d-flex align-items-center p-1 justify-content-between"
          onClick={() => setSort({ ...sort, isShow: !sort.isShow })}
        >
          <span className="">{sort.items[selectedSort].title}</span>
          <span className="icon-down">
            <i className="fa fa-chevron-down"></i>
          </span>
        </div>
        <div className="sort-select-dropdown">
          {sort.isShow &&
            sort.items.map((item, index) => (
              <div
                className="sort-select-dropdown-item d-flex align-items-center p-1 justify-content-between"
                onClick={() => handleSelectDropdownItem(index)}
              >
                <span className="">{item.title}</span>
                <span
                  className={`icon-checked ${
                    index === selectedSort ? "active" : ""
                  }`}
                >
                  <i className="fa fa-check"></i>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SortSelect;
