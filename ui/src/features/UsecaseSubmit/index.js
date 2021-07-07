import React from "react";
import Card from "components/Card";
import Button from "features/Button";
import classnames from "classnames";

const Submit = ({className}) => {

  return <Card className={classnames({'US__usecase-submit-cta': true, [className]: className})} title="Do you have an AI project you would like to share?">
           <div className="padding-bottom-2">Showcase your successful use cases here!</div>
           <div>We'd love to speak to you about including it in our growing library.</div>
           <Button url="https://touchpoints.app.cloud.gov/touchpoints/6fccf8ad/submit" className="padding-bottom-2">Suggest A Use Case</Button>
           <div>You can also <a href="mailto:tts-ai@gsa.gov" className="text-secondary">email us</a>.</div>
         </Card>
           
           
};

export default Submit;
