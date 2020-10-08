import React from "react";

const ListItems = ({ items = [] }) =>
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

export default ContentNav;
