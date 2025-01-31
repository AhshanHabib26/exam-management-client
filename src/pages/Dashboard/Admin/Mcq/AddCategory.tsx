/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TResponse } from "@/types";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AllCategory } from "@/components/dashboard/admin/Mcq/AllCategory";
import { useCreateMcqCategoryMutation, useUpdateMcqCategoryMutation } from "@/redux/features/quiz/mcq/categoryApi";

// Add University Page
export const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false)
  const [createMcqCategory] = useCreateMcqCategoryMutation();
  const [updateMcqCategory] = useUpdateMcqCategoryMutation();


  // Handler for creating a category
  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating...");

    if (!categoryName) {
      return toast.error("Category name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const categoryData = { name: categoryName, slug: categorySlug};
    try {
      const res = (await createMcqCategory(categoryData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Category added successfully", {
          id: toastId,
          duration: 1000,
        });
        setCategoryName("");
        setCategorySlug("")
        setIsVisible(false)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  // Handler for updating a category
  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating...");

    if (!categoryName || categoryId === null) {
      return toast.error("Category ID and name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const categoryData = { name: categoryName, slug: categorySlug};

    try {
      const res = (await updateMcqCategory({
        id: categoryId,
        data: categoryData,
      })) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("University updated successfully", {
          id: toastId,
          duration: 1000,
        });
        setCategoryName("");
        setCategorySlug("");
        setCategoryId(null);
        setIsVisible(false)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };


  const resetCategoryFields = useCallback(() => {
    setCategoryId(null);
    setCategoryName("");
    setCategorySlug("");
  }, []);

  const handleVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleClose = useCallback(() => {
    setIsVisible((prevState) => !prevState);
    resetCategoryFields();
  }, [resetCategoryFields]);



  return (
    <div>
      <div className="flex items-end justify-end my-4">

        {
          isVisible ? <Button onClick={handleClose} className="bg-red-600 hover:bg-red-500">
            Close
          </Button> :
            <Button onClick={handleVisible} className="bg-BgPrimary hover:bg-BgPrimaryHover">
              Add Category
            </Button>
        }
      </div>

      {
        isVisible && <form onSubmit={categoryId === null ? createHandler : updateHandler}>
          <div className="grid mt-5 max-w-xl mx-auto gap-2 border p-3 rounded-lg">
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                value={categoryName}
                onChange={(e) => {
                  const value = e.target.value;
                  setCategoryName(value);
                  setCategorySlug(value.trim().toLowerCase().replace(/ /g, "-"));
                }}
                type="text"
                name="name"
                className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
                placeholder="Category Name"
              />

              <Input
                value={categorySlug} 
                onChange={(e) => setCategorySlug(e.target.value)}
                type="text"
                name="slug"
                className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
                placeholder="Category Slug"
              />
            </div>
            <div className=" w-full flex items-end justify-end">
              <Button
                className={`h-[45px] ${categoryId === null ? "bg-blue-500 hover:bg-blue-600" : "bg-green-600 hover:bg-green-500"
                  }`}
              >
                {categoryId === null ? "Add Category" : "Update Category"}
              </Button>

            </div>
          </div>
        </form>
      }
      <Separator className="mt-5" />
      <div>
        <AllCategory
          onSelectMcqCategory={(id, name, slug) => {
            setCategoryId(id);
            setCategoryName(name);
            setCategorySlug(slug);
          }}
          handleVisible={handleVisible}
        />
      </div>
    </div>
  );
};
