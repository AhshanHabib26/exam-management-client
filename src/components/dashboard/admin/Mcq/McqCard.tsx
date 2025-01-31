import React, { useState } from "react";
import { Eye, EyeOff, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaQuestion } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { IMCQProps } from "@/types/common.data";
import { MathJax } from "better-react-mathjax";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export const MCQCard: React.FC<IMCQProps> = ({ mcq, deleteHandler, isActive, toggleShowDetails }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const handleEdit = () => {
    navigate(`/admin/dashboard/create-mcq/${mcq?._id}`);
  };

  return (
    <div className=" border p-3 rounded-lg mb-2">
      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-1">
          <FaQuestion color="red" />
          <p className=" cursor-pointer hover:text-TextPrimary" onClick={toggleShowDetails}>
            <MathJax inline>{mcq?.questions?.questionText}</MathJax>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {
            isActive ? <Eye onClick={toggleShowDetails} size={20} className="cursor-pointer" /> : <EyeOff className=" cursor-pointer" onClick={toggleShowDetails} size={20} />
          }
          {
            user?.role === "admin" && <div className="flex items-center gap-2"> <SquarePen
              onClick={handleEdit}
              size={20}
              className=" cursor-pointer"
            />
              <Trash2
                onClick={() => {
                  if (deleteHandler) {
                    deleteHandler(mcq?._id);
                  }
                }}
                size={20}
                className="cursor-pointer"
              /></div>
          }
        </div>
      </div>
      {/* Conditionally render answer details if isActive is true */}
      {isActive && (
        <div>
          <Separator className="my-3" />
          <ul>
            {mcq?.questions?.options?.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    name="mcq-option"
                    value={option}
                    checked={
                      showAnswer && option === mcq?.questions?.correctOption
                    }
                  />
                  <MathJax inline>{option}</MathJax>
                </label>
              </li>
            ))}
          </ul>
          {/* Button with icons to toggle answer visibility */}

          <div className=" flex items-end justify-end">
            <button
              className=" flex mt-3 items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowAnswer((prev) => !prev)}
            >
              {showAnswer ? (
                <>
                  <EyeOff size={20} />
                  Hide Answer
                </>
              ) : (
                <>
                  <Eye size={20} />
                  Show Answer
                </>
              )}
            </button>
          </div>
          {/* Conditionally render answer and explanation */}
          {showAnswer && (
            <>
              <Separator className=" my-3 bg-gray-300" />
              <p className="text-green-600">
                <strong>Correct Answer:</strong>{" "}
                <MathJax inline>{mcq?.questions?.correctOption}</MathJax>
              </p>
              <p className="text-gray-600">
                <strong>Explanation:</strong>{" "}
                {mcq?.questions?.explanation ? (
                  <MathJax inline>{mcq?.questions?.explanation}</MathJax>
                ) : (
                  "No explanation available."
                )}
              </p>

            </>
          )}
        </div>
      )}
    </div>
  );
};
