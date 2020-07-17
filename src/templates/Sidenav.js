import React from "react";
import { Link } from "react-router-dom";

const ListItems = (items) =>
  items.map((item) => (
    <li className="usa-sidenav__item">
      <Link to={item.value}>{item.label}</Link>
      {item.items && <Sublist items={item.items} />}
    </li>
  ));

const Sublist = (items) => {
  return (
    <ul className="usa-sidenav__sublist">
      <ListItems items={items} />
    </ul>
  );
};

const Sidenav = ({ items }) => (
  <aside className="usa-layout-docs-sidenav">
    <nav>
      <ul className="usa-sidenav">
        <ListItems items={items} />
      </ul>
    </nav>
  </aside>
);

export default Sidenav;
