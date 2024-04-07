import * as React from "react";
import { graphql } from "gatsby";
import { PageProps } from "@/definitions";
import { Layout, Seo } from "../components/common";
import { useTranslation } from "gatsby-plugin-react-i18next";

const AboutPage = ({ data, location }: PageProps) => {
  const siteTitle = data.site.siteMetadata?.title || `Jon Blog Starter`;
  const { t } = useTranslation();

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={siteTitle} />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <p className="text-xl mt-4">{t("about.message")}</p>
      </div>
    </Layout>
  );
};

export default AboutPage;

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
