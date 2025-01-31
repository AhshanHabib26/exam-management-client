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
import { useGetAllQuizCategoriesQuery } from "@/redux/features/quiz/category/categoryApi";
import { useUploadQuizMutation } from "@/redux/features/quiz/quiz/quizApi";
import { useGetAllQuizSubjectesQuery } from "@/redux/features/quiz/subject/subjectApi";
import { TResponse } from "@/types";
import { X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface UploadQuizProps {
  openDialog: boolean;
  onClose: () => void;
}

// Define the types for API responses and form data
interface ICommon {
  id: string;
  name: string;
}

const UploadQuiz = ({ openDialog, onClose }: UploadQuizProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [quizFile, setQuizFile] = useState<File | null>(null);

  // Fetch all categories
  const {
    data: categoriesData,
    isFetching,
    isError,
  } = useGetAllQuizCategoriesQuery("");
  const [uploadQuiz] = useUploadQuizMutation();

  // Memoize categories to avoid unnecessary recalculations
  const categories: ICommon[] = useMemo(
    () =>
      categoriesData?.data?.map((item: any) => ({
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
  } = useGetAllQuizSubjectesQuery("");


  // Memoize categories to avoid unnecessary recalculations
  const subject = useMemo<ICommon[]>(
    () =>
      subjectData?.data?.map((item) => ({
        id: item._id,
        name: item.name,
      })) || [],
    [subjectData]
  );


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQuizFile(e.target.files[0]);
    }
  };

  // Handle category change
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);

  // Handle subject change
  const handleSubjectChange = useCallback((value: string) => {
    setSelectedSubject(value);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quizFile) {
      toast.error("Please upload a quiz file.");
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

    const formData = new FormData();
    formData.append("quizFile", quizFile);
    formData.append("categoryId", selectedCategory);
    formData.append("subjectId", selectedSubject);

    try {
      const response = (await uploadQuiz(formData)) as TResponse<any>;
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Exam set uploaded successfully!");
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
    setQuizFile(null);
    onClose();
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={(open) => open && handleClose()}>
        <DialogContent className=" max-w-sm lg:max-w-lg mx-auto rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Upload Quiz
            </h2>
            <DialogClose>
              <X
                size={20}
                className=" absolute top-3 right-3 text-red-500 hover:text-red-600"
                onClick={onClose}
              />
            </DialogClose>
          </div>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogDescription>
                <input
                  className=" w-full border h-[50px] pt-3 pl-2"
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                />

                <div className="my-4">
                  {isError && <p>Error loading categories.</p>}
                  {isFetching ? (
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
                        {isFetching && (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        )}
                        {isError && (
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
                        {isFetchingSubject && (
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

                <div className="flex items-end justify-end">
                  <Button
                    className=" bg-BgPrimary hover:bg-BgPrimaryHover"
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
    </div>
  );
};

export default UploadQuiz;
