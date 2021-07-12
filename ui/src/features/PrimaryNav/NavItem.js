import React from "react";
import classnames from "classnames";

const handleEvent = (e) => {
  /* istanbul ignore next */
  if (e.preventDefault) {
    e.preventDefault();
  }
};

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
  const { items = [], ...props } = data;

  const Item = renderLink;
  const Button = renderMenuItem;
  const Sub = renderSubItem;
  return (
    <li className="usa-nav__primary-item">
      {items.length ? (
        <>
          <Button
            {...props}
            id={id}
            onClick={(e) => {
              handleEvent(e);
              onMenuItemClick({ ...data, id });
            }}
            className={classnames({
              "usa-nav__link": true,
              "usa-current": items.reduce(
                /* istanbul ignore next */
                (acc, cur) => (cur.link === currentMenuItem ? acc + 1 : acc),
                0
              ),
            })}
          />
          <ul
            id={`extended-nav-section-${id}`}
            className="usa-accordion__content usa-nav__submenu"
            hidden={!isOpen}
          >
            {items.map((item, idx) => (
              <li key={idx} className="usa-nav__submenu-item">
                <Sub
                  {...item}
                  onClick={(e) => {
                    handleEvent(e);
                    onClick(item);
                  }}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Item
          {...props}
          className={classnames({
            "usa-nav__link": true,
            "usa-current": currentMenuItem.includes(data.link),
          })}
          onClick={(e) => {
            handleEvent(e);
            onClick(data);
          }}
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
  renderMenuItem: (props) => <button {...props} title={props.title}>{props.title}</button>,
  renderSubItem: (props) => (
    <a href={props.link} {...props}>
      {props.text}
    </a>
  ),
};

export default NavItem;
