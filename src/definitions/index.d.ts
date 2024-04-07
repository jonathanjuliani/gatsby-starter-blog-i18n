import { Location } from "history";

export interface ButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  label?: string;
  isLarge?: boolean;
}

interface EmptyProps {}

interface PageProps {
  data: {
    mdx: INode;
    markdownRemark: INode;
    previous: INode;
    next: INode;
    site: ISite;
    allMarkdownRemark: {
      nodes: INode[];
    };
    locales: {
      edges: {
        node: {
          ns: string;
          data: string;
          language: string;
        };
      }[];
    };
  };
  location: Location;
}

interface ISite {
  siteMetadata: {
    title: string;
    description: string;
    author: {
      name: string;
      summary: string;
    };
    social: {
      twitter: string;
      linkedin: string;
      github: string;
    };
  };
}

export interface IEdge {
  node: INode;
}

interface INode {
  excerpt: string;
  body: string;
  html?: string;
  rawMarkdownBody: string;
  fields: {
    slug: string;
    path: string;
  };
  frontmatter: {
    date: string;
    title: string;
    tags?: string;
    description: string;
    image?: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
      publicURL: string;
    };
  };
}

interface INavProps {
  isRootPath: boolean;
  site: ISite;
}
