import React from "react";
import Primary from "templates/layouts/primary";
import Mdx from "components/Mdx";

const ContentPage = ({
  data: {
    mdx: {
      body,
      tableOfContents: { items: contents = [] } = {},
      frontmatter: { title } = {},
    } = {},
  } = {},
}) => {
  return (
    <Primary title={title}>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-12">
            <h1>{title}</h1>
            <Mdx>{body}</Mdx>
          </div>
        </div>
      </div>
    </Primary>
  );
};

export default ContentPage;
