import React from "react";
import PropTypes from "prop-types";
import Button from "features/Button";
import Keymap from "features/Keymap";
import Card from "components/Card";

const UsecaseTemplate = (props) => {
  const metaDataList = [
    "metadataAgency",
    "metadataAiLifecycleStage",
    "metadataAiMlTechniques",
    "metadataDevelopmentPhase",
    "metadataEnvironment",
    "metadataProcurement",
    "metadataSubAgency",
    "metadataSpiiPiiUse",
  ];

  const { description, title, /*publishedDate,*/ slug } = props;
  return (
    <Card
      className="ai-uc"
      title={title}
    >
      {/*<div className="font-sans-2xs">
        Published: <Date format="M/D/YYYY">{publishedDate}</Date>
        </div>*/}
      <p>{description}</p>
      <Button url={`/usecases/${slug}`}>Read use case</Button>
      <p>
        {metaDataList
          .filter((item) => Boolean(props[item]))
          .map((item, i) => (
            <span key={`ai-uc-${i}`} className="ai-uc__meta">
              <Keymap value={props[item]} />
            </span>
          ))}
      </p>

      <span />
    </Card>
  );
};

UsecaseTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  metadataAgency: PropTypes.string,
  publishedDate: PropTypes.string,
  slug: PropTypes.string,
};

export default UsecaseTemplate;
