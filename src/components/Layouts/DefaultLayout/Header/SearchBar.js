import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import { Wrapper as PopperWrapper } from "../../../Common/Popper";
import SearchItem from "./SearchItem";
import { API_PRODUCT_URL, LIMIT_SEARCH_RESULT } from "../../../../constants";
import { configAxiosResponse } from "../../../../config/configAxios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState();
  const [q, setQ] = useState("");
  const [showResult, setShowResult] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    const timerId = setTimeout(() => {
      (async function () {
        if (q !== "") {
          const data = await configAxiosResponse().get(
            `${API_PRODUCT_URL}/search?include=true&q=${q}&limit=${LIMIT_SEARCH_RESULT}`
          );
          setSearchResult(data);
        } else {
          setSearchResult();
        }
      })();
    }, 500);
    return () => clearTimeout(timerId);
  }, [q]);

  function handleSubmit(e) {
    e.preventDefault();
    inputRef.current = q;
    setQ("");
    navigate(`/search?q=${inputRef.current}`);
  }

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <div>
        <Tippy
          interactive
          render={(attrs) => (
            <div className="search-result bg-light d-block" {...attrs}>
              <PopperWrapper className="search-result-wrapper custom-scrollbar">
                {searchResult &&
                  searchResult.items &&
                  searchResult.items.map((result, index) => (
                    <SearchItem result={result} key={index} />
                  ))}
              </PopperWrapper>
            </div>
          )}
          visible={
            showResult &&
            searchResult &&
            searchResult.items &&
            searchResult.items.length > 0
          }
          onClickOutside={() => {
            setShowResult(false);
          }}
        >
          <input
            className="form-control search-input mr-sm-1"
            type="search"
            placeholder="Tìm tại đây"
            aria-label="Tìm tại đây"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
            onFocus={() => {
              setShowResult(true);
            }}
          />
        </Tippy>
      </div>
      <button
        className="btn btn-light my-2 my-sm-0 d-sm-inline d-none"
        type="submit"
      >
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default SearchBar;
