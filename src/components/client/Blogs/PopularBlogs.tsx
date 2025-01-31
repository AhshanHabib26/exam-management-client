import PopularBlogCard from "./PopularBlogCard";
import { TBlog } from "@/types/common.data";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";

const PopularBlogs = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllPostQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const topBlogs = data?.data
    ? [...data.data]
        .sort((a: TBlog, b: TBlog) => b.viewsCount - a.viewsCount)
        .slice(0, 10)
    : [];

  return (
    <div className="shadow-md border-[0.5px] border-gray-800 rounded-md">
      <div className="bg-gray-900 rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">Popular Post</h1>
      </div>
      <div className="p-2">
        <div>
          {topBlogs.map((post: TBlog, index) => (
            <PopularBlogCard
              post={post}
              key={post?._id}
              isLast={index === topBlogs.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularBlogs;
