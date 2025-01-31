import { Button } from "@/components/ui/button"
import { IQuizUserSubmissionProps } from "@/types/common.data"
import { useState } from "react"
import { MathJax } from "better-react-mathjax"
import DImg from "../../../../assets/icons/diamond.png"
import { isNewBlog } from "@/lib/isNew"
import { Separator } from "@/components/ui/separator"
import { FaQuestion } from "react-icons/fa6"

const SubmissionCard: React.FC<IQuizUserSubmissionProps> = ({ quizSubmission }) => {
    const [showDetails, setShowDetails] = useState(false)
    const toggleDetails = () => {
        setShowDetails(prev => !prev)
    }

    console.log(quizSubmission)
    return (
        <div className="border border-gray-200 rounded-lg p-2 mb-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <p className=" bg-BgPrimary rounded-full p-1 size-8 text-[16px] font-normal text-center text-white">{quizSubmission?.user?.initials ?? "AN"}</p>
                    <h1 className="text-lg font-semibold text-gray-700">{quizSubmission?.user?.fullname}</h1>
                </div>
                <div className="flex items-center gap-1 bg-green-500 px-2 py-1 rounded-md">
                    <img src={DImg} className=" size-5" alt={quizSubmission.quiz?.title} />
                    <p className="text-lg font-semibold text-gray-100">{quizSubmission?.user?.totalPoints ?? "0"}</p>
                </div>
            </div>
            <Separator className=" my-2" />
            <div className="flex items-center gap-2 flex-wrap">
                <p className="text-gray-700">Quiz Title: {quizSubmission?.quiz?.title}</p>
                <div>
                    {quizSubmission?.createdAt && (
                        <div>
                            {isNewBlog(quizSubmission?.createdAt) ? (
                                <div>
                                    <p className="text-sm text-red-500 font-thin capitalize italic">new</p>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between flex-wrap">
                <p className="text-gray-700">Total Marks: {quizSubmission?.totalMarks}</p>
                <p className=" text-gray-700">
                    Submitted At:
                    {quizSubmission?.createdAt
                        ? new Date(quizSubmission?.createdAt).toLocaleString()
                        : "N/A"}
                </p>
            </div>

            {/* Conditionally render the details */}
            {showDetails && (
                <div className="my-3">
                    {Array.isArray(quizSubmission?.results) && quizSubmission?.results.map(rq => (
                        <div key={rq?.questionText} className="border p-2 mb-1 rounded-lg">
                            <div className="flex items-center gap-2">
                                <FaQuestion color="red" />
                                <h1><MathJax inline>{rq?.questionText}</MathJax></h1>
                            </div>
                            <p><MathJax inline>User Answer: {rq?.userAnswer}</MathJax></p>
                            <p><MathJax inline>Correct Answer: {rq?.correctAnswer}</MathJax></p>
                            <p><MathJax inline>Explanation: {rq?.explanation}</MathJax></p>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex items-end justify-end">
                <Button className=" bg-BgPrimary hover:bg-BgPrimaryHover" onClick={toggleDetails}>
                    {showDetails ? "Hide Details" : "Show Details"}
                </Button>
            </div>
        </div>
    )
}

export default SubmissionCard
