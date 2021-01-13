import React from "react";
import Link from "features/Link";
import Icon from "components/Icon";
import PropTypes from "prop-types";

const Links = ({ data }) => {
  return (
    Array.isArray(data) &&
    data.length && (
      <div className="TxLinks">
        <h3>Learn more</h3>
        <ul>
          {data.map((item, i) => {
            return (
              <li key={`TxLinks__item-${i}`} className="TxLinks__item">
                <Link url={item.link}>
                  {item.text}
                  <Icon className="margin-left-1" icon="external-link-alt" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

Links.defaultProps = {
  data: [],
};

Links.propTypes = {
  data: PropTypes.array,
};

export default Links;
