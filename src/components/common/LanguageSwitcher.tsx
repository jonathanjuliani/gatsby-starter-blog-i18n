import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import { getFlagImages } from "./images";

const LanguageSwitcher = () => {
  const { languages, changeLanguage, language } = useI18next();
  const Flag = ({ lng }: any) => getFlagImages(lng);

  return (
    <ul className="languages">
      {languages.map((lng) => (
        <li
          key={lng}
          className="flex space-x-2 justify-evenly items-center hover:cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            changeLanguage(lng);
          }}
        >
          <p className={`text-sm ${language === lng ? "underline font-bold" : ""}`}>{lng.toLocaleUpperCase()}</p>
          <Flag lng={lng} />
        </li>
      ))}
    </ul>
  );
};

export default LanguageSwitcher;
