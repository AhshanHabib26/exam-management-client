import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { IMCQTopic } from "@/types/common.data";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetAllMcqTopicesQuery } from "@/redux/features/quiz/mcq/topicApi";
import { HeartCrack } from "lucide-react";


type MCQTopicsProps = {
  setSelectedTopicId: (id: string | null) => void;
  selectedTopicId?: string | null;
  selectedSubjectId?: string | null;
};

const MCQTopics: React.FC<MCQTopicsProps> = ({
  setSelectedTopicId,
  selectedTopicId,
  selectedSubjectId,
}) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllMcqTopicesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const filterData = selectedSubjectId ? data?.data?.filter((topic: IMCQTopic) => topic.mcqSubject._id === selectedSubjectId) : data?.data;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Function to select/deselect topic
  const handleTopicChange = (topicId: string) => {
    if (selectedTopicId === topicId) {
      setSelectedTopicId(null); // Deselect if clicked again
    } else {
      setSelectedTopicId(topicId); // Select new topic
    }
  };

  return (
    <div className="shadow-md border-[0.5px] border-gray-300 rounded-md">
      <div className="bg-BgPrimary rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">MCQ Topic</h1>
      </div>
      <div className="p-4">
        <div>
          {
            filterData &&  filterData?.length > 0 ? <div> <ScrollArea className="h-[320px]">
              {filterData?.map((topic: IMCQTopic) => (
                <div className="items-top flex space-x-2 mb-2" key={topic?._id}>
                  <Checkbox
                    className="size-4"
                    id={topic?._id}
                    checked={selectedTopicId === topic?._id}
                    onCheckedChange={() => handleTopicChange(topic?._id)}
                  />
                  <label
                    htmlFor={topic?._id}
                    className="text-lg font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {topic?.name}
                  </label>
                </div>
              ))}
            </ScrollArea></div> :
              <div className="flex items-center justify-center flex-col my-10">
                <HeartCrack size={30} color="gray" />
                <p className="text-center text-lg font-light text-gray-600">No Topic Found</p>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MCQTopics;
