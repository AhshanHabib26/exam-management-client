import UQuizListCard from "@/components/client/Quiz/UQuizListCard";
import UQuizCard from "@/components/dashboard/user/Quiz/UQuizCard";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import { useGetUserQuizProgressReportQuery } from "@/redux/features/quiz/submission/submissionApi";
import { TQuiz } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UQuizPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserQuizProgressReportQuery({
    refetchOnMountOrArgChange: false,
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: quizData, isLoading: quizIsLoading } = useGetAllQuizQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const total = quizData?.meta?.total ?? 0;

  useEffect(() => {
    if (isLoading || quizIsLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading, quizIsLoading, dispatch]);

  return (
    <div>
      <UQuizCard progress={data?.data} />
      <div>
        <h1 className="text-xl font-medium text-gray-700">Daily Quiz</h1>
      </div>
      <div>
        {data?.data?.length === 0  ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className="text-gray-400" />
            <h1 className="text-gray-400">No Quiz Found</h1>
          </div>
        ) : (
          <div>
            <div className=" mt-5 grid grid-cols-1">
              {quizData?.data?.map((quiz: TQuiz) => (
                <UQuizListCard quiz={quiz} key={quiz._id} />
              ))}
            </div>
            {total > limit && (
              <div className="my-5 flex items-end justify-end">
                <PaginationCard
                  page={page}
                  limit={limit}
                  total={total}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UQuizPage;
