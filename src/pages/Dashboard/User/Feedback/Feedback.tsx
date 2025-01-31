/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCreateFeedbackMutation, useGetUserFeedbackQuery } from "@/redux/features/feedback/feedbackApi"
import { setLoading } from "@/redux/features/global/globalSlice"
import { TResponse } from "@/types"
import { HardDrive } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

const FeedbackPage = () => {
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [createFeedback] = useCreateFeedbackMutation()

    const { data, isLoading } = useGetUserFeedbackQuery(
        {},
        {
            refetchOnMountOrArgChange: false,
        }
    );

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    // Handle form submission
    const handleSubmit = async () => {
        if (feedback.trim() === "") {
            toast.error("Feedback is required", { duration: 1500 });
            return;
        }

        const userData = {
            feedback
        };

        const toastId = toast.loading("Submitting feedback...");
        try {
            const response = await createFeedback(userData) as TResponse<any>;

            if (response.error) {
                toast.error(response.error.data.message, {
                    id: toastId,
                    duration: 1500,
                });
            } else {
                toast.success("Feedback submitted successfully",
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
        setFeedback('')
    };

    return (
        <div className="mt-4">
            <div className=" flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-700">Feedback ({data?.data?.length})</h1>
                {
                    isShow ? <Button onClick={() => setIsShow(false)}>Close</Button> : <Button onClick={() => setIsShow(true)}>Give Feedback</Button>
                }
            </div>
            <hr className="my-2" />
            {
                isShow && (
                    <div className="mt-5">
                        <Textarea
                            value={feedback}
                            rows={4}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your feedback here"
                            className="text-lg text-gray-700 font-medium"
                        />
                        <div className="mt-2">
                            <Button onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                )
            }

            <div>
                {
                    data?.data?.length === 0 ? <div className="flex items-center justify-center flex-col mt-20">
                        <HardDrive size={40} className=" text-gray-400" />
                        <h1 className="text-gray-400">No Feedback Found</h1>
                    </div> : (
                        <div>
                            <div>
                                {data?.data?.map((feedback: any) => (
                                    <div key={feedback?._id} className="bg-white shadow-md rounded-lg p-4 mt-4">
                                        <p className="text-lg text-gray-700 font-semibold">{feedback?.feedback}</p>
                                        <p className="text-sm text-gray-500">Submitted on: {new Date(feedback?.createdAt).toLocaleDateString()}</p>
                                        <div className="mt-2 flex justify-end">
                                            {feedback.response && (
                                                <div className="bg-gray-100 p-2 rounded-lg">
                                                    <p className="text-sm text-gray-700 font-medium">{feedback?.response}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default FeedbackPage