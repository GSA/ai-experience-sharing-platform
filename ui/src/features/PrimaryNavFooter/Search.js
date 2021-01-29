import React from "react";
import Icon from "components/Icon";

const Search = (props) => {
  return (
    <form
      className="usa-search usa-search--small"
      role="search"
      acceptCharset="UTF-8"
      action="https://search.usa.gov/search"
      id="search_form"
      method="get"
    >
      <input name="utf8" type="hidden" value="&#x2713;" />
      <input type="hidden" name="affiliate" id="affiliate" value="10x" />
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
