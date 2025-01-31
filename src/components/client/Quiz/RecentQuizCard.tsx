import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { isNewBlog } from "@/lib/isNew";
import { TQuizProps } from "@/types/common.data";

interface Props extends TQuizProps {
  isLast?: boolean;
}

const RecentQuizCard: React.FC<Props> = ({ quiz, isLast }) => {
  return (
    <div
      className={`text-TextFourth ${
        isLast ? "" : "border-b border-gray-300 border-dashed"
      }`}
    >
      <Link to={`/quiz/quiz-details/${quiz?._id}`}>
        <div className="flex items-center justify-between">
          <h1 className="my-1 text-[16px] font-light hover:text-TextSecondary">
            {quiz?.title}
          </h1>
          <div>
            {quiz?.createdAt && (
              <div>
                {isNewBlog(quiz?.createdAt) ? (
                  <div>
                    <p className="text-sm text-red-500 capitalize italic">new</p>
                  </div>
                ) : (
                  <div>
                    <FaAngleRight className="text-TextFourth" size={15} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecentQuizCard;
