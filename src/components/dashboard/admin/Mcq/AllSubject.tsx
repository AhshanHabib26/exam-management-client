/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Eye, HardDrive, SquarePen, Tags, Trash2 } from "lucide-react";
import { TResponse } from "@/types";
import { PaginationCard } from "@/lib/PaginationCard";
import Swal from 'sweetalert2'
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { IMCQSubject } from "@/types/common.data";
import { useDeleteMcqSubjectMutation, useGetAllMcqSubjectesQuery } from "@/redux/features/quiz/mcq/subjectApi";


export interface AllSubjectProps {
  onSelectSubject?: (id: string, name: string, slug: string, mcqCategory: string) => void;
  handleVisible?: () => void;
}

export const AllSubject: React.FC<AllSubjectProps> = ({
  onSelectSubject, handleVisible
}) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isFetching } = useGetAllMcqSubjectesQuery({ page, limit });
  const total = data?.meta?.total ?? 0;
  const [deleteMcqSubject] = useDeleteMcqSubjectMutation();
  const dispatch = useDispatch();
  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this subject?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting...',
        text: 'Please wait while the subject is being deleted',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      try {
        const res = (await deleteMcqSubject(id)) as TResponse<any>;

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
            text: 'Subject deleted successfully',
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
        text: 'Subject deletion was cancelled',
        icon: 'info',
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };


  const handleEdit = (id: string, name: string, slug: string, mcqCategory: string) => {
    onSelectSubject?.(id, name, slug, mcqCategory);
    handleVisible?.();
  };
  const renderTableRows = () => {
    return data?.data?.map((item: IMCQSubject) => (
      <TableRow key={item?._id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Tags size={22} className="text-gray-600" />
            <p className="text-gray-600 text-lg hind-siliguri-light"> {item?.name}</p>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-gray-600 text-lg hind-siliguri-light"> {item?.mcqCategory?.name ? item?.mcqCategory?.name : "N/A"}</p>
        </TableCell>
        <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
          <Eye size={20} color="#363636" />
          <SquarePen
            onClick={() => handleEdit(item?._id, item?.name, item?.slug, item?.mcqCategory?._id)}
            size={20}
            color="green"
          />
          <Trash2
            onClick={() => deleteHandler(item?._id)}
            size={20}
            color="red"
          />
        </TableCell>
      </TableRow>
    ));
  };
  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  if (data?.data?.length === 0) {
    return <div className="flex items-center justify-center flex-col mt-20">
      <HardDrive size={40} className=" text-gray-400" />
      <h1 className="text-gray-400">No Subject Found</h1>
    </div>;
  }

  return (
    <div>
      <Table>
        <TableBody>{renderTableRows()}</TableBody>
      </Table>
      {
        total > limit && <div className="my-5 flex items-end justify-end">
          <PaginationCard
            page={page}
            limit={limit}
            total={total}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      }
    </div>
  );
};
