import React from 'react';

const ListItems = ({ items = [] }) =>
  items.map((item) => (
    <>
      <li className="ContentNav__item">
        <a className="ContentNav__link" href={item.url}>
          {item.title}
        </a>
      </li>
      {item.items && <Sublist items={item.items} />}
    </>
  ));

const Sublist = ({ items }) => <ListItems items={items} />;

const ContentNav = ({ items }) => (
  <ul className="ContentNav">
    <ListItems items={items} />
  </ul>
);

export default ContentNav;
