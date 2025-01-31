import { useState, useEffect } from "react";
import { PaginationCard } from "@/lib/PaginationCard";
import { IMCQ } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/features/global/globalSlice";
import Container from "@/lib/Container";
import SearchBtn from "@/components/client/SearchBtn";
import { useGetAllMcqQuery } from "@/redux/features/quiz/mcq/mcqApi";
import { MCQCard } from "./MCQCard";
import MCQCategory from "./MCQCategory";
import MCQSubject from "./MCQSubject";
import MCQTopics from "./MCQTopics";
import { Button } from "@/components/ui/button";


const MCQPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>("");
    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>("");
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>("");
    const limit = 25;
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading, refetch } = useGetAllMcqQuery(
        {
            page,
            limit,
            category: selectedCategoryId || undefined,
            subject: selectedSubjectId || undefined,
            topic: selectedTopicId || undefined,
            searchTerm: searchTerm.trim() ? searchTerm : undefined,
        },
        {
            refetchOnMountOrArgChange: false,
        }
    );


    useEffect(() => {
        refetch();
    }, [selectedCategoryId, selectedSubjectId, searchTerm, refetch]);

    const total = data?.meta?.total ?? 0;

    const toggleShowDetails = (id: string) => {
        if (activeQuestionId === id) {
            // If the clicked question is already open, close it
            setActiveQuestionId(null);
        } else {
            // Otherwise, open the clicked question and close others
            setActiveQuestionId(id);
        }
    };

    const handleReset = () => {
        setSelectedCategoryId("");
        setSelectedSubjectId("");
        setSelectedTopicId("");
        setSearchTerm("");
    };
    
    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

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
                                            <h1 className="text-gray-400">No MCQ Found</h1>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="mt-5">
                                                {data?.data?.map((mcq: IMCQ) => (
                                                    <MCQCard
                                                        mcq={mcq}
                                                        key={mcq._id}
                                                        isActive={mcq._id === activeQuestionId}
                                                        toggleShowDetails={() => toggleShowDetails(mcq._id)}
                                                    />
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
                            <div className="col-span-12 lg:col-span-4">
                                <MCQCategory
                                    setSelectedCategoryId={setSelectedCategoryId}
                                    selectedCategoryId={selectedCategoryId}
                                />
                                <div className="my-5">
                                    <MCQSubject
                                        setSelectedSubjectId={setSelectedSubjectId}
                                        selectedSubjectId={selectedSubjectId}
                                        selectedCategoryId={selectedCategoryId}
                                    />
                                </div>
                                <div>
                                    <MCQTopics
                                        setSelectedTopicId={setSelectedTopicId}
                                        selectedTopicId={selectedTopicId}
                                        selectedSubjectId={selectedSubjectId}
                                    />
                                </div>
                                <div className="mt-5 flex items-end justify-end">
                                    {
                                        selectedCategoryId || selectedSubjectId || selectedTopicId || searchTerm ? <Button size="lg" className="text-lg font-light bg-BgPrimary hover:bg-BgPrimaryHover" onClick={handleReset}>Reset Filter</Button> : null
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

export default MCQPage;
