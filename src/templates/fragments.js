import { graphql } from 'gatsby';

export const fragments = graphql`
  fragment usecaseFields on MdxFrontmatter {
    title
    date
    participant
    patterns
    solutions
    tags
  }

  fragment resourceFields on MdxFrontmatter {
    title
    date
    category
    tags
  }
`;
