import React from "react";
import { Link } from "react-router-dom";
import Date from "components/Date";

const ArticleExcerpt = ({ title, date, path, excerpt }) => {
  return (
    <div className="ArticleExcerpt">
      <Link className="ArticleExcerpt__title" to={path}>
        <h5>{title}</h5>
      </Link>
      <div className="ArticleExcerpt__date">
        Published <Date>{date}</Date>
      </div>
      <div>{excerpt}</div>
    </div>
  );
};

export default ArticleExcerpt;
