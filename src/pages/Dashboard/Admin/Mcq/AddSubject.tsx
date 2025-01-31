/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TResponse } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area"
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { useCreateMcqSubjectMutation, useUpdateMcqSubjectMutation } from "@/redux/features/quiz/mcq/subjectApi";
import { useGetAllMcqCategoriesQuery } from "@/redux/features/quiz/mcq/categoryApi";
import { AllSubject } from "@/components/dashboard/admin/Mcq/AllSubject";

interface ICommon {
  id: string;
  name: string;
}

export const AddSubjectPage = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectSlug, setSubjectSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false)
  const [createMcqSubject] = useCreateMcqSubjectMutation();
  const [updateMcqSubject] = useUpdateMcqSubjectMutation();
  const dispatch = useDispatch();

  // Fetch all category
  const {
    data: categoryData,
    isFetching: isFetching,
    isError: isError,
  } = useGetAllMcqCategoriesQuery("");


  // Memoize categoey to avoid unnecessary recalculations
  const category = useMemo<ICommon[]>(
    () =>
      categoryData?.data?.map((item) => ({
        id: item._id,
        name: item.name,
      })) || [],
    [categoryData]
  );

  // Handle category change
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);

  // Handler for creating a category
  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating...");

    if (!subjectName || !selectedCategory) {
      return toast.error("All fields are required", {
        id: toastId,
        duration: 1500,
      });
    }

    const subjectData = { name: subjectName, slug: subjectSlug, mcqCategory: selectedCategory };
    try {
      const res = (await createMcqSubject(subjectData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Subject added successfully", {
          id: toastId,
          duration: 1000,
        });
        setSubjectName("");
        setSubjectSlug("");
        setSelectedCategory("")
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

  // Handler for updating a board
  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating...");

    if (!subjectName || subjectId === null) {
      return toast.error("Subject ID and name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const subjectData = { name: subjectName, slug: subjectSlug, mcqCategory: selectedCategory };

    try {
      const res = (await updateMcqSubject({
        id: subjectId,
        data: subjectData,
      })) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Subject updated successfully", {
          id: toastId,
          duration: 1000,
        });
        setSubjectName("");
        setSubjectSlug("");
        setSubjectId(null);
        setSelectedCategory("")
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

  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  const resetSubjectFields = useCallback(() => {
    setSubjectId(null);
    setSubjectName("");
    setSubjectSlug("");
    setSelectedCategory("");
  }, []);

  const handleVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleClose = useCallback(() => {
    setIsVisible((prevState) => !prevState);
    resetSubjectFields();
  }, [resetSubjectFields]);



  return (
    <div>
      <div className="flex items-end justify-end my-4">

        {
          isVisible ? <Button onClick={handleClose} className="bg-red-600 hover:bg-red-500">
            Close
          </Button> :
            <Button onClick={handleVisible} className="bg-BgPrimary hover:bg-BgPrimaryHover">
              Add Subject
            </Button>
        }
      </div>

      {
        isVisible && <form onSubmit={subjectId === null ? createHandler : updateHandler}>
          <div className="grid mt-5 max-w-xl mx-auto gap-2 border p-3 rounded-lg">
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Input
                value={subjectName}
                onChange={(e) => {
                  const value = e.target.value;
                  setSubjectName(value);
                  setSubjectSlug(value.trim().toLowerCase().replace(/ /g, "-"));
                }}
                type="text"
                name="name"
                className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
                placeholder="Subject Name"
              />

              <Input
                value={subjectSlug}
                onChange={(e) => setSubjectSlug(e.target.value)}
                type="text"
                name="slug"
                className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
                placeholder="Subject Name Slug"
              />
            </div>
            <div>
              {isError && <p>Error loading subject.</p>}
              <Select
                value={selectedCategory || ""}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger
                  className="h-[50px] hind-siliguri-light"
                  aria-label="Category"
                >
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {isFetching && (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  )}
                  {isError && (
                    <SelectItem value="error" disabled>
                      Error loading category
                    </SelectItem>
                  )}
                  <ScrollArea className=" h-[200px]">
                    {category.length > 0 ? (
                      category.map((ctg) => (
                        <SelectItem
                          className="text-lg hind-siliguri-light cursor-pointer"
                          key={ctg.id}
                          value={ctg.id}
                        >
                          {ctg.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="null" disabled>
                        No Category Available
                      </SelectItem>
                    )}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end justify-end">
              <Button
                className={`h-[45px] ${subjectId === null ? "bg-blue-500 hover:bg-blue-600" : "bg-green-600 hover:bg-green-500"
                  }`}
              >
                {subjectId === null ? "Add Subject" : "Update Subject"}
              </Button>

            </div>
          </div>
        </form>
      }
      <Separator className="mt-5" />
      <div>
        <AllSubject
          onSelectSubject={(id, name, slug, mcqCategory) => {
            setSubjectId(id);
            setSubjectName(name);
            setSubjectSlug(slug);
            setSelectedCategory(mcqCategory)
          }}
          handleVisible={handleVisible}
        />
      </div>
    </div>
  );
};
