import React from "react";
import PropTypes from "prop-types";
import Button from "features/Button";
import Date from "components/Date";
import Keymap from "features/Keymap";
import Card from "components/Card";

const UsecaseTemplate = (props) => {
  const metaDataList = [
    "metadataAiLifecycleStage",
    "metadataAiMlTechniques",
    "metadataDevelopmentPhase",
    "metadataEnvironment",
    "metadataProcurement",
    "metadataSubAgency",
    "metadataSpiiPiiUse",
  ];

  const { description, title, metadataAgency, publishedDate, slug } = props;
  return (
    <Card
      className="ai-uc"
      title={title}
      meta={metadataAgency}
      footer={metaDataList
        .filter((item) => Boolean(props[item]))
        .map((item) => (
          <span className="font-sans-xs text-underline display-inline-block margin-right-1">
            <Keymap value={props[item]} />
          </span>
        ))}
    >
      <div className="font-sans-xs">
        Published: <Date format="M/D/YYYY">{publishedDate}</Date>
      </div>
      <p>{description}</p>
      <Button url={`/usecases/${slug}`}>Read use case</Button>
      <span />
    </Card>
  );
};

UsecaseTemplate.propTypes = {};

export default UsecaseTemplate;
