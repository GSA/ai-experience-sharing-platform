import React from 'react';
import { Link } from 'gatsby';

const ListItems = ({ items = [] }) =>
  items.map((item) => (
    <>
      <div>
        <a href={item.url}>{item.title}</a>
      </div>
      {item.items && <Sublist items={item.items} />}
    </>
  ));

const Sublist = ({ items }) => <ListItems items={items} />;

const ContentsNav = ({ items }) => <ListItems items={items} />;

export default ContentsNav;
