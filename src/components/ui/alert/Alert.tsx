import React from "react";
import { AlertProps } from "./Alert-types";
import { OctagonAlert, Info, BadgeCheck } from "lucide-react";
import {
  Alert as ShadAlert,
  AlertDescription,
} from "@/components/ui/alert-primitive";

const Alert = ({ icon, severity = "info", text }: AlertProps) => {
  const alertIcon = icon || getIconBySeverity(severity);
  const variant = mapSeverityToVariant(severity);

  return (
    <ShadAlert variant={variant} className="flex items-center gap-2">
      {alertIcon}
      <AlertDescription>{text}</AlertDescription>
    </ShadAlert>
  );
};

export default Alert;

function getIconBySeverity(severity: AlertProps["severity"]) {
  switch (severity) {
    case "error":
      return <OctagonAlert className="h-4 w-4" />;
    case "warning":
      return <BadgeCheck className="h-4 w-4" />;
    case "success":
      return <BadgeCheck className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
}

function mapSeverityToVariant(severity: AlertProps["severity"]) {
  if (severity === "error") return "destructive" as const;
  if (severity === "warning") return "warning" as const;
  if (severity === "success") return "success" as const;
  return "default" as const;
}
