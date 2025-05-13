import { RefreshCw } from "lucide-react"; // or any icon library you use

type Props = {
  onRefetch: () => void;
  errorText?: string;
};

const ErrorHandler: React.FC<Props> = ({
  onRefetch,
  errorText = "خطا در برقراری ارتباط با سرور",
}) => {
  return (
    <div className="border border-red-500 bg-red-100 text-red-800 rounded-lg p-4">
      <h2 className="font-bold mb-2">{errorText}</h2>
      <button
        onClick={onRefetch}
        className="flex items-center gap-2 px-3 py-1 border border-red-500 text-red-600 text-sm rounded hover:bg-red-200 transition"
      >
        تلاش مجدد
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ErrorHandler;
