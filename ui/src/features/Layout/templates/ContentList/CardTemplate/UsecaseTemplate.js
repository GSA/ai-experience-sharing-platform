import React from "react";
import { useDispatch } from "react-redux";
import { setListFilter } from "app/ContentModule";
import PropTypes from "prop-types";
import Button from "features/Button";
import Keymap from "features/Keymap";
import Card from "components/Card";
import Date from "components/Date";
import Link from "features/Link";

const UsecaseTemplate = (props) => {
  const dispatch = useDispatch();
  const metaDataList = {
    "metadataAgency": "enumeration",
    "metadataAiLifecycleStage": "enumeration",
    "metadataAiMlTechniques": "enumeration",
    "metadataDevelopmentPhase": "enumeration",
    "metadataEnvironment": "enumeration",
    "metadataProcurement": "enumeration",
    "metadataSpiiPiiUse": "boolean",
  };
  const metaDataValueBlockList = [
    'none',
    'other',
    'notApplicable',
  ];

  const { description, title, metadataAgency, publishedDate, slug } = props;

  const handleClick = (props) => {
    dispatch(setListFilter(props));
  };

  const url = `/usecases/${slug}`;

  return (
    <Card
      className="ai-uc"
      title={<Link to={url}>{title}</Link>}
      meta={metadataAgency}
    >
      <div className="font-sans-sm">
        Published: <Date format="short">{publishedDate}</Date>
        </div>
      <p className="font-sans-md">{description}</p>
      <Button url={url}>Read use case</Button>
      <p className="ai-uc__meta-container">
        {Object.keys(metaDataList)
          .filter((item) => Boolean(props[item]) && Boolean(props[item].length > 0))
          .filter(item => !metaDataValueBlockList.includes(props[item]))
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
