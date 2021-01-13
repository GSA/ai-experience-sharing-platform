import React from "react";
import classnames from "classnames";

const NavItem = ({
  data,
  onMenuItemClick,
  onClick,
  id,
  isOpen,
  currentMenuItem,
  renderLink,
  renderMenuItem,
  renderSubItem,
}) => {
  const { items = [] } = data;

  const Link = renderLink;
  const Button = renderMenuItem;
  const Sub = renderSubItem;
  return (
    <li className="usa-nav__primary-item">
      {items.length ? (
        <>
          <Button
            {...data}
            id={id}
            onClick={onMenuItemClick}
            className={classnames({
              "usa-nav__link": true,
              "usa-accordion__button": true,
              "usa-current": items.reduce(
                (acc, cur) => (cur.link === currentMenuItem ? acc + 1 : acc),
                0
              ),
            })}
          >
            {data.text}
          </Button>
          <ul
            id={`extended-nav-section-${id}`}
            className="usa-accordion__content usa-nav__submenu"
            hidden={!isOpen}
          >
            {items.map((item, idx) => (
              <li key={idx} className="usa-nav__submenu-item">
                <Sub {...item} isCurrent={currentMenuItem} onClick={onClick} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Link
          {...data}
          className={classnames({
            "usa-nav__link": true,
            "usa-current": currentMenuItem.includes(data.link),
          })}
        />
      )}
    </li>
  );
};

NavItem.defaultProps = {
  data: {},
  isOpen: null,
  renderLink: (props) => (
    <a href={props.link} {...props}>
      {props.text}
    </a>
  ),
  renderMenuItem: (props) => <button {...props}>{props.text}</button>,
  renderSubItem: (props) => (
    <a href={props.link} {...props}>
      {props.text}
    </a>
  ),
};

export default NavItem;
