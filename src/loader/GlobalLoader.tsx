import { useAppSelector } from "@/redux/hooks";
import FadeLoader from "react-spinners/FadeLoader";

const GlobalLoader = () => {
  const isLoading = useAppSelector((state) => state.global.isLoading);

  return (
    isLoading ? (
      <div className="flex items-center justify-center fixed inset-0 bg-opacity-50 bg-gray-800 z-50">
        <FadeLoader color="#4B5563" loading={isLoading} />
      </div>
    ) : null
  );
};

export default GlobalLoader;
