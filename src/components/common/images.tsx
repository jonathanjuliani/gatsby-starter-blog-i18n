import React from "react";
import { ImageFormat, StaticImage } from "gatsby-plugin-image";

const acceptedFormats: ImageFormat[] = ["auto", "webp", "avif", "png"];

const BrazilFlag = () => (
  <StaticImage
    layout="fixed"
    formats={acceptedFormats}
    src="../../images/pt.png"
    width={30}
    height={30}
    quality={100}
    alt="brazil flag"
  />
);

const UnitedStatesFlag = () => (
  <StaticImage
    layout="fixed"
    formats={acceptedFormats}
    src="../../images/us.png"
    width={30}
    height={30}
    quality={100}
    alt="united states flag"
  />
);

export const getFlagImages = (lng: string) => {
  const flags: { [key: string]: React.JSX.Element } = {
    pt: <BrazilFlag />,
    en: <UnitedStatesFlag />,
  };

  return flags[lng] || undefined;
};

export const ProfilePicture = () => (
  <StaticImage
    className="rounded-full overflow-hidden"
    layout="fixed"
    formats={acceptedFormats}
    src="../../images/profile-pic.jpeg"
    width={60}
    height={60}
    quality={100}
    imgStyle={{ borderRadius: "100%" }}
    alt="Profile picture"
  />
);
