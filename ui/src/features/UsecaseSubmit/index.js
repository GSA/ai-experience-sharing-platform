import React from "react";
import Card from "components/Card";
import Button from "features/Button";
import classnames from "classnames";

const Submit = ({className}) => {

  return <Card className={classnames({'US__usecase-submit-cta': true, [className]: className})} title="Do you have an AI project you would like to share?">
           We'd love to speak to you about including it in our growing library.
           <Button url="/submit">Submit A Use Case</Button>
         </Card>
           
           
};

export default Submit;