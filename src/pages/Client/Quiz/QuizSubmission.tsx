import Container from "@/lib/Container";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MathJax } from "better-react-mathjax";
import { useGetSubmissionQuizQuery } from "@/redux/features/quiz/submission/submissionApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

// Define TypeScript interfaces
interface Answer {
  questionIndex: number;
  selectedOption: string;
}

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctOption: string;
  explanation: string;
}

interface QuizData {
  questions: Question[];
}

interface QuizSubmissionData {
  quiz: QuizData;
  answers: Answer[];
  totalMarks: number;
}

const QuizSubmissionPage = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { id } = useParams<string>();
  const { data, isLoading } = useGetSubmissionQuizQuery(id, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  if (!data || !data?.data) {
    return null;
  }

  const { quiz, answers, totalMarks } = data?.data as QuizSubmissionData;
  const questions = quiz?.questions;
  const correctAnswersCount = answers?.filter((ans) => {
    const question = questions[ans?.questionIndex];
    return question && ans?.selectedOption === question?.correctOption;
  }).length;


  const roleToDashboard: Record<string, string> = {
    admin: "/admin/dashboard/my-submissions",
    user: "/user/dashboard",
  };

  return (
    <div>
      <div className="mt-20 lg:mt-24 max-w-6xl mx-auto min-h-screen">
        <Container>
          <div className=" p-6 rounded-lg shadow-lg border border-gray-300">
            <h1 className="text-xl md:text-2xl  lg:text-3xl text-TextFourth font-bold mb-4 text-center flex items-center justify-center">
              <span className="mr-1">📚</span>
              Quiz Submission Details
            </h1>

            <div className="space-y-4">
              {questions?.map((question, index) => {
                const userAnswer = answers.find(
                  (ans) => ans.questionIndex === index
                );
                const isCorrect =
                  userAnswer?.selectedOption === question?.correctOption;
                const isUserAnswerWrong =
                  !isCorrect && userAnswer?.selectedOption;

                return (
                  <div
                    key={question?._id}
                    className="border-b border-gray-300 pb-4"
                  >
                    <h2 className="text-[16px] font-medium mb-2 text-TextFourth">
                      Q {index + 1}:{" "}
                      <MathJax inline>{question?.questionText}</MathJax>
                    </h2>
                    <ul className="list-disc pl-5">
                      {question?.options.map((option, i) => {
                        let optionClasses = "p-1 rounded cursor-pointer";
                        if (option === question?.correctOption) {
                          optionClasses += " bg-green-200 text-green-700";
                        } else if (
                          isUserAnswerWrong &&
                          option === userAnswer?.selectedOption
                        ) {
                          optionClasses += " bg-red-200 text-red-700";
                        } else {
                          optionClasses += "text-TextFourth";
                        }
                        return (
                          <li key={i} className={`${optionClasses}  mb-2`}>
                            <MathJax inline> {option}</MathJax>
                          </li>
                        );
                      })}
                    </ul>
                    {isUserAnswerWrong && (
                      <p className="text-red-500 mt-2">
                        <strong>Your answer was incorrect.</strong> The correct
                        answer is:{" "}
                        <span className="text-green-700">
                          <MathJax inline>{question?.correctOption}</MathJax>
                        </span>
                      </p>
                    )}
                    {question?.explanation ? (
                      <p className="mt-2 text-TextFourth">
                        <strong>Explanation:</strong>{" "}
                        <MathJax inline>{question?.explanation}</MathJax>
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 bg-BgPrimaryHover p-3 rounded-md flex items-start lg:items-center lg:justify-between flex-col lg:flex-row justify-start">
              <p className="text-lg font-medium text-white">
                Total Questions: {questions?.length}
              </p>
              <p className="text-lg font-medium text-white">Total Marks: {totalMarks}</p>
              <p className="text-lg font-medium text-white">
                Correct Answers: {correctAnswersCount}
              </p>
            </div>
            <div className="flex items-end justify-end gap-2">
              <Link
                className=" bg-BgPrimary hover:bg-BgPrimaryHover px-3 py-2 text-white rounded-sm mt-4"
                to="/exam"
              >
                Exam Page
              </Link>

              {user?.role && roleToDashboard[user.role] ? (
              <Link
                className=" bg-BgPrimaryHover hover:bg-BgPrimary px-3 py-2 text-white rounded-sm mt-4"
                to={roleToDashboard[user.role]}
              >
                Dashboard
              </Link> ) : null}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default QuizSubmissionPage;
