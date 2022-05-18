import { useState, useEffect } from "react";
import { configAxiosResponse } from "../../config/configAxios";
import { API_COLOR_URL, API_MATERIAL_URL, API_SIZE_URL } from "../../constants";

const Sidebar = ({
  getFilter,
  material,
  color,
  size,
  price,
  getFilterPrice,
}) => {
  const [filters, setFilters] = useState([]);
  const [filterPrice, setFilterPrice] = useState({
    active: true,
    key: "price",
    title: "Giá tiền",
    items: [
      {
        text: "Tất cả",
        value: JSON.stringify([]),
        active: false,
      },
      {
        text: "Nhỏ hơn 250000",
        value: JSON.stringify([0, 249999]),
        active: false,
      },
      {
        text: "Từ 250000 đến 500000",
        value: JSON.stringify([250000, 500000]),
        active: false,
      },
      {
        text: "Lớn hơn 500000",
        value: JSON.stringify([500001]),
        active: false,
      },
    ],
  });
  const [selectedFilters, setSelectedFilters] = useState([
    {
      key: "material",
      items: material ? JSON.parse(material) : [],
    },
    {
      key: "color",
      items: color ? JSON.parse(color) : [],
    },
    {
      key: "size",
      items: size ? JSON.parse(size) : [],
    },
  ]);

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
      Promise.all([promise1, promise2, promise3])
        .then((values) => {
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
        })
        .catch((err) => console.log(err));
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
    getFilter(_selectedFilters);
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
        <li key={filterPrice.title} className="p-2  sidebar-filter-item">
          <div
            className="d-flex align-items-center justify-content-between font-weight-bold"
            onClick={() =>
              setFilterPrice({ ...filterPrice, active: !filterPrice.active })
            }
          >
            <span>{filterPrice.title}</span>
            <i
              className={`fa ${
                filterPrice.active ? "fa-chevron-up" : "fa-chevron-down"
              }`}
              aria-hidden="true"
            ></i>
          </div>
          {filterPrice.active && (
            <ul
              className={`custom-scrollbar ${
                filterPrice.active ? "active" : ""
              }`}
            >
              {filterPrice.items.map((item, index) => (
                <li key={index} className={`${item.active ? "active" : ""}`}>
                  <label htmlFor={`price${index}`}>
                    <input
                      type="checkbox"
                      className="mr-1"
                      name="price"
                      id={`price${index}`}
                      value={item.value}
                      onChange={() => {
                        getFilterPrice(item);
                      }}
                      checked={
                        price
                          ? price === item.value
                          : item.value === JSON.stringify([])
                      }
                    />
                    <span>{item.text}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
