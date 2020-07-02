import React from 'react';
import PropTypes from 'prop-types';
import Primary from './primary';
import Article from 'components/ArticleExcerpt';

const Taxonomy = ({ pageContext, data, title }) => {
  const { slug, type } = pageContext;
  const { edges } = data.allMdx;

  return (
    <Primary title={`${type} - ${slug}`}>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-12">
            <div className="grid-row align-items-center padding-bottom-4">
              <div className="grid-col-8">
                <h3 className="margin-0">{title}</h3>
              </div>
              <div className="grid-col-4" style={{ textAlign: 'right' }}>
                <label
                  className="usa-labelmargin-0 display-inline-block"
                  for="sort"
                >
                  Sort By:
                </label>
                <select
                  className="usa-select display-inline-block padding-y-0 margin-0 border-none width-auto height-auto"
                  style={{ border: 'none' }}
                  name="options"
                  id="sort"
                >
                  <option value="value1">Publish Date (newest)</option>
                  <option value="value2">Option B</option>
                  <option value="value3">Option C</option>
                </select>
              </div>
            </div>

            {edges.map((edge) => {
              const { node } = edge;
              return (
                <div className="margin-bottom-5">
                  <Article
                    title={node.frontmatter.title}
                    date={node.frontmatter.date}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Primary>
  );
};
Taxonomy.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};
export default Taxonomy;
