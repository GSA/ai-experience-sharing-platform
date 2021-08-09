import React from "react";
import PropTypes from "prop-types";
import Date from "components/Date";
import { useSelector, useDispatch } from "react-redux";
import { name as siteName } from "app/SiteModule";
import { cms } from "utils/cms";
import Link from "features/Link";
import { useHistory } from "react-router-dom";

/* eslint-disable */
const Format = ({ name, value }) => {
  if (cms.dates[name]) {
    return <Date format="long">{value}</Date>;
  } else if ( typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  
  return Array.isArray(value) ? value.join(", ") : value;
};

const omitLinks = ['publishedDate'];

const Details = ({ items }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const site = useSelector((state) => state[siteName]);

  const { keymaps = {}, filters } = site;
  const mapKeys = keymaps !== null ? keymaps : {};

  return (
    <div>
      <div className="use-case-details panel">
        <h2>Details</h2>
        {cms.usecaseDetailsOrder.map((detailKey, i) => {
          if (!!items[detailKey] && detailKey in mapKeys) {
            const key = detailKey;
            const value = items[detailKey];
            const title = mapKeys[key] || key;
            if (Array.isArray(value)) {
              const texts = value.map(v => mapKeys[v.metadata] || Format({name: key, value: v.metadata}));
              return <div key={i}>
                     <dt>{title}</dt>
                     <dd>
                       {texts.map((text, i) => {
                         return <span><Link key={i} to={`/usecases?${key}.metadata=${value[i].metadata}`}>{text}</Link> </span>})}
                     </dd>
                   </div>;
            } else {
              const text = mapKeys[value] || Format({name: key, value});
              return <div key={i}>
                     <dt>{title}</dt>
                     <dd>
                       {omitLinks.some((l) => l === key) ? <>{text}</> : <Link to={`/usecases?${key}=${value}`}>{text}</Link>}
                     </dd>
                   </div>;
            }
          }
          return;
        })}
      </div>
      {items.related && items.related.length ? (
        <div className="use-case-related">
          <h4>Related Use Cases</h4>
          <ul>
            {items.related && items.related.map((relatedItem, i) => {
              return <li key={i}>
                       <Link to={relatedItem.url}>{relatedItem.text}</Link>
                     </li>;
            })}
          </ul>
        </div>) : null}
    </div>
  );
};

Details.defaultProps = {
  id: "",
  title: "",
  items: [],
};

Details.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

export default Details;
