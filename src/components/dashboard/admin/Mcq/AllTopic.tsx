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
import { IMCQTopic } from "@/types/common.data";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { useDeleteMcqTopicMutation, useGetAllMcqTopicesQuery } from "@/redux/features/quiz/mcq/topicApi";


export interface AllTopicProps {
  onSelectTopic?: (id: string, name: string, mcqSubject: string) => void;
  handleVisible?: () => void;
}

export const AllTopic: React.FC<AllTopicProps> = ({
  onSelectTopic, handleVisible
}) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isFetching } = useGetAllMcqTopicesQuery({ page, limit });
  const total = data?.meta?.total ?? 0;
  const [deleteMcqTopic] = useDeleteMcqTopicMutation();
  const dispatch = useDispatch();
  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this topic?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting...',
        text: 'Please wait while the topic is being deleted',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      try {
        const res = (await deleteMcqTopic(id)) as TResponse<any>;

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
            text: 'Topic deleted successfully',
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
        text: 'Topic deletion was cancelled',
        icon: 'info',
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };


  const handleEdit = (id: string, name: string, mcqSubject: string) => {
    onSelectTopic?.(id, name, mcqSubject);
    handleVisible?.();
  };


  const renderTableRows = () => {
    return data?.data?.map((item: IMCQTopic) => (
      <TableRow key={item?._id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Tags size={22} className="text-gray-600" />
            <p className="text-gray-600 text-lg hind-siliguri-light"> {item?.name}</p>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-gray-600 text-lg hind-siliguri-light"> {item?.mcqSubject.name}</p>
        </TableCell>
        <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
          <Eye size={20} color="#363636" />
          <SquarePen
            onClick={() => handleEdit(item?._id, item?.name, item?.mcqSubject?._id)}
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
      <h1 className="text-gray-400">No Topic Found</h1>
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
