import * as React from "react";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { PageProps } from "@/definitions";
import { Layout, Seo } from "../common";

const BlogPostTemplate: React.FC<PageProps> = ({ data, location }) => {
  const { t } = useTranslation();
  const { previous, next } = data;
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const image = post.frontmatter.image ? getImage(post.frontmatter.image) : undefined;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image}
      />
      <article className="flex flex-col w-full" itemScope itemType="http://schema.org/Article">
        <header>
          <h1
            className="font-black text-skin-fg text-2xl md:text-4xl mt-8 mb-2"
            itemProp="headline"
          >
            {post.frontmatter.title}
          </h1>
          <div className="flex justify-between">
            <p className="text-skin-fg text-xl pb-12">{post.frontmatter.date}</p>
            <p className="text-skin-fg pb-12 hover:underline">
              <Link to="/">{`← ${t("buttons.back")}`}</Link>
            </p>
          </div>
        </header>
        <main className="flex w-full max-w-screen-lg">
          {post.html ? (
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
              className="prose prose-slate w-full max-w-screen-lg"
            />
          ) : (
            <>Ops...Not found, try again later.</>
          )}
        </main>
      </article>
      <nav>
        <ul className="grid grid-cols-2 flex-wrap justify-stretch text-lg py-8">
          {previous ? (
            <li className="w-full justify-self-center hover:border">
              <Link to={previous.fields.path} rel="prev">
                <div className="flex flex-col items-center p-8">
                  <p className="pl-2">{previous.frontmatter.title}</p>
                  <p className="pr-2">{"←"}</p>
                </div>
              </Link>
            </li>
          ) : (
            <li></li>
          )}
          {next ? (
            <li className="w-full justify-self-center hover:border">
              <Link to={next.fields.path} rel="next">
                <div className="flex flex-col items-center p-8">
                  <p className="pr-2">{next.frontmatter.title}</p>
                  <p className="pr-2">{"→"}</p>
                </div>
              </Link>
            </li>
          ) : (
            <li></li>
          )}
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String
    $language: String
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug }, language: { eq: $language } }) {
      excerpt(pruneLength: 160)
      html
      body
      rawMarkdownBody
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(width: 1200, layout: CONSTRAINED)
          }
        }
      }
    }
    previous: markdownRemark(
      frontmatter: { slug: { eq: $previousPostSlug }, language: { eq: $language } }
    ) {
      fields {
        slug
        path
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(
      frontmatter: { slug: { eq: $nextPostSlug }, language: { eq: $language } }
    ) {
      fields {
        slug
        path
      }
      frontmatter {
        title
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
