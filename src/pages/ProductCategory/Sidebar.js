import { useState, useEffect } from "react";
import { configAxiosResponse } from "../../config/configAxios";
import { API_COLOR_URL, API_MATERIAL_URL, API_SIZE_URL } from "../../constants";

const Sidebar = () => {
  const [filters, setFilters] = useState([
    {
      title: "Chất liệu",
      key: "material",
      items: ["a", "b", "c"],
      active: true,
    },
    {
      title: "Màu sắc",
      key: "color",
      items: ["Đỏ", "Xanh dương", "Tím"],
      active: true,
    },
  ]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    (async function () {
      const promise1 = new Promise(async (resolve, reject) => {
        resolve(configAxiosResponse().get(`${API_MATERIAL_URL}`));
      });
      const promise2 = new Promise(async (resolve, reject) => {
        resolve(configAxiosResponse().get(`${API_COLOR_URL}`));
      });
      const promise3 = new Promise(async (resolve, reject) => {
        resolve(configAxiosResponse().get(`${API_SIZE_URL}`));
      });
      Promise.all([promise1, promise2, promise3]).then((values) => {
        const data = [];
        data.push({
          key: "material",
          title: "Chất liệu",
          items: values[0].map((el) => el.value),
          active: true,
        });
        data.push({
          key: "color",
          title: "Màu sắc",
          items: values[1].map((el) => el.value),
          active: true,
        });
        data.push({
          key: "size",
          title: "Kích cỡ",
          items: values[2].map((el) => el.value),
          active: true,
        });
        setFilters(data);
      });
    })();
  }, []);

  function handleCollapseFilter(filter) {
    const _filters = [...filters];
    const index = _filters.findIndex((el) => el.title === filter.title);
    _filters[index].active = !_filters[index].active;
    setFilters(_filters);
  }

  function handleSelectFilter(item) {
    const _selectedFilters = [...selectedFilters];
    const _indexSelected = _selectedFilters.findIndex(
      (el) => el.key === item.key
    );
    console.log(_indexSelected);
    if (_indexSelected !== -1) {
      const _indexItem = _selectedFilters[_indexSelected].items.findIndex(
        (el) => el === item.item
      );
      if (_indexItem === -1) {
        _selectedFilters[_indexSelected].items.push(item.item);
      } else {
        _selectedFilters[_indexSelected].items = _selectedFilters[
          _indexSelected
        ].items.filter((el) => el !== item.item);
      }
    } else {
      _selectedFilters.push({
        key: item.key,
        items: [item.item],
      });
    }
    setSelectedFilters(_selectedFilters);
  }

  function showSelectedFilters() {
    let array = [];

    selectedFilters.forEach((selectedFilter) => {
      selectedFilter.items.forEach((item) => {
        array.push(
          <li
            key={item}
            className="mr-2 my-1 selected-filter-item px-3 py-1"
            onClick={() =>
              handleDeselectFilter({ key: selectedFilter.key, item })
            }
          >
            {item}
          </li>
        );
      });
    });
    if (array.length > 0)
      return (
        <li className="p-2 d-flex sidebar-filter-item font-weight-bold ">
          <ul className="d-flex align-items-center flex-wrap">
            {[
              <li className="mr-1" key="Đã chọn: ">
                Đã chọn:
              </li>,
              ...array,
            ]}
          </ul>
        </li>
      );
    return [];
  }

  function handleDeselectFilter(item) {
    const _selectedFilters = [...selectedFilters];
    const _indexSelected = _selectedFilters.findIndex(
      (el) => el.key === item.key
    );
    _selectedFilters[_indexSelected].items = _selectedFilters[
      _indexSelected
    ].items.filter((el) => el !== item.item);
    setSelectedFilters(_selectedFilters);
  }

  return (
    <div className="bg-white sidebar">
      <ul className="sidebar-filter-list">
        {showSelectedFilters()}
        {filters.map((filter) => (
          <li key={filter.title} className="p-2  sidebar-filter-item">
            <div
              className="d-flex align-items-center justify-content-between font-weight-bold"
              onClick={() => handleCollapseFilter(filter)}
            >
              <span>{filter.title}</span>
              <i
                className={`fa ${
                  filter.active ? "fa-chevron-up" : "fa-chevron-down"
                }`}
                aria-hidden="true"
              ></i>
            </div>
            {filter.active && (
              <ul
                className={`filter-item-chip-list d-flex custom-scrollbar ${
                  filter.active ? "active" : ""
                }`}
              >
                {filter.items.map((item) => (
                  <li
                    key={item}
                    className={`filter-item-chip-item px-3 py-1 my-1 ${
                      selectedFilters.find((el) => el.items.includes(item))
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleSelectFilter({ key: filter.key, item })
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
