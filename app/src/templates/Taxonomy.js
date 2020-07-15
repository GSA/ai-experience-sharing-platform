import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Primary from './primary';
import Article from 'components/ArticleExcerpt';
import Login from 'templates/components/Login';

export const Taxonomy = ({ pageContext }) => {
  const { name, field, type, dataKey } = pageContext;
  const [data, setData] = useState({});
  useEffect(() => {
    const response = fetch('/library.json')
      .then((response) => response.text())
      .then((text) => {
        const raw = JSON.parse(text);
        const json = raw.data[dataKey];

        if (JSON.stringify(json) !== JSON.stringify(data)) {
          setData((state) => ({ ...state, ...json }));
        }
      });
  });
  const edges = 'edges' in data ? data.edges : [];
  const title = `${type}${field ? ` / ${field}` : ''}${
    name ? ` / ${name}` : ''
  }`;
  return (
    <Primary title={title}>
      <Login>
        <div className="grid-container">
          <div className="grid-row margin-top-4">
            <div className="grid-col-12">
              <div className="grid-row align-items-center padding-bottom-4">
                <div className="grid-col-8">
                  <h3 className="margin-0">{title}</h3>
                </div>
                <div className="grid-col-4" style={{ textAlign: 'right' }}>
                  <label
                    className="usa-labelmargin-0 display-inline-block"
                    htmlFor="sort"
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

              {edges.map((edge, i) => {
                const { node = {} } = edge;
                return (
                  <div key={`article-${i}`} className="margin-bottom-5">
                    <Article
                      title={node.frontmatter.title}
                      date={node.frontmatter.date}
                      path={node.fields.pagePath}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Login>
    </Primary>
  );
};
Taxonomy.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query(
    $type: String
    $name: String
    $resource: Boolean = false
    $resourcecategory: Boolean = false
    $resourcetags: Boolean = false
    $usecase: Boolean = false
    $usecaseparticipant: Boolean = false
    $usecasepattern: Boolean = false
    $usecasesolution: Boolean = false
    $usecasetags: Boolean = false
  ) {
    ...Resource @include(if: $resource)
    ...ResourceCategory @include(if: $resourcecategory)
    ...ResourceTag @include(if: $resourcetags)
    ...UseCase @include(if: $usecase)
    ...UseCaseParticipant @include(if: $usecaseparticipant)
    ...UseCasePattern @include(if: $usecasepattern)
    ...UseCaseSolution @include(if: $usecasesolution)
    ...UseCaseTag @include(if: $usecasetags)
  }
`;

export default Taxonomy;
