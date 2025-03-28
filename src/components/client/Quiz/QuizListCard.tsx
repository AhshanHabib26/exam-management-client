import { TQuizProps } from "@/types/common.data";
import QuizImg from "../../../assets/images/quizImg.jpg";
import {
  AlarmClock,
  BookCheck,
  FileQuestion,
  Gem,
  Layers2,
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
      <Link to={token ? `/quiz/quiz-details/${quiz?._id}` : "#"}>
        {" "}
        <div className="border border-gray-300 shadow hover:shadow-xl p-2 mb-3 rounded-md relative">
          <div className="flex gap-1">
            <div>
              <img
                src={QuizImg}
                className="w-[140px] hidden md:block lg:block rounded-md"
                alt=""
              />
            </div>
            <div className=" w-full">
              <div className="flex gap-1 items-start lg:items-center">
                <BookCheck className=" text-TextFourth mt-1" size={16} />
                <h1 className="text-TextFourth hover:text-TextSecondary text-[16px] font-semibold">
                  {quiz?.title}
                </h1>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center">
                  <FileQuestion className="text-TextFourth" size={16} />
                  <h1 className="text-TextFourth text-[16px] font-light">
                    Question:{" "}
                    {quiz?.questions?.length ? quiz?.questions?.length : 0}
                  </h1>
                </div>
                <div className="flex gap-1 items-center">
                  <AlarmClock className="text-TextFourth" size={16} />
                  <h1 className="text-TextFourth text-[16px] font-light">
                    Duration: {quiz?.duration} Minutes
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <IoPricetagsOutline className="text-TextFourth" size={16} />
                  <p
                    className={`text-[16px] font-light ${quiz?.difficultyLevel === "Easy"
                      ? "text-orange-500"
                      : quiz?.difficultyLevel === "Medium"
                        ? "text-red-500"
                        : "text-green-500"
                      }`}
                  >
                    {quiz?.difficultyLevel}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <SquareBottomDashedScissors
                    className="text-TextFourth"
                    size={16}
                  />
                  <p className="text-red-500 text-[16px] font-light">
                    Error Penalty: {quiz?.penaltyPerIncorrectAnswer}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <Gem className="text-TextFourth" size={16} />
                <h1 className="text-TextFourth text-[16px] font-light">
                  Points Required: {quiz?.pointsRequired}
                </h1>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center">
                  <Layers2 className="text-TextFourth" size={16} />
                  <h1 className="text-TextFourth text-[16px] font-light">
                    {quiz?.category?.name}
                  </h1>
                </div>
                <div className=" flex items-center gap-1">
                  <Layers3 className="text-TextFourth" size={16} />
                  <h1 className="text-TextFourth text-[16px] font-light">
                    {quiz?.subject?.name}
                  </h1>
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
