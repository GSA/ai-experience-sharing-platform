import React from "react";
import Button from "components/Button";
import Card from "components/Card";
import Content from "components/Content";
import Hero from "components/Hero";

const MockCard = ({ title, url }) => (
  <Card
    className="MockCard"
    title={title}
    excerpt={<Content chunks={1} chunkSize={4} lineSize={10} />}
    footer={
      <Button url={url} fullwidth>
        View
      </Button>
    }
  />
);

const Homepage = ({ data }) => {
  const data = [];

  return (
    <>
      <div className="grid-container">
        <div className="grid-row use-case-header">
          <div className="grid-col-6 use-case-header__title">
            Featured Use Cases
          </div>
          <div className="grid-col-6 use-case-header__link">
            <Button url="/library/usecase" variant="link">
                View All Use Cases
            </Button>
          </div>
        </div>

        <div className="grid-row grid-gap-6 padding-x-8">
          {data.map(({ item }) => (
            <div key={item.name} className="grid-col-6 padding-bottom-4">
              <MockCard title={item.title} url={item.path} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
