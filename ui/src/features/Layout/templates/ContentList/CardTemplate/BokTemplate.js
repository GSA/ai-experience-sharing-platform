import React from "react";
import PropTypes from "prop-types";
import Card from "components/Card";
import Button from "features/Button";

const BokTemplate = ({ title, description, slug }) => {
  return (
    <Card
      className="ai-bok"
      title={title}
      footer={<Button url={`/bok/${slug}`}>Begin Module</Button>}
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
