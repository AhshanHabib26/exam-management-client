import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { TQuizCategory } from "@/types/common.data";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllQuizCategoriesQuery } from "@/redux/features/quiz/category/categoryApi";


type MCQCategoryProps = {
  setSelectedQuizCategoryId: (id: string | null) => void;
  selectedQuizCategoryId?: string | null;
};

const QuizListCategory: React.FC<MCQCategoryProps> = ({
  setSelectedQuizCategoryId,
  selectedQuizCategoryId,
}) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllQuizCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Function to select/deselect category
  const handleCategoryChange = (categoryId: string) => {
    if (selectedQuizCategoryId === categoryId) {
      setSelectedQuizCategoryId(null); // Deselect if clicked again
    } else {
      setSelectedQuizCategoryId(categoryId); // Select new category
    }
  };

  return (
    <div className="shadow-md border-[0.5px] border-gray-300 rounded-md">
      <div className="bg-BgPrimary rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">Exam Category</h1>
      </div>
      <div className="p-4">
        <div>
          <ScrollArea className="h-[320px]">
            {data?.data?.map((category: TQuizCategory) => (
              <div className="items-top flex space-x-2 mb-2" key={category?._id}>
                <Checkbox
                  className="size-4"
                  id={category?._id}
                  checked={selectedQuizCategoryId === category?._id}
                  onCheckedChange={() => handleCategoryChange(category?._id)}
                />
                <label
                  htmlFor={category?._id}
                  className="text-lg font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category?.name}
                </label>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default QuizListCategory;
