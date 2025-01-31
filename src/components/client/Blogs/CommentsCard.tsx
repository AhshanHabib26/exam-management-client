import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TBlogProps } from "@/types/common.data";
import { FilePenLine, Trash2 } from "lucide-react";
import moment from "moment";
const CommentsCard: React.FC<TBlogProps> = ({ post }) => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="mt-5">
      <h1 className="text-2xl text-gray-300 hind-siliguri-semibold">
        Comments
        <span className="ml-2">
          ({post?.comments && post?.comments?.length ? post?.comments?.length : 0})
        </span>
      </h1>

      <hr className="border-b-[0.5] border-gray-800 mt-2" />
      <div className="mt-5 mb-10">
        {post?.comments && post?.comments?.length === 0 ? (
          <div>
            <p className="text-center text-xl hind-siliguri-light text-gray-300">
            No comments yet. Be the first to leave a comment!
            </p>
          </div>
        ) : (
          <div>
            <div>
              {post?.comments?.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-800 mb-4 p-2 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="w-[35px] h-[35px]  bg-BgPrimary text-gray-300 flex items-center justify-center rounded-full">
                        {item?.user?.initials}
                      </p>
                      <div>
                        <h1 className="text-sm hind-siliguri-medium">
                          {item?.user?.fullname}
                        </h1>
                        <p className="text-xs hind-siliguri-medium">
                          {" "}
                          {moment(item?.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                      </div>
                    </div>
                    {user?.role === "admin" ? (
                      <div className="flex items-center gap-2 cursor-pointer">
                        <FilePenLine size={18} className="text-slate-300" />
                        <Trash2 size={18} className="text-red-500" />
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-3 ml-16">
                    <h1 className="text-lg hind-siliguri-medium bg-gray-900 p-2 rounded-lg">
                      {item?.description}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsCard;
