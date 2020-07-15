import React from 'react';
import Content from 'components/Content';
import { Link } from 'react-router-dom';

const ArticleExcerpt = ({ title, date, path, excerpt }) => {
  console.log(path);
  return (
    <div className="ArticleExcerpt">
      <Link className="ArticleExcerpt__title" to={path}>
        <h5>{title}</h5>
      </Link>
      <div className="ArticleExcerpt__date">Published {date}</div>
      <Content chunks={1} chunkSize={8} />
    </div>
  );
};

export default ArticleExcerpt;
