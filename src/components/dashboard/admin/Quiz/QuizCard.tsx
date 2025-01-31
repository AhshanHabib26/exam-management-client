import React from "react";
import QuizImg from "../../../../assets/images/quizImg.jpg";
import { MdOutlineQuiz } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoPricetagsOutline } from "react-icons/io5";
import { LuFileQuestion } from "react-icons/lu";
import Styles from "../../../../style/QuizCard.module.css";
import { TQuizProps } from "@/types/common.data";
import { Eye, Gem, SquareBottomDashedScissors, SquarePen, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const QuizCard: React.FC<TQuizProps> = ({ quiz, deleteHandler }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/dashboard/create-exam/${quiz?._id}`);
  };

  return (
    <div
      className={`flex gap-2 border p-2 mb-2 rounded-lg ${Styles.QCMainContainer}`}
    >
      <div>
        <img
          className=" hidden lg:block rounded-lg select-none"
          src={QuizImg}
          width={110}
          height={100}
          alt={quiz?.title}
        />
      </div>
      <div className=" w-full">
        <div className="flex items-center gap-1">
          <MdOutlineQuiz className=" text-customPrimary" size={16} />
          <h1 className="text-lg font-regular">{quiz?.title}</h1>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <LuFileQuestion className=" text-customPrimary" size={16} />
              <p className="text-md hind-siliguri-light">
                {quiz?.questions?.length} (Question)
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FaRegClock className=" text-customPrimary" size={16} />
              <p className="text-md hind-siliguri-light">
                {quiz?.duration} Minutes
              </p>
            </div>
          </div>
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-1">
              <SquareBottomDashedScissors size={16} />
              <p className="text-red-500 text-[16px] font-light">
                Error Penalty: {quiz?.penaltyPerIncorrectAnswer}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <Gem size={16} />
              <h1 className=" text-[16px] font-light">
                Points Required: {quiz?.pointsRequired}
              </h1>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-1">
            <IoPricetagsOutline className=" text-customPrimary" size={16} />
            <p
              className={`text-md hind-siliguri-light ${quiz?.difficultyLevel === "Easy"
                ? "text-orange-500"
                : quiz?.difficultyLevel === "Medium"
                  ? "text-red-500"
                  : "text-green-500"
                }`}
            >
              {quiz?.difficultyLevel}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/quiz/quiz-details/${quiz?._id}`}>
              <Eye size={20} className="cursor-pointer" />
            </Link>
            <SquarePen
              onClick={handleEdit}
              size={20}
              className=" cursor-pointer"
            />
            <Trash2
              onClick={() => {
                if (deleteHandler) {
                  deleteHandler(quiz._id);
                }
              }}
              size={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
