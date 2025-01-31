import { TBlogProps } from "@/types/common.data";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props extends TBlogProps {
  isLast?: boolean;
}

const PopularBlogCard: React.FC<Props> = ({ post, isLast }) => {
  return (
    <div
      className={`text-gray-300 ${isLast ? "" : "border-b border-gray-800 border-dashed"
        }`}
    >
      <div>
        <p className="bg-gray-800 inline-block px-1 mt-2 rounded text-sm font-light">
          {post?.category?.title ? post?.category?.title : "Uncategorised"}
        </p>
        <div className="flex items-center mb-1 justify-between">
          <Link to={`/blog/${post.slug}`}>
            <h1 className="text-[16px] hind-siliguri-medium hover:text-BgPrimary">
              {post.title}
            </h1>
          </Link>
          <div>
            <FaAngleRight className="text-gray-300" size={15} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PopularBlogCard;
