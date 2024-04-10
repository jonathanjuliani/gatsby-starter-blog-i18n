import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { INavProps } from "@/definitions";
import { CloseMenu, HambugerMenu } from "./icons";
import { ProfilePicture } from "./images";
import SocialLinks from "./SocialLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import { ISite } from "@/definitions";

const resources = [
  { labelKey: "nav.home", path: "/" },
  { labelKey: "nav.about", path: "/about" },
];

const Nav: React.FC<INavProps> = (site: ISite) => {
  const [isOpen, setIsOpen] = useState(false);
  const { social } = site.siteMetadata;
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full top-0 z-10 bg-white">
      <div className="mx-auto max-w-screen-lg flex justify-between items-center px-4 py-4 sm:px-10 md:px-20 lg:px-28">
        <div className="flex flex-row items-center justify-center text-center">
          <Link to="/">
            <ProfilePicture />
            <h3 className="font-bold">Jon</h3>
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          {resources.map((resource, index) => (
            <Link key={`${resource.labelKey}-${index}`} to={resource.path}>
              {t(resource.labelKey)}
            </Link>
          ))}
          <SocialLinks social={social} />
          <LanguageSwitcher />
        </div>
        <div className="md:hidden">
          {isOpen ? (
            <button onClick={() => setIsOpen(!isOpen)}>
              <HambugerMenu />
            </button>
          ) : (
            <button onClick={() => setIsOpen(!isOpen)}>
              <CloseMenu />
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="top-0 left-0 z-10 h-screen w-full flex flex-col justify-center items-center">
          <ul className="space-y-8 p-2 text-center -mt-[115px]">
            {resources.map((resource, index) => (
              <li key={`${resource.labelKey}-${index}`} onClick={() => setIsOpen(false)}>
                <Link to={resource.path}>{t(resource.labelKey)}</Link>
              </li>
            ))}
            <SocialLinks social={social} />
            <LanguageSwitcher />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
