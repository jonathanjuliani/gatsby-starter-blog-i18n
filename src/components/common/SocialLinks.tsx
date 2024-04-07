import React from "react";
import { getSocialIcon } from "./icons";

const SocialLinks = ({ social }: any) => {
  const SocialIcon = ({ social }: { social: string }) => getSocialIcon(social);

  return (
    <>
      {Object.keys(social).map((key, index) => (
        <a
          key={`${key}-${index}`}
          href={`${social[key as keyof typeof social] || ""}`}
          className="flex justify-center"
        >
          <SocialIcon social={key} />
        </a>
      ))}
    </>
  );
};

export default SocialLinks;
