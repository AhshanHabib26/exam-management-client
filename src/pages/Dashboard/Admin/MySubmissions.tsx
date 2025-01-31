import QuizSubmissions from "@/components/dashboard/user/Quiz/QuizSubmissions";
import UQuizCard from "@/components/dashboard/user/Quiz/UQuizCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetUserQuizProgressReportQuery } from "@/redux/features/quiz/submission/submissionApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const MySubmissionsPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserQuizProgressReportQuery({
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <UQuizCard progress={data?.data} />
      <QuizSubmissions title="Quiz Submissions" separator={true} />
    </div>
  );
};

export default MySubmissionsPage;
