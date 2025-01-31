import { TBlogProps } from "@/types/common.data";
import {
  Book,
  Eye,
  MessageSquareMore,
  SquarePen,
  Tags,
  ThumbsUp,
  Trash2,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PostCard: React.FC<TBlogProps> = ({ post, deleteHandler }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/admin/dashboard/create-post/${post.slug}`);
  };

  return (
    <div className="flex items-start gap-4 bg-gray-50 text-gray-800 p-2 mb-3 rounded-lg">
      <div className="w-full">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <Book size={18} />
            <h1 className="text-lg hind-siliguri-regular">{post.title}</h1>
          </div>
          <div className="flex items-center gap-1">
            <UserRound size={20} />
            <p>{post?.user?.fullname}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Tags size={20} />
          <p>{post?.category?.title}</p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye size={20} />
              <p>{post.viewsCount}</p>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp size={20} />
              <p>{post.likesCount}</p>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareMore size={20} />
              <p>{post?.comments?.length}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <SquarePen
                onClick={handleEdit}
                size={20}
                className=" cursor-pointer"
              />
              <Trash2
                onClick={() => deleteHandler?.(post?._id)}
                size={20}
                className=" text-red-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
