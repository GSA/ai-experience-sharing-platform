import React from "react";
import { useSelector } from "react-redux";
import Head from "routes/Head";
import Layout from "features/Layout";

const FourOhFour = () => {
  const data = useSelector((state) => state.site["404"]);

  return (
    <div className={`TxContent Tx__FourOhFour`}>
      <div className="usa-app__bg">
        <Head title={"404"} />
        <div className={`Tx__FourOhFour-content`}>
          <Layout items={data} />
        </div>
      </div>
    </div>
  );
};

export default FourOhFour;