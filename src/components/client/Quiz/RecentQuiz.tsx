import {  TQuiz } from "@/types/common.data";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import RecentQuizCard from "./RecentQuizCard";

const RecentQuiz = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllQuizQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // Filter for recent quiz created in the last 24 hours
  const recentQuiz = data?.data
    ? [...data.data]
        .filter((quiz: TQuiz) => {
          if (quiz.createdAt) {
            const createdAt = new Date(quiz.createdAt);
            return createdAt >= yesterday && createdAt <= today;
          }
          return false;
        })
        .slice(0, 10)
    : [];

  // Get previous quiz excluding the recent ones
  const previousQuiz = data?.data
    ? [...data.data]
        .filter((quiz: TQuiz) => {
          if (quiz.createdAt) {
            const createdAt = new Date(quiz.createdAt);
            return createdAt < yesterday; // Get quizes older than yesterday
          }
          return false;
        })
        .slice(0, 10) // Take up to 10 random previous quizes
    : [];

  // Combine recent quizes and previous quizs to ensure we always have 10
  const quizToDisplay = [...recentQuiz, ...previousQuiz].slice(0, 10);

  return (
    <div className="shadow-md border-[0.5px] border-gray-800 mb-5 rounded-md">
      <div className="bg-gray-900 rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">Recent Exam</h1>
      </div>
      <div className="p-2">
        <div>
          {quizToDisplay.length > 0
            ? quizToDisplay.map((quiz: TQuiz, index) => (
                <RecentQuizCard
                  quiz={quiz}
                  key={quiz._id}
                  isLast={index === quizToDisplay.length - 1}
                />
              ))
            :  <p>No exam available.</p>}
        </div>
      </div>
    </div>
  );
};

export default RecentQuiz;
