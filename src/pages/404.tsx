import * as React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { PageProps } from "@/definitions";
import { Layout, Seo } from "../components/common";

const NotFoundPage = ({ data, location }: PageProps) => {
  const siteTitle = data.site.siteMetadata?.title || `Jon Blog Starter`;
  const { t } = useTranslation();

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={siteTitle} />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="my-8"
          width="300"
          height="200"
          viewBox="0 0 600 400"
        >
          <text
            x="50%"
            y="50%"
            text-anchor="middle"
            dominant-baseline="central"
            font-size="75"
            font-family="Arial"
            fill="gray"
          >
            404
          </text>
        </svg>
        <p className="text-xl mt-4">{t("notFound.message")}</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query ($language: String) {
    site {
      siteMetadata {
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
