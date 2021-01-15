import React from "react";
import PropTypes from "prop-types";
import kebab from "utils/kebab";

const ContentNav = ({ items }) => {
  return (
    <div>
      <ul>
        {items.map(
          (item) =>
            item.title && (
              <li>
                <a href={`#${kebab(item.title)}`}>{item.title}</a>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

ContentNav.defaultProps = {
  items: [],
};

ContentNav.propTypes = {
  items: PropTypes.array,
};

export default ContentNav;
