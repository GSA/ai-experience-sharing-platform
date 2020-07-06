import { graphql } from 'gatsby';

export const fragments = graphql`
  fragment usecaseFx on MdxFrontmatter {
    title
    date
    participant
    patterns
    solutions
    tags
  }

  fragment resourceFx on MdxFrontmatter {
    title
    date
    category
    tags
  }
`;
