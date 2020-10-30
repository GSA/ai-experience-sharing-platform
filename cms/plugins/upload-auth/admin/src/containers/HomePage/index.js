/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <p>This plugin is not configurable. This plugin enables authenticated and
        unauthenticated media hosting via AWS S3. Media items prefixed
        with `public_` can be accessed without authetication. Media items
        without the `public_` prefix require authentication.
      </p>
    </div>
  );
};

export default memo(HomePage);
