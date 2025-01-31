import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeartCrack } from "lucide-react";
import { useGetAllQuizSubjectesQuery } from "@/redux/features/quiz/subject/subjectApi";

type QuizSubjectProps = {
  setSelectedQuizSubjectId: (id: string | null) => void;
  selectedQuizSubjectId?: string | null;
  selectedQuizCategoryId?: string | null;
};

const QuizSubject: React.FC<QuizSubjectProps> = ({
  setSelectedQuizSubjectId,
  selectedQuizCategoryId,
  selectedQuizSubjectId,
}) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllQuizSubjectesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );


  const filterData = selectedQuizCategoryId ? data?.data?.filter((subject) => subject.quizCategory._id === selectedQuizCategoryId) : data?.data;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Function to select/deselect category
  const handleCategoryChange = (subjectId: string) => {
    if (selectedQuizSubjectId === subjectId) {
      setSelectedQuizSubjectId(null); // Deselect if clicked again
    } else {
      setSelectedQuizSubjectId(subjectId); // Select new category
    }
  };

  return (
    <div className="shadow-md border-[0.5px] border-gray-300 rounded-md">
      <div className="bg-BgPrimary rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">Exam Subject</h1>
      </div>
      <div className="p-4">
        <div>
          {
            filterData && filterData?.length > 0 ? <div>
              <ScrollArea className="h-[320px]">
                {filterData?.map((subject) => (
                  <div className="items-top flex space-x-2 mb-2" key={subject?._id}>
                    <Checkbox
                      className="size-4"
                      id={subject?._id}
                      checked={selectedQuizSubjectId === subject?._id}
                      onCheckedChange={() => handleCategoryChange(subject?._id)}
                    />
                    <label
                      htmlFor={subject?._id}
                      className="text-lg font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subject?.name}
                    </label>
                  </div>
                ))}
              </ScrollArea>
            </div> : 
            <div className="flex items-center justify-center flex-col my-10">
              <HeartCrack size={30} color="gray" />
              <p className="text-center text-lg font-light text-gray-600">No Subject Found</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default QuizSubject;
