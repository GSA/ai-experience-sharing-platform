import React from "react";
import { useDispatch } from "react-redux";
import { setListFilter } from "app/ContentModule";
import PropTypes from "prop-types";
import Button from "features/Button";
import Keymap from "features/Keymap";
import Card from "components/Card";
import Date from "components/Date";

const UsecaseTemplate = (props) => {
  const dispatch = useDispatch();
  const metaDataList = {
    "metadataAiLifecycleStage": "enumeration",
    "metadataAiMlTechniques": "enumeration",
    "metadataDevelopmentPhase": "enumeration",
    "metadataEnvironment": "enumeration",
    "metadataProcurement": "enumeration",
    "metadataSubAgency": "enumeration",
    "metadataSpiiPiiUse": "boolean",
  };

  const { description, title, metadataAgency, publishedDate, slug } = props;

  const handleClick = (props) => {
    dispatch(setListFilter(props));
  };
  return (
    <Card
      className="ai-uc"
      title={title}
      meta={metadataAgency}
    >
      <div className="font-sans-2xs">
        Published: <Date format="short">{publishedDate}</Date>
        </div>
      <p>{description}</p>
      <Button url={`/usecases/${slug}`}>Read use case</Button>
      <p>
        {Object.keys(metaDataList)
          .filter((item) => Boolean(props[item]))
          .map((item, i) => (
            <Button
              onClick={(e) => handleClick({
                value: props[item],
                name: item,
                type: metaDataList[item],
                operand: 'eq'})}
              key={`ai-uc-${i}`}
              className="ai-uc__meta"
              variant="link"
            >
              <Keymap value={props[item]} />
            </Button>
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
