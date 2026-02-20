import Alert from "@/components/ui/alert/Alert";

type Props = {
  error: string | string[] | undefined | null;
};

const ShowError = ({ error }: Props) => {
  if (!error) return null;
  if (Array.isArray(error)) {
    if (error.length === 0) return null;
    return (
      <Alert
        text={
          <ul>
            {error.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        }
        severity="error"
        variant="soft"
      />
    );
  }
  return <Alert text={error} severity="error" variant="soft" />;
};

export default ShowError;
