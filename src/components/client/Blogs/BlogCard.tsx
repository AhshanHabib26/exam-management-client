import { TBlogProps } from "@/types/common.data";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaEye, FaThumbsUp } from "react-icons/fa6";
import { toast } from "sonner";
import { useLikePostMutation } from "@/redux/features/post/postApi";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";

const BlogCard: React.FC<TBlogProps> = ({ post }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId;
  const liked = userId ? post.likes.includes(userId) : false;
  const [likePost, { isLoading }] = useLikePostMutation();

  const handleLike = async () => {
    if (userId && liked) {
      toast.info("You've already liked this post!");
      return;
    }
    try {
      await likePost(post._id).unwrap();
    } catch {
      toast.error("Error liking the post");
    }
  };

  return (
    <div  className="text-gray-300 border border-gray-800 mb-4 p-3 rounded-lg">
    
      <div>
        <Link className="hover:text-TextPrimary" to={`/blog/${post.slug}`}>
          {" "}
          <h1 className="text-lg font-semibold">{post.title}</h1>
        </Link>
        <p
          className="text-sm lg:text-[16px] font-light my-1"
          dangerouslySetInnerHTML={{
            __html: `${post.description.slice(0, 180)}.....`,
          }}
        />
      </div>
      <div className="flex items-end justify-end">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {token ? (
              <FaThumbsUp
                size={16}
                onClick={handleLike}
                className={`cursor-pointer ${liked ? "text-blue-500" : "text-gray-300"
                  }`}
              />
            ) : (
              <FaThumbsUp size={16} className=" cursor-not-allowed" />
            )}
            <span className="ml-1  select-none">
              {isLoading ? "..." : post.likesCount}
            </span>
          </div>
          <div className="flex items-center">
            <FaEye size={16} className=" cursor-pointer" />
            <span className="ml-1 select-none">{post.viewsCount}</span>
          </div>
          <div className="flex items-center">
            <IoChatbubbleEllipsesSharp className=" cursor-pointer" size={18} />
            <span className="ml-1 select-none">
              {Array.isArray(post.comments)
                ? post.comments.length
                : post.comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
