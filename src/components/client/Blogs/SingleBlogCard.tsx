import { TBlogProps } from "@/types/common.data";
import userImg from "../../../assets/icons/profile.png";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaEye, FaThumbsUp } from "react-icons/fa6";
import { toast } from "sonner";
import { useLikePostMutation } from "@/redux/features/post/postApi";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { FolderCheck, Tags } from "lucide-react";


const SingleBlogCard: React.FC<TBlogProps> = ({ post }) => {
  const shareUrl = window.location.href;
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId;
  const liked = userId ? post?.likes.includes(userId) : false;
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
    <div className="text-gray-300 border border-gray-800 mb-4 p-3 rounded-lg">
      <div>
        <h1 className="text-xl font-semibold">{post?.title}</h1>
        <p
          className=" text-lg font-light my-1 select-none"
          dangerouslySetInnerHTML={{
            __html: `${post?.description}`,
          }}
        />
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-1">
          <FolderCheck size={22} className="text-gray-700" />{" "}
          <h1 className=" border border-gray-700 border-dashed px-2 text-white rounded-sm font-light text-md">
            {post?.category?.title}
          </h1>
        </div>
        <div>
          {post?.tags?.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <Tags size={22} className="text-gray-700" />
              {post.tags.map((tag, index) => (
                <div key={index}>
                  <p className="border border-gray-700 border-dashed px-2 text-white rounded-sm hind-siliguri-light text-md">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr className=" my-3 border-[0.5] border-dashed border-gray-800" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {token ? (
              <FaThumbsUp
                size={18}
                onClick={handleLike}
                className={`cursor-pointer ${
                  liked ? "text-blue-500" : "text-gray-300"
                }`}
              />
            ) : (
              <FaThumbsUp size={18} className=" cursor-not-allowed" />
            )}
            <span className="ml-1  select-none">
              {isLoading ? "..." : post?.likesCount}
            </span>
          </div>
          <div className="flex items-center">
            <FaEye size={18} className=" cursor-pointer" />
            <span className="ml-1 select-none">{post?.viewsCount}</span>
          </div>
          <div className="flex items-center">
            <IoChatbubbleEllipsesSharp className=" cursor-pointer" size={18} />
            <span className="ml-1 select-none">
              {Array.isArray(post?.comments)
                ? post?.comments?.length
                : post?.comments}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={28} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={28} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={28} round />
          </LinkedinShareButton>
          <PinterestShareButton url={shareUrl} media={userImg}>
            <PinterestIcon size={28} round />
          </PinterestShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={28} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
