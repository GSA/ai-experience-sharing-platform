import React from "react";
import { Link } from "react-router-dom";

const ArticleExcerpt = ({ title, date, path, excerpt }) => {
  return (
    <div className="ArticleExcerpt">
      <Link className="ArticleExcerpt__title" to={path}>
        <h5>{title}</h5>
      </Link>
      <div className="ArticleExcerpt__date">Published {date}</div>
      <div>{excerpt}</div>
    </div>
  );
};

export default ArticleExcerpt;
