import React, { ReactNode, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Nav from "./Nav";
import { ISite } from "@/definitions";

interface LayoutProps {
  location: Location;
  title: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const { site }: { site: ISite } = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            linkedin
            github
            twitter
          }
        }
      }
    }
  `);

  useEffect(() => {
    document.getElementById("content")?.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav isRootPath={isRootPath} site={site} />
      <main className="flex flex-col mx-auto max-w-screen-lg pt-[115px] px-4 sm:px-10 md:px-20 lg:px-28">
        {children}
      </main>
      <footer className="bg-pastel-blue bg-opacity-70 from-skin-primary to-skin-secondary transition-colors">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-10 md:px-20 lg:px-28">
          <p className="text-center text-sm">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
