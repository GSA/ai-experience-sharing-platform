import React, { useState } from "react";
import Button from "features/Button"

const LoginMoreInfo = ({ children }) => {

  const [showInfo, setShowInfo] = useState(false);

  const style = {};
  if (!showInfo) {
    style.display = 'none';
  }

  const handleClick = () => setShowInfo(!showInfo);
  
  return <>
           <Button onClick={handleClick} className="usa-button--unstyled">More Information</Button>
           <div className="usa-summary-box" style={style}>
             {children}
           </div>
         </>;
};

LoginMoreInfo.propTypes = {
};

export default LoginMoreInfo;
