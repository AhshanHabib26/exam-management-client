/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TResponse } from "@/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardLoader } from "@/loader/DashboardLoader";
import {
  useCreateQuizCategoryMutation,
  useGetSingleQuizCategoryQuery,
  useUpdateQuizCategoryMutation,
} from "@/redux/features/quiz/category/categoryApi";
import { Textarea } from "@/components/ui/textarea";

export const CreateQuizCategoryPage = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [postId, setPostId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch single post data if ID is available
  const { data: category, isFetching: isFetchingPost } =
    useGetSingleQuizCategoryQuery(id || "", {
      skip: !id,
    });

  const [createCategory] = useCreateQuizCategoryMutation();
  const [updateCategory] = useUpdateQuizCategoryMutation();

  // Set form fields when post data is fetched
  useEffect(() => {
    if (category) {
      setName(category?.data?.name || "");
      setDescription(category?.data?.description || "");
      setPostId(category?.data?._id || null);
      setImageUrl(category?.data?.imageUrl || null);
    }
  }, [category]);

  if (isFetchingPost) {
    return <DashboardLoader />;
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const toastId = toast.loading(
      postId ? "Category updating..." : "Category creating..."
    );

    try {
      const response = postId
        ? ((await updateCategory({
          id: postId,
          data: { name, description, imageUrl },
        })) as TResponse<any>)
        : ((await createCategory({
          name,
          description,
          imageUrl,
        })) as TResponse<any>);

      if (response.error) {
        toast.error(response.error.data.message, {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.success(
          postId ? "Quiz updated successfully" : "Quiz created successfully",
          {
            id: toastId,
            duration: 1000,
          }
        );
        resetForm();
        navigate("/admin/dashboard/exam-category");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
    }
  };

  // Reset form fields
  const resetForm = () => {
    setDescription("");
    setName("");
    setPostId(null);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-600 mt-5">Create Exam Category</h1>
      </div>
      <div>
        <Input
          className="h-[50px] mt-5"
          placeholder="Enter image URL"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className="my-3">
        <Input
          className="h-[50px]"
          type="text"
          placeholder="Category Name"
          aria-label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Textarea
          placeholder="Enter description"
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <Button
          type="button"
          className={`text-lg font-light px-3 py-6 ${postId
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
            }`}
          onClick={handleSubmit}
        >
          {postId ? "Update Exam Category" : "Create Exam Category"}
        </Button>


        <Link className=" bg-red-600 hover:bg-red-700 px-5 py-2 text-lg text-white font-light rounded-lg ml-2" to="/admin/dashboard/exam-category">Cancel</Link>


      </div>
    </div>
  );
};
