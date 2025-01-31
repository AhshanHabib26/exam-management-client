import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { TBlog } from "@/types/common.data";
import RecentBlogsCard from "./RecentBlogsCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";

const RecentBlogs = () => {
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

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // Filter for recent blogs created in the last 24 hours
  const recentBlogs = data?.data
    ? [...data.data]
        .filter((post: TBlog) => {
          if (post.createdAt) {
            const createdAt = new Date(post.createdAt);
            return createdAt >= yesterday && createdAt <= today;
          }
          return false;
        })
        .slice(0, 10)
    : [];

  // Get previous posts excluding the recent ones
  const previousBlogs = data?.data
    ? [...data.data]
        .filter((post: TBlog) => {
          if (post.createdAt) {
            const createdAt = new Date(post.createdAt);
            return createdAt < yesterday; // Get posts older than yesterday
          }
          return false;
        })
        .slice(0, 10) // Take up to 10 random previous posts
    : [];

  // Combine recent blogs and previous blogs to ensure we always have 10
  const blogsToDisplay = [...recentBlogs, ...previousBlogs].slice(0, 10);

  return (
    <div className="shadow-md border-[0.5px] border-gray-800 rounded-md">
      <div className="bg-gray-900 rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">Recent Blogs</h1>
      </div>
      <div className="p-4">
        <div>
          {blogsToDisplay.length > 0
            ? blogsToDisplay.map((post: TBlog, index) => (
                <RecentBlogsCard
                  post={post}
                  key={post._id}
                  isLast={index === blogsToDisplay.length - 1}
                />
              ))
            :  <p>No posts available.</p>}
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
