/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import {
  useDeleteQuizCategoryMutation,
  useGetAllQuizCategoriesQuery,
} from "@/redux/features/quiz/category/categoryApi";
import { TResponse } from "@/types";
import { HardDrive, ListPlus, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AllQuizCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllQuizCategoriesQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const total = data?.meta?.total ?? 0;
  const [deleteCategory] = useDeleteQuizCategoryMutation();

  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this exam category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while the exam category is being deleted",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      try {
        const res = (await deleteCategory(id)) as TResponse<any>;

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
            text: "Exam category deleted successfully",
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
        text: "Exam category deletion was cancelled",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/dashboard/create-exam-category/${id}`);
  };

  const renderTableRows = () => {
    return data?.data?.map((item) => (
      <TableRow key={item._id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <img src={item.imageUrl} className="w-8" />
            {item.name}
          </div>
        </TableCell>
        <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
          <SquarePen
            onClick={() => handleEdit(item._id)}
            size={20}
            color="green"
          />
          <Trash2
            onClick={() => deleteHandler(item._id)}
            size={20}
            color="red"
          />
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div className="flex items-end justify-end mt-4">
        <Link
          to="/admin/dashboard/create-exam-category"
          className="flex items-center bg-BgPrimary hover:bg-BgPrimaryHover text-white px-4 py-3 gap-2 rounded-lg text-md"
        >
          <ListPlus size={20} />
          Create Exam Category
        </Link>
      </div>
      <div>
        <Separator className="my-5" />
        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No Exam Category Found</h1>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
            <div className="my-5">
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
