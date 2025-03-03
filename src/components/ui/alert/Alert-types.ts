export type AlertProps = {
  variant?: "outline" | "soft" | "standard";
  severity?: "error" | "success" | "info" | "warning" | "inherit";
  text: React.ReactNode;
  icon?: React.ReactNode;
};
