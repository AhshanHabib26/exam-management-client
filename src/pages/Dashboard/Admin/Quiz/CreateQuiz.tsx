/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TResponse } from "@/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardLoader } from "@/loader/DashboardLoader";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateQuizMutation,
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
} from "@/redux/features/quiz/quiz/quizApi";
import { CategoryLoader } from "@/loader/CategoryLoader";
import { useGetAllQuizCategoriesQuery } from "@/redux/features/quiz/category/categoryApi";
import { Upload } from "lucide-react";
import UploadQuiz from "./UploadQuiz";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllQuizSubjectesQuery } from "@/redux/features/quiz/subject/subjectApi";

// Define the types for API responses and form data
interface ICommon {
  id: string;
  name: string;
}

interface Question {
  questionText: string;
  options: string[];
  correctOption: string;
  explanation: string;
}

export const CreateQuizPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [duration, setDuration] = useState<number>();
  const [pointsRequired, setPointsRequired] = useState<number>();
  const [penaltyPerIncorrectAnswer, setPenaltyPerIncorrectAnswer] =
    useState<number>();
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctOption: "",
      explanation: "",
    },
  ]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch single post data if ID is available
  const { data: quiz, isFetching: isFetchingPost } = useGetSingleQuizQuery(
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
  } = useGetAllQuizCategoriesQuery("");

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


  const [createQuiz] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();


  useEffect(() => {
    if (quiz) {
      setTitle(quiz?.data?.title || "");
      setDescription(quiz?.data?.description || "");
      setDifficultyLevel(quiz?.data?.difficultyLevel || "");
      setSelectedCategory(quiz?.data?.category._id || "");
      setSelectedSubject(quiz?.data?.subject._id || "");
      setDuration(quiz?.data?.duration || 0);
      setPointsRequired(quiz?.data?.pointsRequired || 0);
      setPenaltyPerIncorrectAnswer(quiz?.data?.penaltyPerIncorrectAnswer || 0);


      // Handle questions
      const questionsArray = Array.isArray(quiz?.data?.questions)
        ? quiz.data.questions.map((question: any) => ({
          questionText: question.questionText || "",
          options: Array.isArray(question.options)
            ? question.options
            : ["", "", "", ""],
          correctOption: question.correctOption || "",
          explanation: question.explanation || "",
        }))
        : [
          {
            questionText: "",
            options: ["", "", "", ""],
            correctOption: "",
            explanation: "",
          },
        ];

      setQuestions(questionsArray);
    }
  }, [quiz]);

  // Handle category change
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);

  // Handle subject change
  const handleSubjectChange = useCallback((value: string) => {
    setSelectedSubject(value);
  }, []);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctOption: "",
        explanation: "",
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index
          ? {
            ...question,
            [field]: value,
            options: field.startsWith("option")
              ? question.options.map((opt, optIndex) =>
                optIndex === parseInt(field.replace("option", ""), 10)
                  ? value
                  : opt
              )
              : question.options,
          }
          : question
      )
    );
  };

  if (isFetchingPost) {
    return <DashboardLoader />;
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !selectedCategory ||
      !selectedSubject ||
      !difficultyLevel
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const quizData = {
      title,
      description,
      questions,
      duration,
      penaltyPerIncorrectAnswer,
      pointsRequired,
      difficultyLevel,
      subject: selectedSubject,
      category: selectedCategory,
    };

    const toastId = toast.loading(id ? "Quiz updating..." : "Quiz creating...");

    try {
      const response = id
        ? ((await updateQuiz({ id: id, data: quizData })) as TResponse<any>)
        : ((await createQuiz(quizData)) as TResponse<any>);

      if (response.error) {
        toast.error(response.error.data.message, {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.success(
          id ? "Exam updated successfully" : "Quiz created successfully",
          {
            id: toastId,
            duration: 1000,
          }
        );
        resetForm();
        navigate("/admin/dashboard/all-exam");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
    }
  };

  // Reset form fields
  const resetForm = () => {
    setDescription("");
    setTitle("");
    setSelectedCategory("");
    setDuration(undefined);
    setPointsRequired(undefined);
    setPenaltyPerIncorrectAnswer(undefined);
    setDifficultyLevel("");
  };

  return (
    <div className="mt-5 mb-10">
      <div className="flex items-center justify-between">
        <div>
          <Button
            className=" bg-green-600 hover:bg-green-700 py-5 text-lg font-light"
            onClick={handleButtonClick}
          >
            <Upload />
            Upload Quiz
          </Button>
          <UploadQuiz openDialog={isDialogOpen} onClose={handleCloseDialog} />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Button
              className={`text-lg font-light px-3 py-5 ${id
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
                }`}
              type="button"
              onClick={handleSubmit}
            >
              {id ? "Update Quiz" : "Add Quiz"}
            </Button>
          </div>
          <div>
            <Link to="/admin/dashboard/all-exam">
              <Button
                type="button"
                className="text-lg font-light px-3 py-5 bg-red-500 hover:bg-red-600"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Input
          className="h-[50px] text-lg hind-siliguri-light"
          type="text"
          placeholder="Enter your title"
          aria-label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="my-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
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
      </div>
      <div>
        <Textarea rows={5} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5 my-4">
          <Input
            type="number"
            value={duration}
            className="h-[50px] text-lg hind-siliguri-light"
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Duration (minutes)"
          />
          <Input
            type="number"
            value={pointsRequired}
            onChange={(e) => setPointsRequired(Number(e.target.value))}
            placeholder="Quiz Access Points"
            className="h-[50px] text-lg hind-siliguri-light"
          />
          <Input
            type="number"
            value={penaltyPerIncorrectAnswer}
            onChange={(e) =>
              setPenaltyPerIncorrectAnswer(Number(e.target.value))
            }
            placeholder="Penalty Per Incorrect Answer"
            className="h-[50px] text-lg hind-siliguri-light"
          />
        </div>
        <div className="my-4">
          <Input
            type="text"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            placeholder="Add Quiz difficulty level (Easy, Hard, Medium)"
            className="h-[50px] text-lg hind-siliguri-light"
          />
        </div>
        {questions.map((question, index) => (
          <div
            key={index}
            className="border p-3 mb-4 rounded-md border-gray-200"
          >
            <h4 className="text-center text-lg mb-1 font-semibold text-gray-700">
              Question No. {index + 1}
            </h4>
            <Input
              type="text"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(index, "questionText", e.target.value)
              }
              placeholder="Question Name"
              className="h-[50px] mb-3 text-lg hind-siliguri-light"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {question.options?.map((option: string, optionIndex: number) => (
                <div key={optionIndex}>
                  <Input
                    type="text"
                    className="h-[50px] text-lg hind-siliguri-light"
                    value={option}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        `option${optionIndex}`,
                        e.target.value
                      )
                    }
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>
              ))}
            </div>

            <Input
              type="text"
              className="h-[50px] mt-3 text-lg hind-siliguri-light"
              value={question.correctOption}
              onChange={(e) =>
                handleQuestionChange(index, "correctOption", e.target.value)
              }
              placeholder="Correct Answer"
            />

            <Textarea
              className="mt-3 text-lg hind-siliguri-light"
              value={question.explanation}
              onChange={(e) =>
                handleQuestionChange(index, "explanation", e.target.value)
              }
              placeholder="Add explanation"
            />
            <div className="flex items-center justify-end space-x-4 mt-3">
              {/* Show only the "Add Question" button if it's the first question */}
              {index === 0 && (
                <Button
                  size="default"
                  className="bg-blue-500 hover:bg-blue-600 text-lg hind-siliguri-light"
                  onClick={handleAddQuestion}
                >
                  Add Question
                </Button>
              )}

              {/* Show both "Remove Question" and "Add Question" on the last question */}
              {index === questions.length - 1 && index > 0 && (
                <>
                  <Button
                    size="default"
                    className="bg-blue-500 hover:bg-blue-600 text-lg hind-siliguri-light"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </Button>

                  <Button
                    size="default"
                    className="bg-red-600 hover:bg-red-500 text-lg hind-siliguri-light"
                    onClick={() => handleRemoveQuestion(index)}
                  >
                    Remove Question
                  </Button>
                </>
              )}

              {/* Show only the "Remove Question" button for questions between 1 and second-to-last */}
              {index > 0 && index < questions.length - 1 && (
                <Button
                  size="default"
                  className="bg-red-600 hover:bg-red-500 text-lg hind-siliguri-light"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  Remove Question
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
