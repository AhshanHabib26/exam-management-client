import { TCommentProps } from "@/types/common.data";
import { Trash2 } from "lucide-react";
import moment from "moment";
import { Link } from "react-router-dom";

const CommentCard: React.FC<TCommentProps> = ({ comment, deleteHandler }) => {
  return (
    <div className=" border border-gray-200 p-2 rounded-md mb-3">
      <div>
        <div className=" flex items-center flex-wrap gap-2">
          <h1 className=" w-[30px] h-[30px] text-sm  rounded-full flex items-center  justify-center bg-BgPrimary text-white font-light">
            {comment?.user?.initials ? comment?.user?.initials : "AN"}
          </h1>
          <p className="text-TextPrimary font-medium">
            {comment?.user?.fullname ? comment?.user?.fullname : "Anonymous"}
          </p>
          <span className="text-sm font-medium text-gray-500 inline-block">
            Commented on
          </span>
          <Link to={`/blog/${comment?.post.slug}`}>
            <p className="text-TextPrimary font-medium text-lg">
              {comment?.post?.title}
            </p>
          </Link>
        </div>
        <div className="w-full">
          <div className=" my-2 ml-5 bg-gray-100 p-2 rounded-lg">
            <h1>{comment?.description}</h1>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end gap-3">
        <p className="text-sm text-gray-500">
          {" "}
          {moment(comment?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <Trash2
          onClick={() => deleteHandler?.(comment?._id)}
          size={18}
          className="text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CommentCard;
