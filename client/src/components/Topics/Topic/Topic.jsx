import React from "react";
import Link from "@material-ui/core/Link";

export const Topic = ({ title, url }) => {
  return <Link href={url}>{title}</Link>;
};
