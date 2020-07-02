import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Primary from './primary';

const Taxonomy = ({ pageContext, data }) => {
  const { slug, type } = pageContext;
  const { edges, totalCount } = data.allMdx;

  const taxTitle = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } with the ${type} "${slug}"`;

  return (
    <Primary>
      <div>
        <h1>{taxTitle}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { title } = node.frontmatter;
            return (
              <li key={slug}>
                <Link to={`${type}/${slug}`}>{title}</Link>
              </li>
            );
          })}
        </ul>
        <Link to="/tags">All {type}</Link>
      </div>
    </Primary>
  );
};
Taxonomy.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};
export default Taxonomy;
