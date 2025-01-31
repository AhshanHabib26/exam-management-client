/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardLoader } from "@/loader/DashboardLoader";
import { ScrollArea } from "@/components/ui/scroll-area"
import { TResponse } from "@/types";
import { CategoryLoader } from "@/loader/CategoryLoader";
import { useCreateMcqMutation, useGetSingleMcqQuery, useUpdateMcqMutation } from "@/redux/features/quiz/mcq/mcqApi";
import UploadMcq from "./UploadMcq";
import { Upload } from "lucide-react";
import { useGetAllMcqCategoriesQuery } from "@/redux/features/quiz/mcq/categoryApi";
import { useGetAllMcqSubjectesQuery } from "@/redux/features/quiz/mcq/subjectApi";
import { useGetAllMcqTopicesQuery } from "@/redux/features/quiz/mcq/topicApi";

// Define the types for API responses and form data
interface ICommon {
  id: string;
  name: string;
}

interface IQuestion {
  questionText: string;
  options: string[];
  correctOption: string;
  explanation?: string;
}

export const CreateMcqPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [question, setQuestion] = useState<IQuestion>({
    questionText: "",
    options: ["", "", "", ""],
    correctOption: "",
    explanation: "",
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch single quiz data if ID is available (for editing)
  const { data: mcq, isFetching: isFetchingPost } = useGetSingleMcqQuery(
    id || "",
    {
      skip: !id,
    }
  );


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



  const [createMcq] = useCreateMcqMutation();
  const [updateMcq] = useUpdateMcqMutation();

  // Fetch data from quiz if editing
  useEffect(() => {
    if (mcq) {
      setSelectedCategory(mcq?.data?.category._id || "");
      setSelectedSubject(mcq?.data?.subject._id || "");
      setSelectedTopic(mcq?.data?.topic._id || "");
      const quizQuestion = mcq?.data?.questions || {
        questionText: "",
        options: ["", "", "", ""],
        correctOption: "",
        explanation: "",
      };

      setQuestion(quizQuestion);
    }
  }, [mcq]);

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

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleQuestionChange = (field: keyof IQuestion, value: string) => {
    setQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    setQuestion({ ...question, options: updatedOptions });
  };

  const handleCorrectOptionChange = (value: string) => {
    if (!question.options.includes(value)) {
      toast.error("The correct option must exist in the options list.");
      return;
    }
    setQuestion({ ...question, correctOption: value });
  };

  const handleSubmit = async () => {
    if (
      !selectedCategory ||
      !question.correctOption
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const mcqData = {
      category: selectedCategory,
      subject: selectedSubject,
      topic: selectedTopic,
      questions: question,
    };

    const toastId = toast.loading(id ? "MCQ updating..." : "MCQ creating...");

    try {
      const response = id
        ? ((await updateMcq({ id, data: mcqData })) as TResponse<any>)
        : ((await createMcq(mcqData)) as TResponse<any>);

      if (response.error) {
        toast.error(response.error.data.message, {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.success(
          id ? "Mcq updated successfully" : "Mcq created successfully",
          {
            id: toastId,
            duration: 1000,
          }
        );
        resetForm();
        navigate("/admin/dashboard/all-mcq");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
    }
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubject("")
    setQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctOption: "",
      explanation: "",
    });
  };

  if (isFetchingPost) {
    return <DashboardLoader />;
  }

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <Button
            className=" bg-green-600 hover:bg-green-700 py-5 text-lg font-light"
            onClick={handleButtonClick}
          >
            <Upload />
            Upload Quiz
          </Button>
          <UploadMcq openDialog={isDialogOpen} onClose={handleCloseDialog} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className={`text-lg font-light px-3 py-5 ${id
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
              }`}
            type="button"
            onClick={handleSubmit}
          >
            {id ? "Update MCQ" : "Add MCQ"}
          </Button>
          <Button
            type="button"
            className="text-lg font-light px-3 py-5 bg-red-500 hover:bg-red-600"
            onClick={() => navigate("/admin/dashboard/all-mcq")}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-4">
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

      <div className="mb-4">
        <Input
          value={question.questionText}
          onChange={(e) => handleQuestionChange("questionText", e.target.value)}
          placeholder="Enter question text"
          className="mb-4 h-[45px]"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {question.options.map((option, idx) => (
            <div key={idx}>
              <Input
                value={option}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                className="h-[45px]"
              />
            </div>
          ))}
        </div>
        <Select
          value={question.correctOption || ""}
          onValueChange={handleCorrectOptionChange}
        >
          <SelectTrigger className="h-[45px] mt-4" aria-label="Correct Option">
            <SelectValue placeholder="Select Correct Option" />
          </SelectTrigger>
          <SelectContent>
            {question.options.map((option, idx) => (
              <SelectItem key={idx} value={option || "default"}>
                {option || `Option ${idx + 1}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={question.explanation || ""}
          onChange={(e) => handleQuestionChange("explanation", e.target.value)}
          placeholder="Explanation (Optional)"
          className="mt-4 h-[45px]"
        />
      </div>
    </div>
  );
};
