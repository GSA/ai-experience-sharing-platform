import React from "react";
import PropTypes from "prop-types";
import Card from "components/Card";
import Button from "features/Button";
import Link from "features/Link";

const BokTemplate = ({ title, description, slug }) => {
  const url = `/bok/${slug}`;
  return (
    <Card
      className="ai-bok"
      title={<Link to={url}>{title}</Link>}
      footer={<Button url={url}>Learn more</Button>}
    >
      <p>{description}</p>
    </Card>
  );
};

BokTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
};

export default BokTemplate;
