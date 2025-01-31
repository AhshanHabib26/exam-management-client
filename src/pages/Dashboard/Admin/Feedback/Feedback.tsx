/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PaginationCard } from "@/lib/PaginationCard"
import { useGetAllFeedbackQuery, useRespondFeedbackMutation } from "@/redux/features/feedback/feedbackApi"
import { setLoading } from "@/redux/features/global/globalSlice"
import { TResponse } from "@/types"
import { HardDrive, User2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

const AdminFeedbackPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const limit = 10;
    const [isShow, setIsShow] = useState(false)
    const [response, setResponse] = useState('')
    const [feedbackId, setFeedbackId] = useState('')
    const [respondFeedback] = useRespondFeedbackMutation()

    const { data, isLoading } = useGetAllFeedbackQuery(
        { page, limit },
        {
            refetchOnMountOrArgChange: false,
        }
    );
    const total = data?.meta?.total ?? 0;
    console.log(data)

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    // Handle form submission
    const handleSubmit = async () => {
        if (response.trim() === "") {
            toast.error("Response is required", { duration: 1500 });
            return;
        }

        const userData = {
            response
        };

        const toastId = toast.loading("Submitting response...");
        try {
            const response = await respondFeedback({ id: feedbackId, data: userData }) as TResponse<any>;

            if (response.error) {
                toast.error(response.error.data.message, {
                    id: toastId,
                    duration: 1500,
                });
            } else {
                toast.success("Response submitted successfully",
                    {
                        id: toastId,
                        duration: 1000,
                    }
                );
                resetForm();
                setIsShow(false)
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Something went wrong";
            toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
        }
    };

    // Reset form fields
    const resetForm = () => {
        setResponse('')
    };

    return (
        <div className="mt-4">
            <div className=" flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-700">Feedback ({total})</h1>
            </div>
            <hr className="my-2" />
            <div>
                {
                    isShow && (
                        <div className="mt-5">
                            <Textarea
                                value={response}
                                rows={4}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Write your feedback here"
                                className="text-lg text-gray-700 font-medium"
                            />
                            <div className="mt-2">
                                <Button onClick={handleSubmit}>Submit</Button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
                {
                    Array.isArray(data?.data) && data?.data.length === 0 ? <div className="flex items-center justify-center flex-col mt-20">
                        <HardDrive size={40} className=" text-gray-400" />
                        <h1 className="text-gray-400">No Feedback Found</h1>
                    </div> : (
                        <div>
                            <div>
                                {Array.isArray(data?.data) && data?.data.map((feedback: any) => (
                                    <div key={feedback?._id} className="bg-white shadow rounded-lg p-3 mt-4">

                                        <div className="flex items-center gap-1">
                                            <User2 size={20} className=" text-gray-600 mb-1" />
                                            <p className=" text-lg font-medium text-gray-600">{feedback.user.fullname}</p>
                                        </div>

                                        <div className="bg-green-100 py-1 px-4 rounded-lg inline-block mt-2">
                                            <p className="text-lg text-gray-700 font-normal">{feedback?.feedback}</p>
                                            <p className="text-sm text-gray-500">Submitted on: {new Date(feedback?.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="mt-2 flex justify-end">
                                            {feedback.response && (
                                                <div className="bg-orange-100 py-1 px-4 rounded-lg">
                                                    <p className="text-lg text-gray-700 font-normal">{feedback?.response}</p>
                                                </div>
                                            )}
                                        </div>
                                        {!feedback.isResolved && (
                                            <div className="flex justify-end">
                                                <Button
                                                    onClick={() => {
                                                        setIsShow(!isShow);
                                                        setFeedbackId(isShow ? "" : feedback?._id);
                                                    }}
                                                >
                                                    {isShow ? "Close Respond" : "Respond"}
                                                </Button>
                                            </div>
                                        )}

                                    </div>

                                ))}
                            </div>
                            {
                                total > limit && <div className="my-5">
                                    <PaginationCard
                                        page={page}
                                        limit={limit}
                                        total={total}
                                        onPageChange={(newPage) => setPage(newPage)}
                                    />
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AdminFeedbackPage