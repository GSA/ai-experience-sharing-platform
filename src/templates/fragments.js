import { graphql } from 'gatsby';

export const fragments = graphql`
  fragment NodeFields on MdxFields {
    name
    sourceName
    pagePath
  }

  fragment UseCaseFx on MdxFrontmatter {
    title
    date
    participant
    patterns
    solutions
    tags
  }

  fragment ResourceFx on MdxFrontmatter {
    title
    date
    category
    tags
  }

  fragment Resource on Query {
    resource: allMdx(filter: { fields: { sourceName: { eq: $type } } }) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...ResourceFx
          }
          fields {
            ...NodeFields
          }
          body
        }
      }
    }
  }

  fragment ResourceCategory on Query {
    resourcecategory: allMdx(
      filter: {
        fields: { sourceName: { eq: $type } }
        frontmatter: { category: { eq: $name } }
      }
    ) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...ResourceFx
          }
          fields {
            ...NodeFields
          }
        }
      }
    }
  }

  fragment ResourceTag on Query {
    resourcetags: allMdx(
      filter: {
        fields: { sourceName: { eq: $type } }
        frontmatter: { tags: { in: [$name] } }
      }
    ) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...ResourceFx
          }
          fields {
            ...NodeFields
          }
        }
      }
    }
  }

  fragment UseCase on Query {
    usecase: allMdx(filter: { fields: { sourceName: { eq: $type } } }) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...ResourceFx
          }
          fields {
            ...NodeFields
          }
        }
      }
    }
  }

  fragment UseCaseParticipant on Query {
    usecaseparticipant: allMdx(
      filter: {
        fields: { sourceName: { eq: $type } }
        frontmatter: { participant: { eq: $name } }
      }
    ) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...UseCaseFx
          }
          fields {
            ...NodeFields
          }
        }
      }
    }
  }

  fragment UseCasePattern on Query {
    usecasepattern: allMdx(
      filter: {
        fields: { sourceName: { eq: $type } }
        frontmatter: { participant: { eq: $name } }
      }
    ) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...UseCaseFx
          }
          fields {
            ...NodeFields
          }
        }
      }
    }
  }

  fragment UseCaseSolution on Query {
    usecasesolution: allMdx(
      filter: {
        fields: { sourceName: { eq: $type } }
        frontmatter: { participant: { eq: $name } }
      }
    ) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...UseCaseFx
          }
          fields {
            ...NodeFields
          }
        }
      }
    }
  }

  fragment UseCaseTag on Query {
    usecasetags: allMdx(
      filter: {
        fields: { sourceName: { eq: $type } }
        frontmatter: { tags: { in: [$name] } }
      }
    ) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...UseCaseFx
          }
          fields {
            ...NodeFields
          }
        }
      }
    }
  }

  fragment UseCaseFeatured on Query {
    usecasefeatured: allMdx(
      filter: {
        frontmatter: { featured: { eq: $featured } }
        fields: { sourceName: { eq: $type } }
      }
    ) {
      totalCount
      edges {
        node {
          body
          frontmatter {
            ...UseCaseFx
          }
          fields {
            ...NodeFields
          }
        }
      }
    }
  }
`;
