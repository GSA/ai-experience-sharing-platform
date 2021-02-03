import React from "react";
import PropTypes from "prop-types";
import Mdx from "features/Mdx";
import UsecaseTemplate from "./UsecaseTemplate";
import BokTemplate from "./BokTemplate";

const CardTemplate = ({ template, data, markdown }) => {
  if (template === "usecase") {
    return <UsecaseTemplate {...data} />;
  }
  if (template === "bok") {
    return <BokTemplate {...data} />;
  }
  if (template === "markdown") {
    return <Mdx scope={data}>{markdown}</Mdx>;
  }
  return <div>{data.title}</div>;
};

CardTemplate.propTypes = {
  template: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default CardTemplate;
