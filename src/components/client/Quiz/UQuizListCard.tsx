import { TQuizProps } from "@/types/common.data";
import QuizImg from "../../../assets/images/quizImg.jpg";
import {
  AlarmClock,
  BookCheck,
  FileQuestion,
  Gem,
  Layers3,
  SquareBottomDashedScissors,
} from "lucide-react";
import { IoPricetagsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const UQuizListCard: React.FC<TQuizProps> = ({ quiz }) => {
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!token) {
      navigate("/login");
    }
  };
  return (
    <div onClick={handleClick}>
      {" "}
      <Link to={token ? `/quiz/quiz-details/${quiz._id}` : "#"}>
        {" "}
        <div className="border border-gray-200 shadow hover:shadow-xl p-3 mb-3 rounded-md relative">
          <div className="flex gap-2">
            <div>
              <img
                src={QuizImg}
                className="w-[140px] hidden md:block lg:block rounded-md"
                alt=""
              />
            </div>
            <div className=" w-full">
              <div className="flex gap-1 items-start lg:items-center">
                <BookCheck className=" text-gray-700" size={18} />
                <h1 className=" text-gray-700 hover:text-TextPrimary text-md hind-siliguri-semibold">
                  {quiz?.title}
                </h1>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center">
                  <FileQuestion className=" text-gray-700" size={18} />
                  <h1 className="text-gray-700">
                    Question:{" "}
                    {quiz?.questions?.length ? quiz?.questions?.length : 0}
                  </h1>
                </div>
                <div className="flex gap-1 items-center">
                  <AlarmClock className=" text-gray-700" size={18} />
                  <h1 className="text-gray-700">
                    Duration: {quiz?.duration} Minutes
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <IoPricetagsOutline className=" text-gray-700" size={18} />
                  <p
                    className={`text-md text-gray-700 hind-siliguri-light ${quiz.difficultyLevel === "Easy"
                      ? "text-orange-500"
                      : quiz.difficultyLevel === "Medium"
                        ? "text-red-500"
                        : "text-green-500"
                      }`}
                  >
                    {quiz.difficultyLevel}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <SquareBottomDashedScissors
                    className=" text-gray-700"
                    size={18}
                  />
                  <p className="text-red-700">
                    Error Penalty: {quiz.penaltyPerIncorrectAnswer}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <Gem className=" text-gray-700" size={18} />
                <h1 className="text-gray-700">
                  Points Required: {quiz?.pointsRequired}
                </h1>
              </div>
              <div className="flex gap-1 items-center">
                <Layers3 className=" text-gray-700" size={18} />
                <div className="flex items-center gap-1">
                  {quiz?.tags?.slice(0, 2).map((t: string, index: number) => (
                    <div
                      key={index}
                      className="border-[0.5px] border-dashed px-3 py-[2px] text-sm border-gray-300 rounded-sm"
                    >
                      <p className="hind-siliguri-light">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UQuizListCard;
