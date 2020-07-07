import React from 'react';
import Content from 'components/Content';

const ArticleExcerpt = ({ title, date, path, excerpt }) => {
  return (
    <div className="ArticleExcerpt">
      <a className="ArticleExcerpt__title" variant="link" href={path}>
        <h5>{title}</h5>
      </a>
      <div className="ArticleExcerpt__date">Published {date}</div>
      <Content chunks={1} chunkSize={8} />
    </div>
  );
};

export default ArticleExcerpt;
