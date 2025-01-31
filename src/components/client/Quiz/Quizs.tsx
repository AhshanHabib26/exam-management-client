import { useGetAllQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import { useState, useEffect } from "react";
import { PaginationCard } from "@/lib/PaginationCard";
import { TQuiz } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/features/global/globalSlice";
import QuizListCard from "./QuizListCard";

const Quizs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, isLoading } = useGetAllQuizQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="mt-10">
      {!isLoading && (
        <h1 className="text-2xl text-center hind-siliguri-semibold mb-5">
          All Quiz
        </h1>
      )}

      <div>
        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col">
            <HardDrive size={40} className="text-gray-400" />
            <h1 className="text-gray-400">No Quiz Found</h1>
          </div>
        ) : (
          <div>
            {!isLoading && (
              <>
                <div>
                  {data?.data?.map((quiz: TQuiz) => (
                    <QuizListCard quiz={quiz} key={quiz._id} />
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizs;
