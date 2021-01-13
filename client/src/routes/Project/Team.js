import React from "react";
import Icon from "components/Icon";
import PropTypes from "prop-types";

const Team = ({ data }) => {
  return data.submitter || data.members ? (
    <div className="TxTeam">
      <h3>Team</h3>
      <ul>
        <li>
          <div className="TxTeam__icon">
            <Icon icon="user" className="margin-right-1" />
          </div>
          <span className="TxTeam__submitter">
            <strong>Idea submitter: </strong> {data.submitter}
          </span>
        </li>
        <li>
          <div className="TxTeam__icon">
            <Icon icon="users" className="margin-right-1" />
          </div>
          <span className="TxTeam__members">
            <strong>Team: </strong> {data.members}
          </span>
        </li>
      </ul>
    </div>
  ) : null;
};

Team.defaultProps = {
  data: {},
};
Team.propTypes = {
  data: PropTypes.object,
};

export default Team;
