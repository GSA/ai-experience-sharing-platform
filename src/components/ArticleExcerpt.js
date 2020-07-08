import React from 'react';
import Content from 'components/Content';
import Button from 'components/Button';

const ArticleExcerpt = ({ title, date, path, excerpt }) => {
  return (
    <div className="ArticleExcerpt">
      <Button className="ArticleExcerpt__title" variant="link" url={path}>
        <h5>{title}</h5>
      </Button>
      <div className="ArticleExcerpt__date">Published {date}</div>
      <Content chunks={1} chunkSize={8} />
    </div>
  );
};

export default ArticleExcerpt;
