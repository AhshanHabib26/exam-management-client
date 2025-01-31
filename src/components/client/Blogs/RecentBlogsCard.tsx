import { TBlogProps } from "@/types/common.data";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { isNewBlog } from "@/lib/isNew";

interface Props extends TBlogProps {
  isLast?: boolean;
}

const RecentBlogsCard: React.FC<Props> = ({ post, isLast }) => {
  return (
    <div
      className={`text-gray-300 ${
        isLast ? "" : "border-b border-gray-800 border-dashed"
      }`}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="flex items-center justify-between">
          <h1 className=" my-1 text-[16px] font-light hover:text-TextPrimary">
            {post.title}
          </h1>
          <div>
            {post?.createdAt && (
              <div>
                {isNewBlog(post.createdAt) ? (
                  <div>
                   <p className="text-sm text-red-500 font-thin capitalize italic">new</p>
                  </div>
                ) : (
                  <div>
                    <FaAngleRight className="text-gray-300" size={15} />
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

export default RecentBlogsCard;
