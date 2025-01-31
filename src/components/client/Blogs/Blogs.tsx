import { useEffect, useState } from "react";
import SearchBtn from "../SearchBtn";
import BlogCard from "./BlogCard";
import { TBlog } from "@/types/common.data";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { PaginationCard } from "@/lib/PaginationCard";
import { HardDrive } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/features/global/globalSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching } = useGetAllPostQuery(
    { page, limit, searchTerm: searchTerm.trim() ? searchTerm : undefined },
    {
      refetchOnMountOrArgChange: false, // Prevent refetching on revisit
    }
  );

  const total = data?.meta?.total ?? 0;

  // Dispatch global loading state based on API fetching status
  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  return (
    <div>
      <SearchBtn inputBelow={true} setSearchTerm={setSearchTerm} />
      {data?.data?.length === 0 ? (
        <div className="flex items-center justify-center flex-col mt-20">
          <HardDrive size={40} className="text-gray-400" />
          <h1 className="text-gray-400">No Post Found</h1>
        </div>
      ) : (
        <div>
          <div className="mt-5">
            {data?.data?.map((post: TBlog) => (
              <BlogCard post={post} key={post._id} />
            ))}
          </div>
          {total > limit && (
            <div className="my-5 flex items-end justify-end">
              <PaginationCard
                page={page}
                limit={limit}
                total={total}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
