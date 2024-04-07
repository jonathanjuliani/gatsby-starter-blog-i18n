/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { ISite } from "@/definitions";

type MetaProps = JSX.IntrinsicElements["meta"];

const Seo: React.FC<SEOProps> = ({ description, lang, meta, title, image }) => {
  const queryResponse: { site: ISite } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const { site } = queryResponse;

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  const metaProps: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.social?.twitter || ``,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={metaProps.concat(meta || [])}
    >
      {image && [
        <meta property="og:image" content={image.images.fallback?.src} key={`og:image:${image}`} />,
        <meta
          name="twitter:image"
          content={image.images.fallback?.src}
          key={`twitter:image:${image}`}
        />,
      ]}
    </Helmet>
  );
};

interface SEOProps {
  description?: string;
  lang?: string;
  title: string;
  meta?: MetaProps[];
  image?: IGatsbyImageData;
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

export default Seo;
