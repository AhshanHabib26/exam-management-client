import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllQuizCategoriesQuery } from "@/redux/features/quiz/category/categoryApi";
import { TQuizCategory } from "@/types/common.data";

const bgColor = [
  "bg-red-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-gray-100",
  "bg-orange-100",
  "bg-blue-100",
  "bg-teal-100",
  "bg-pink-100",
  "bg-purple-100",
];

const bgHoverColor = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-purple-500",
];

type QuizCategoryProps = {
  setSelectedQuizCategoryId: (id: string) => void;
};

const QuizListCategory: React.FC<QuizCategoryProps> = ({
  setSelectedQuizCategoryId,
}) => {
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { data, isLoading } = useGetAllQuizCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  // Update global loading state
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="shadow-md border-[0.5px] border-gray-800 rounded-md">
      <div className="bg-gray-900 rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg hind-siliguri-semibold ml-2">Exam Topics</h1>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {data?.data && data.data.length > 0 ? (
            data.data.map((category: TQuizCategory, index) => {
              const bgColorIndex = index % bgColor.length;
              const bgHoverColorIndex = index % bgHoverColor.length;

              return (
                <div key={category._id}>
                  <div
                    onClick={() => setSelectedQuizCategoryId(category?._id)}
                    className={`flex items-center justify-between p-4 poppins-regular rounded-lg cursor-pointer ${
                      hoveredIndex === index
                        ? bgHoverColor[bgHoverColorIndex]
                        : bgColor[bgColorIndex]
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      className="w-[30px] h-[30px]"
                      src={category.imageUrl || "/default-image.png"}
                      alt={category.name || "Category"}
                    />
                    <h1
                      className={`text-lg ${
                        hoveredIndex === index ? "text-white" : "text-[#001D25]"
                      }`}
                    >
                      {category.name}
                    </h1>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No quiz category available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizListCategory;
