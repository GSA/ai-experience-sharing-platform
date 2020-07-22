import React from "react";
import { Link } from "react-router-dom";
import Date from "components/Date";

const ArticleExcerpt = ({ title, date, path, excerpt }) => {
  return (
    <div className="ArticleExcerpt">
      <h5 className="ArticleExcerpt__title">
        <Link to={path}>{title}</Link>
      </h5>
      <div className="ArticleExcerpt__date">
        Published <Date>{date}</Date>
      </div>
      <div>{excerpt}</div>
    </div>
  );
};

export default ArticleExcerpt;
