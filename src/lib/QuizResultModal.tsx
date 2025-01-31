import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalQuestions: number;
  totalMarks: number;
  correctCount: number;
};

const QuizResultModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  totalMarks,
  correctCount,
}) => {
  if (!isOpen) return null;

  const isUnder80Percent =
    Math.round((correctCount / totalQuestions) * 100) < 80;

  // Determine the text color based on performance
  const textColor = isUnder80Percent ? "text-red-600" : "text-green-600";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl text-gray-800 font-semibold mb-4 text-center">
          Quiz Submitted
        </h2>

        <div
          className={`text-center rounded-full p-10 mx-auto w-[120px] h-[120px] flex items-center justify-center ${
            Math.round((correctCount / totalQuestions) * 100) < 80
              ? "bg-red-600"
              : "bg-green-600"
          }`}
        >
          <div className="flex items-center justify-center">
            <p className="text-white text-3xl font-bold">
              <span className="mr-2">{correctCount}</span>
              <span className="mr-2">/</span>
              <span>{totalQuestions}</span>
            </p>
          </div>
        </div>
        {totalQuestions > 0 ? (
          <p className="mt-4 text-lg text-gray-800 font-semibold text-center">
            {Math.round((correctCount / totalQuestions) * 100) < 80
              ? "Keep Trying!"
              : "Great Job!"}{" "}
          </p>
        ) : null}

        <p className="mt-2 text-center text-gray-800">
          You answered <span className=" font-semibold">{correctCount}</span>{" "}
          out of <span className=" font-semibold">{totalQuestions}</span>{" "}
          questions correctly!
        </p>
        <p className="text-center text-gray-800">
          You achieved a total of{" "}
          <span className={` font-semibold ${textColor}`}>{totalMarks}</span>{" "}
          marks.
        </p>

        <div className="flex justify-end mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-BgPrimary text-white rounded mr-2"
          >
            OK
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResultModal;
