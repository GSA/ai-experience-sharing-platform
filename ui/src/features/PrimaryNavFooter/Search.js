import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "components/Icon";
import { setSearchTerm } from "app/ContentModule";
import { useHistory } from "react-router-dom";

const Search = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { list: { searchTerm } } = useSelector((state) => state.content);

  const handleChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    history.push('/usecases');
  };

  return (
    <form
      className="usa-search usa-search--small"
      role="search"
      acceptCharset="UTF-8"
      id="search_form"
      method="get"
    >
      <input name="utf8" type="hidden" value="&#x2713;" />
      <input type="hidden" name="affiliate" id="affiliate" value="AI" />
      <label className="usa-sr-only" htmlFor="query">
        Search
      </label>
      <input
        name="query"
        id="query"
        autoComplete="off"
        className="usa-input"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        className="usa-button usa-button--primary-lighter"
        aria-label="search"
        type="submit"
      >
        <Icon icon="search" />
      </button>
    </form>
  );
};

Search.propTypes = {};

export default Search;
