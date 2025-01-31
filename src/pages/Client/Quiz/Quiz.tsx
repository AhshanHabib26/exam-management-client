import { useGetAllQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import { useState, useEffect } from "react";
import { PaginationCard } from "@/lib/PaginationCard";
import { TQuiz } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/features/global/globalSlice";
import QuizListCard from "@/components/client/Quiz/QuizListCard";
import Container from "@/lib/Container";
import SearchBtn from "@/components/client/SearchBtn";
import QuizListCategory from "@/components/client/Quiz/QuizListCategory";
import RecentQuiz from "@/components/client/Quiz/RecentQuiz";
import QuizSubject from "@/components/client/Quiz/QuizSubject";
import { Button } from "@/components/ui/button";

const QuizPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [selectedQuizCategoryId, setSelectedQuizCategoryId] = useState<string | null>("");
  const [selectedQuizSubjectId, setSelectedQuizSubjectId] = useState<string | null>("");
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllQuizQuery(
    {
      page,
      limit,
      category: selectedQuizCategoryId || undefined,
      subject: selectedQuizSubjectId || undefined,
      searchTerm: searchTerm.trim() ? searchTerm : undefined,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleReset = () => {
    setSelectedQuizCategoryId("")
    setSelectedQuizSubjectId("")
    setSearchTerm("")
  }

  return (
    <div className="mt-20 lg:mt-24 min-h-screen">
      <Container>
        <div>
          {!isLoading && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8">
                <div>
                  <SearchBtn inputBelow={true} setSearchTerm={setSearchTerm} />
                  {data?.data?.length === 0 ? (
                    <div className="flex items-center justify-center flex-col mt-20">
                      <HardDrive size={40} className="text-gray-400" />
                      <h1 className="text-gray-400">No Exam Found</h1>
                    </div>
                  ) : (
                    <div>
                      <div className="mt-5">
                        {data?.data?.map(
                          (quiz: TQuiz) => (
                            <QuizListCard quiz={quiz} key={quiz._id} />
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
              <div className="col-span-12 lg:col-span-4">
                <RecentQuiz />
                <QuizListCategory
                  setSelectedQuizCategoryId={setSelectedQuizCategoryId}
                  selectedQuizCategoryId={selectedQuizCategoryId}
                />
                <div className="my-5">
                  <QuizSubject
                    setSelectedQuizSubjectId={setSelectedQuizSubjectId}
                    selectedQuizSubjectId={selectedQuizSubjectId}
                    selectedQuizCategoryId={selectedQuizCategoryId}

                  />
                </div>
                <div className="mt-5 flex items-end justify-end">
                  {
                    selectedQuizCategoryId || selectedQuizSubjectId || searchTerm ? <Button size="lg" className="text-lg font-light bg-BgPrimary hover:bg-BgPrimaryHover" onClick={handleReset}>Reset Filter</Button> : null
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default QuizPage;
