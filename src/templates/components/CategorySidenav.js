import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Sidenav from 'components/Sidenav';

const ArticleSidenav = () => {
  const query = graphql`
    query {
      site {
        siteMetadata {
          navigation {
            text
            link
            items {
              text
              link
            }
          }
          secondaryLinks {
            text
            link
          }
        }
      }
    }
  `;

  const data = useStaticQuery(query);
  console.log('DATA', data);
};
