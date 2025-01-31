/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryLoader } from "@/loader/CategoryLoader";
import { useGetAllMcqCategoriesQuery } from "@/redux/features/quiz/mcq/categoryApi";
import { useUploadMcqMutation } from "@/redux/features/quiz/mcq/mcqApi";
import { useGetAllMcqSubjectesQuery } from "@/redux/features/quiz/mcq/subjectApi";
import { useGetAllMcqTopicesQuery } from "@/redux/features/quiz/mcq/topicApi";
import { TResponse } from "@/types";
import { X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface UploadQuizProps {
  openDialog: boolean;
  onClose: () => void;
}

interface ICommon {
  id: string;
  name: string;
}

const UploadMcq = ({ openDialog, onClose }: UploadQuizProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [quizFile, setQuizFile] = useState<File | null>(null);


  // Fetch all categories
  const {
    data: categoriesData,
    isFetching: isFetchingCategories,
    isError: isErrorCategories,
  } = useGetAllMcqCategoriesQuery("");


  // Memoize categories to avoid unnecessary recalculations
  const categories = useMemo<ICommon[]>(
    () =>
      categoriesData?.data?.map((item) => ({
        id: item._id,
        name: item.name,
      })) || [],
    [categoriesData]
  );


  // Fetch all subject
  const {
    data: subjectData,
    isFetching: isFetchingSubject,
    isError: isErrorSubject,
  } = useGetAllMcqSubjectesQuery("");


  // Memoize categories to avoid unnecessary recalculations
  const subject = useMemo<ICommon[]>(
    () =>
      subjectData?.data?.map((item) => ({
        id: item._id,
        name: item.name,
      })) || [],
    [subjectData]
  );



  // Fetch all topic
  const {
    data: topicData,
    isFetching: isFetchingTopic,
    isError: isErrorTopic,
  } = useGetAllMcqTopicesQuery("");


  // Memoize topic to avoid unnecessary recalculations
  const topic = useMemo<ICommon[]>(
    () =>
      topicData?.data?.map((item) => ({
        id: item._id,
        name: item.name,
      })) || [],
    [topicData]
  );


  const [uploadMcq] = useUploadMcqMutation();

  // Handle category change
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);

  // Handle subject change
  const handleSubjectChange = useCallback((value: string) => {
    setSelectedSubject(value);
  }, []);

  // Handle topic change
  const handleTopicChange = useCallback((value: string) => {
    setSelectedTopic(value);
  }, []);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQuizFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quizFile) {
      toast.error("Please upload a mcq file.");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    if (!selectedSubject) {
      toast.error("Please select a subject.");
      return;
    }

    if (!selectedTopic) {
      toast.error("Please select a topic.");
      return;
    }

    if (!quizFile) {
      toast.error("Please upload a mcq file.");
      return;
    }

    const formData = new FormData();
    formData.append("quizFile", quizFile);
    formData.append("category", selectedCategory);
    formData.append("subject", selectedSubject);
    formData.append("topic", selectedTopic);

    try {
      const response = (await uploadMcq(formData)) as TResponse<any>;
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Mcq uploaded successfully!");
        onClose()
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const handleClose = () => {
    setSelectedCategory("");
    setSelectedSubject("");
    setSelectedTopic("");
    setQuizFile(null);
    onClose();
  };

  return (
    <Dialog open={openDialog} onOpenChange={(open) => open && handleClose()}>
      <DialogContent className="max-w-sm lg:max-w-lg mx-auto rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            Upload Quiz
          </h2>
          <DialogClose>
            <X
              size={20}
              className="absolute top-3 right-3 text-red-500 hover:text-red-600"
              onClick={onClose}
            />
          </DialogClose>
        </div>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogDescription>
              <input
                className="w-full border h-[50px] pt-3 pl-2"
                type="file"
                accept=".json"
                onChange={handleFileChange}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4">
                <div>
                  {isErrorCategories && <p>Error loading categories.</p>}

                  {isFetchingCategories ? (
                    <CategoryLoader />
                  ) : (
                    <Select
                      value={selectedCategory || ""}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger
                        className="h-[50px] hind-siliguri-light"
                        aria-label="Category"
                      >
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {isFetchingCategories && (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        )}
                        {isErrorCategories && (
                          <SelectItem value="error" disabled>
                            Error loading categories
                          </SelectItem>
                        )}
                        <ScrollArea className=" h-[200px]">
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem
                                className="text-lg hind-siliguri-light cursor-pointer"
                                key={category.id}
                                value={category.id}
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="null" disabled>
                              No categories available
                            </SelectItem>
                          )}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div>
                  {isErrorSubject && <p>Error loading subject.</p>}

                  {isFetchingSubject ? (
                    <CategoryLoader />
                  ) : (
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
                        {isFetchingCategories && (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        )}
                        {isErrorSubject && (
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
                              No subjects available
                            </SelectItem>
                          )}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div>
                  {isErrorTopic && <p>Error loading topic.</p>}

                  {isFetchingTopic ? (
                    <CategoryLoader />
                  ) : (
                    <Select
                      value={selectedTopic || ""}
                      onValueChange={handleTopicChange}
                    >
                      <SelectTrigger
                        className="h-[50px] hind-siliguri-light"
                        aria-label="Topic"
                      >
                        <SelectValue placeholder="Choose Topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {isFetchingCategories && (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        )}
                        {isErrorTopic && (
                          <SelectItem value="error" disabled>
                            Error loading topic
                          </SelectItem>
                        )}
                        <ScrollArea className=" h-[200px]">
                          {topic.length > 0 ? (
                            topic.map((tp) => (
                              <SelectItem
                                className="text-lg hind-siliguri-light cursor-pointer"
                                key={tp.id}
                                value={tp.id}
                              >
                                {tp.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="null" disabled>
                              No topics available
                            </SelectItem>
                          )}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div className="flex items-end justify-end mt-3">
                <Button
                  className="bg-BgPrimary hover:bg-BgPrimaryHover"
                  type="submit"
                >
                  Upload Quiz
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadMcq;
