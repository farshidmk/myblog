import React from "react";
import { AlertProps } from "./Alert-types";
import { OctagonAlert, Info, BadgeCheck } from "lucide-react";

const Alert = ({
  icon,
  severity = "info",
  text,
  variant = "standard",
}: AlertProps) => {
  const alertIcon = icon || getIconBySeverity(severity);
  return (
    <div role="alert" className={`alert alert-${variant} alert-${variant}`}>
      {alertIcon}

      <span>{text}</span>
    </div>
  );
};

export default Alert;

function getIconBySeverity(severity: AlertProps["severity"]) {
  switch (severity) {
    case "error":
      return <OctagonAlert />;
    case "warning":
      return <BadgeCheck />;

    default:
      return <Info />;
  }
}
