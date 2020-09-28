import React from "react";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
const SearchForm = ({ navigation, secondaryLinks }) => {
  const data = {};
  const { site: { pathPrefix, affiliate, endpoint, inline } = {} } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.currentTarget.query.value;
    if (inline) {
      // TODO nav somewhere
      console.log(pathPrefix);
    } else {
      window.location.replace(
        `${endpoint}/search?utf8=✓&affiliate=${affiliate}&query=${query}`
      );
    }
  };

  return (
    <form className="usa-search usa-search-small" onSubmit={handleSubmit}>
      <div role="search">
        <label className="usa-sr-only" htmlFor="extended-search-field-small">
          Search small
        </label>
        <input
          className="usa-input usagov-search-autocomplete"
          id="extended-search-field-small"
          type="search"
          name="query"
          autoComplete="off"
        />
        <button className="usa-button" type="submit">
          <Fa icon="search" />
          <span className="usa-sr-only">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
