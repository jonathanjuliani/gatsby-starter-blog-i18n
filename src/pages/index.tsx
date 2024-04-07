import * as React from "react";
import { graphql } from "gatsby";
import { PageProps } from "@/definitions";
import { Layout, Seo } from "../components/common";
import { BlogContainer } from "../components/blog";

const IndexPage: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Jon Blog Starter`;
  const posts = data.allMarkdownRemark.nodes;
  const langs = data.locales.edges;
  const language = langs.length > 0 ? langs[0].node.language : "pt";

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={siteTitle} lang={language} />
      <BlogContainer posts={posts} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query ($language: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { language: { eq: $language } } }
    ) {
      nodes {
        id
        excerpt
        fields {
          slug
          path
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          description
          language
          image {
            publicURL
            childImageSharp {
              gatsbyImageData(width: 1200, layout: CONSTRAINED)
            }
          }
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
