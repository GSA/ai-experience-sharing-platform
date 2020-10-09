import React from "react";
import PropTypes from "prop-types";

const ListItems = ({ items }) =>
  items.map((item, i) => (
    <>
      <li className="ContentNav__item" key={`content-nav-${i}`}>
        <a className="ContentNav__link" href={item.url}>
          {item.text}
        </a>
      </li>
      {item.items && <Sublist items={item.items} />}
    </>
  ));

const Sublist = ({ items }) => <ListItems items={items} />;

const ContentNav = ({ items }) => {
  return (
    <ul className="ContentNav">
      <ListItems items={items} />
    </ul>
  );
};

ContentNav.defaultProps = {
  items: [],
};

ContentNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      items: PropTypes.array,
    })
  ),
};

export default ContentNav;
