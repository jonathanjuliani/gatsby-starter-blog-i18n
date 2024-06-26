import React from "react";
import { ButtonProps } from "@/definitions";

const IconButton: React.FC<ButtonProps> = ({ href, label, children, isLarge }) => {
  const sizeClasses = isLarge ? "p-1 md:p-1.5" : "p-1 md:p-1.5";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`${sizeClasses} inline-flex items-center rounded-md md:rounded-lg shadow-fg focus:outline-none focus:ring-4 focus:ring-skin-focus`}
    >
      {children}
    </a>
  );
};

export default IconButton;
