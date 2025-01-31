/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import { TResponse } from "@/types";
import { IMCQ } from "@/types/common.data";
import { HardDrive, ListPlus, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UploadQuiz from "./UploadMcq";
import { Button } from "@/components/ui/button";
import { useDeleteMcqMutation, useGetAllMcqQuery } from "@/redux/features/quiz/mcq/mcqApi";
import { MCQCard } from "@/components/dashboard/admin/Mcq/McqCard";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

export const AllMcqPage = () => {
  const user = useAppSelector(selectCurrentUser);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [deleteMcq] = useDeleteMcqMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const limit = 25;
  const { data, isLoading } = useGetAllMcqQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const total = data?.meta?.total ?? 0;


  const toggleShowDetails = (id: string) => {
    if (activeQuestionId === id) {
      // If the clicked question is already open, close it
      setActiveQuestionId(null);
    } else {
      // Otherwise, open the clicked question and close others
      setActiveQuestionId(id);
    }
  };

  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this mcq?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while the mcq is being deleted",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      try {
        const res = (await deleteMcq(id)) as TResponse<any>;

        if (res.error) {
          Swal.fire({
            title: "Error!",
            text: res.error.data.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "MCQ deleted successfully",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? `Error: ${err.message}`
            : "Something went wrong";
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        title: "Cancelled",
        text: "MCQ deletion was cancelled",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="mt-4">
      <div className="mb-2">
        <h1 className="text-xl font-semibold text-gray-700">
          MCQ <span>({total})</span>
        </h1>
      </div>
      <hr className="mb-4" />
      {
        user?.role === "admin" && <div>
          <div className="flex items-end justify-end mt-2 gap-2">
            <div>
              <Link to="/admin/dashboard/create-mcq">
                <Button className=" bg-BgPrimary hover:bg-BgPrimaryHover py-5 text-lg font-light">
                  <ListPlus />
                  Create MCQ
                </Button>
              </Link>
            </div>
            <div>
              <Button
                className=" bg-green-600 hover:bg-green-700 py-5 text-lg font-light"
                onClick={handleButtonClick}
              >
                <Upload />
                Upload Quiz
              </Button>
              <UploadQuiz openDialog={isDialogOpen} onClose={handleCloseDialog} />
            </div>
          </div>
        </div>
      }
      <div>
        {
          user?.role === "admin" && <Separator className="my-5" />
        }

        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No MCQ Found</h1>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1">
              {data?.data?.map((mcq: IMCQ) => (
                <MCQCard
                  mcq={mcq}
                  key={mcq._id}
                  deleteHandler={deleteHandler}
                  isActive={mcq._id === activeQuestionId}
                  toggleShowDetails={() => toggleShowDetails(mcq._id)}
                />
              ))}
            </div>
            <div className="my-5 flex items-end justify-end">
              <PaginationCard
                page={page}
                limit={limit}
                total={total}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
