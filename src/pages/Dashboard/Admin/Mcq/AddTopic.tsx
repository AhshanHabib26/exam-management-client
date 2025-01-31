/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TResponse } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area"
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { AllTopic } from "@/components/dashboard/admin/Mcq/AllTopic";
import { useGetAllMcqSubjectesQuery } from "@/redux/features/quiz/mcq/subjectApi";
import { useCreateMcqTopicMutation, useUpdateMcqTopicMutation } from "@/redux/features/quiz/mcq/topicApi";

interface ICommon {
  id: string;
  name: string;
}

export const AddTopicPage = () => {
  const [topicName, setTopicName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topicId, setTopicId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false)
  const [createMcqTopic] = useCreateMcqTopicMutation();
  const [updateMcqTopic] = useUpdateMcqTopicMutation();
  const dispatch = useDispatch();

  // Fetch all subject
  const {
    data: subjectData,
    isFetching: isFetching,
    isError: isError,
  } = useGetAllMcqSubjectesQuery("");


  // Memoize subject to avoid unnecessary recalculations
  const subject = useMemo<ICommon[]>(
    () =>
      subjectData?.data?.map((item) => ({
        id: item._id,
        name: item.name,
      })) || [],
    [subjectData]
  );

  // Handle subject change
  const handleSubjectChange = useCallback((value: string) => {
    setSelectedSubject(value);
  }, []);

  // Handler for creating a subject
  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating...");

    if (!topicName || !selectedSubject) {
      return toast.error("All fields are required", {
        id: toastId,
        duration: 1500,
      });
    }

    const topicData = { name: topicName, mcqSubject: selectedSubject };
    try {
      const res = (await createMcqTopic(topicData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Topic added successfully", {
          id: toastId,
          duration: 1000,
        });
        setTopicName("");
        setSelectedSubject("")
        setIsVisible(false)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  // Handler for updating a board
  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating...");

    if (!topicName || topicId === null) {
      return toast.error("Topic ID and name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const topicData = { name: topicName, mcqSubject: selectedSubject };

    try {
      const res = (await updateMcqTopic({
        id: topicId,
        data: topicData,
      })) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Topic updated successfully", {
          id: toastId,
          duration: 1000,
        });
        setTopicName("");
        setTopicId(null);
        setSelectedSubject("")
        setIsVisible(false)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  const resetFields = useCallback(() => {
    setTopicId(null);
    setTopicName("");
    setSelectedSubject("");
  }, []);

  const handleVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleClose = useCallback(() => {
    setIsVisible((prevState) => !prevState);
    resetFields();
  }, [resetFields]);



  return (
    <div>
      <div className="flex items-end justify-end my-4">

        {
          isVisible ? <Button onClick={handleClose} className="bg-red-600 hover:bg-red-500">
            Close
          </Button> :
            <Button onClick={handleVisible} className="bg-BgPrimary hover:bg-BgPrimaryHover">
              Add Topic
            </Button>
        }
      </div>

      {
        isVisible && <form onSubmit={topicId === null ? createHandler : updateHandler}>
          <div className="grid mt-5 max-w-xl mx-auto gap-2 border p-3 rounded-lg">
              <Input
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                type="text"
                name="name"
                className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
                placeholder="Topic Name"
              />
            <div>
              {isError && <p>Error loading subject.</p>}
              <Select
                value={selectedSubject || ""}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger
                  className="h-[50px] hind-siliguri-light"
                  aria-label="Subject"
                >
                  <SelectValue placeholder="Choose Subject" />
                </SelectTrigger>
                <SelectContent>
                  {isFetching && (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  )}
                  {isError && (
                    <SelectItem value="error" disabled>
                      Error loading subject
                    </SelectItem>
                  )}
                  <ScrollArea className=" h-[200px]">
                    {subject.length > 0 ? (
                      subject.map((sub) => (
                        <SelectItem
                          className="text-lg hind-siliguri-light cursor-pointer"
                          key={sub.id}
                          value={sub.id}
                        >
                          {sub.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="null" disabled>
                        No Subject Available
                      </SelectItem>
                    )}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end justify-end">
              <Button
                className={`h-[45px] ${topicId === null ? "bg-blue-500 hover:bg-blue-600" : "bg-green-600 hover:bg-green-500"
                  }`}
              >
                {topicId === null ? "Add Topic" : "Update Topic"}
              </Button>

            </div>
          </div>
        </form>
      }
      <Separator className="mt-5" />
      <div>
        <AllTopic
          onSelectTopic={(id, name, mcqSubject) => {
            setTopicId(id);
            setTopicName(name);
            setSelectedSubject(mcqSubject)
          }}
          handleVisible={handleVisible}
        />
      </div>
    </div>
  );
};
