/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/category/categoryApi";
import { DashboardLoader } from "@/loader/DashboardLoader";
import { Eye, HardDrive, SquarePen, Tags, Trash2 } from "lucide-react";
import { TResponse } from "@/types";
import { PaginationCard } from "@/lib/PaginationCard";
import { TCategory } from "@/types/common.data";
import Swal from 'sweetalert2'


export interface AllCategoriesProps {
  onSelectCategory?: (id: string, name: string, slug: string) => void;
}

export const AllCategories: React.FC<AllCategoriesProps> = ({
  onSelectCategory,
}) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isFetching } = useGetAllCategoriesQuery({ page, limit });
  const total = data?.meta?.total ?? 0;
  const [deleteCategory] = useDeleteCategoryMutation();

  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this category?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });
  
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting...',
        text: 'Please wait while the category is being deleted',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
      });
  
      try {
        const res = (await deleteCategory(id)) as TResponse<any>;
  
        if (res.error) {
          Swal.fire({
            title: 'Error!',
            text: res.error.data.message,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: 'Deleted!',
            text: 'Category deleted successfully',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
          });
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? `Error: ${err.message}` : "Something went wrong";
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        title: 'Cancelled',
        text: 'Category deletion was cancelled',
        icon: 'info',
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };
  
  

  const handleEdit = (id: string, name: string, slug: string) => {
    onSelectCategory?.(id, name, slug);
  };

  const renderTableRows = () => {
    return data?.data?.map((item: TCategory) => (
      <TableRow key={item._id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Tags size={22} className="text-gray-600" />
           <p className="text-gray-600 text-lg hind-siliguri-light"> {item.title}</p>
          </div>
        </TableCell>
        <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
          <Eye size={20} color="#363636" />
          <SquarePen
            onClick={() => handleEdit(item._id, item.title, item.slug)}
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

  if (isFetching) {
    return (
      <div>
        <DashboardLoader />
      </div>
    );
  }

  if (data?.data?.length === 0) {
    return <div className="flex items-center justify-center flex-col mt-20">
      <HardDrive size={40} className=" text-gray-400" />
      <h1 className="text-gray-400">No Category Found</h1>
    </div>;
  }

  return (
    <div>
      <Table>
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
  );
};
