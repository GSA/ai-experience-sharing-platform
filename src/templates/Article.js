import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Primary from "templates/layouts/primary";
import Mdx from "components/Mdx";
import ArticleDetails from "components/ArticleDetails";
import ContentNav from "components/ContentsNav";

export const Article = ({ pageContext }) => {
  const { name = "" } = useParams();
  const { dataKey } = pageContext;
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("/library.json")
      .then((response) => response.text())
      .then((text) => {
        const raw = JSON.parse(text);
        const items = raw.data[dataKey].edges.map((item) => item.node);
        const json = items.find((item) => item.fields.name === name);

        if (JSON.stringify(json) !== JSON.stringify(data)) {
          setData((state) => ({ ...state, ...json }));
        }
      });
  });
  const {
    body,
    tableOfContents: { items: contents = [] } = {},
    frontmatter: { title = "", ...details } = {},
  } = data;
  if (!body) {
    return <h1>LOADING</h1>;
  }
  return (
    <Primary title={title}>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-2">
            <h4>Sections</h4>
            <ContentNav items={contents} />
          </div>
          <div className="grid-col-8 padding-right-4">
            <h1>{title}</h1>
            {body && <Mdx>{body}</Mdx>}
          </div>
          <div className="grid-col-2">
            <ArticleDetails title="Details" items={details} />
          </div>
        </div>
      </div>
    </Primary>
  );
};

export default Article;
