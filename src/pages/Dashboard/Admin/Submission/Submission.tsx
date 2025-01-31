import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllUserQuizSubmissionQuery } from "@/redux/features/quiz/submission/submissionApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SubmissionCard from "./SubmissionCard";
import { HardDrive } from "lucide-react";
import { IQuizUserSubmission } from "@/types/common.data";

const SubmissionPage = () => {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllUserQuizSubmissionQuery(
    {
      page,
      limit,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const total = data?.meta?.total ?? 0;
  const results = data?.data || [];

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="min-h-screen mt-5">
      <div>
        {!isLoading && (
          <div>
            <div>
              {results.length === 0 ? (
                <div className="flex items-center justify-center flex-col mt-20">
                  <HardDrive size={40} className="text-gray-400" />
                  <h1 className="text-gray-400">No Submission Found</h1>
                </div>
              ) : (
                <div>
                  <div className="mt-5">
                    {results?.map(
                      (quizSubmission: IQuizUserSubmission) => (
                        <SubmissionCard quizSubmission={quizSubmission} key={quizSubmission?._id} />
                      )
                    )}
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
        )}
      </div>
    </div>
  )
}

export default SubmissionPage