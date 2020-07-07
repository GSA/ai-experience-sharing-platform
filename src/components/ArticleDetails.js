import React from 'react';
import PropTypes from 'prop-types';

const ArticleDetails = ({ id, title, items }) => {
  console.log(items);
  return (
    <div className="ArticleDetails">
      {title && (
        <h4 id={id} className="ArticleDetails__title">
          {title}
        </h4>
      )}
      {Object.entries(items).map(([key, value]) => (
        <div key={key} className="ArticleDetails__item">
          <span className="ArticleDetails__item-title">{key}</span>
          <span className="ArticleDetails__text">
            {Array.isArray(value) ? value.join(', ') : value}
          </span>
        </div>
      ))}
    </div>
  );
};

ArticleDetails.propTypes = {};

export default ArticleDetails;
