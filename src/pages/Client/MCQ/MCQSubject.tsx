import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetAllMcqSubjectesQuery } from "@/redux/features/quiz/mcq/subjectApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IMCQSubject } from "@/types/common.data";
import { HeartCrack } from "lucide-react";

type MCQSubjectProps = {
  setSelectedSubjectId: (id: string | null) => void;
  selectedSubjectId?: string | null;
  selectedCategoryId?: string | null;
};

const MCQSubject: React.FC<MCQSubjectProps> = ({
  setSelectedSubjectId,
  selectedSubjectId,
  selectedCategoryId,
}) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllMcqSubjectesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const filterData = selectedCategoryId ? data?.data?.filter((subject: IMCQSubject) => subject.mcqCategory._id === selectedCategoryId) : data?.data;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Function to select/deselect category
  const handleCategoryChange = (subjectId: string) => {
    if (selectedSubjectId === subjectId) {
      setSelectedSubjectId(null); // Deselect if clicked again
    } else {
      setSelectedSubjectId(subjectId); // Select new category
    }
  };

  return (
    <div className="shadow-md border-[0.5px] border-gray-300 rounded-md">
      <div className="bg-BgPrimary rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">MCQ Subject</h1>
      </div>
      <div className="p-4">
        <div>
          {
            filterData && filterData?.length > 0 ? <div>
              <ScrollArea className="h-[320px]">
                {filterData?.map((subject: IMCQSubject) => (
                  <div className="items-top flex space-x-2 mb-2" key={subject?._id}>
                    <Checkbox
                      className="size-4"
                      id={subject?._id}
                      checked={selectedSubjectId === subject?._id}
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

export default MCQSubject;
