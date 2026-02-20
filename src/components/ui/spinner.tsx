import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return (
    <span
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent",
        className,
      )}
      aria-label="Loading"
    />
  );
}
