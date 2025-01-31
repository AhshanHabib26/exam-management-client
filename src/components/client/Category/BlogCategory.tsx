import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/common.data";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { Tags } from "lucide-react";

type BlogCategoryProps = {
  setSelectedCategoryId: (id: string) => void;
};

const BlogCategory: React.FC<BlogCategoryProps> = ({
  setSelectedCategoryId,
}) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="shadow-md border-[0.5px] border-gray-800 rounded-md  my-5">
      <div className="bg-gray-900 rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">All Category</h1>
      </div>
      <div className="p-4">
        <div>
          {data?.data?.map((category: TCategory) => (
            <div className="flex items-center gap-2 my-1">
              <Tags size={20} className="text-gray-300" />
              <p
                onClick={() => setSelectedCategoryId(category?._id)}
                className="text-[16px] font-light hover:text-TextPrimary cursor-pointer"
              >
                {category?.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCategory;
