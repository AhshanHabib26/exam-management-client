import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaQuestion } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { IMCQProps } from "@/types/common.data";
import { MathJax } from "better-react-mathjax";

export const MCQCard: React.FC<IMCQProps> = ({ mcq, isActive, toggleShowDetails }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset showAnswer state when isActive changes
  useEffect(() => {
    if (!isActive) {
      setShowAnswer(false);
    }
  }, [isActive]);

  return (
    <div className="border border-gray-300 p-2 rounded-lg mb-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <FaQuestion color="red" size={16} className="mt-1" />
          <p
            className="text-[16px] font-light cursor-pointer hover:text-TextSecondary"
            onClick={toggleShowDetails}
          >
            <MathJax inline>{mcq?.questions?.questionText}</MathJax>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <Eye onClick={toggleShowDetails} size={16} className="cursor-pointer" />
          ) : (
            <EyeOff onClick={toggleShowDetails} size={16} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Conditionally render question details if isActive is true */}
      {isActive && (
        <div>
          <Separator className="my-3 bg-gray-300" />
          <ul>
            {mcq?.questions?.options?.map((option, index) => (
              <li key={index}>
                <label className="text-[16px] font-light">
                  <input
                    className="mr-2"
                    type="radio"
                    name="mcq-option"
                    value={option}
                    checked={
                      showAnswer && option === mcq?.questions?.correctOption
                    }
                    readOnly
                  />
                  <MathJax inline>{option}</MathJax>
                </label>
              </li>
            ))}
          </ul>

          {/* Button with icons to toggle answer visibility */}

          <div className=" flex items-end justify-end">
            <button
              className=" flex mt-3 items-center gap-1 p-2 bg-BgPrimary text-white rounded hover:bg-BgPrimaryHover"
              onClick={() => setShowAnswer((prev) => !prev)}
            >
              {showAnswer ? (
                <>
                  <EyeOff size={16} />
                  Hide Answer
                </>
              ) : (
                <>
                  <Eye size={16} />
                  Show Answer
                </>
              )}
            </button>
          </div>
          {/* Conditionally render answer and explanation */}
          {showAnswer && (
            <>
              <Separator className=" my-3 bg-gray-300" />
              <p className="text-TextSecondary text-[16px] font-light">
                <strong>Correct Answer:</strong>{" "}
                <MathJax inline>{mcq?.questions?.correctOption}</MathJax>
              </p>
              <p className="text-gray-700 text-[16px] font-light">
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
