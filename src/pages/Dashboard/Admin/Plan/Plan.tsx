/* eslint-disable @typescript-eslint/no-explicit-any */
import { setLoading } from "@/redux/features/global/globalSlice";
import {
  useDeletePackageMutation,
  useGetAllPackageQuery,
} from "@/redux/features/package/packageApi";
import { IPackage } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import { TResponse } from "@/types";
const PlanPage = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetAllPackageQuery({});
  const [deletePackage] = useDeletePackageMutation();
  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this package?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while the package is being deleted",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      try {
        const res = (await deletePackage(id)) as TResponse<any>;

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
            text: "Package deleted successfully",
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
        text: "Package deletion was cancelled",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Render table rows with dynamic data
  const renderTableRows = () => {
    return (
      data?.data?.map((item: IPackage) => (
        <TableRow key={item?._id}>
          <TableCell>{item?.title}</TableCell>
          <TableCell>{item?.price}</TableCell>
          <TableCell>{item?.offerPrice}</TableCell>
          <TableCell>{item?.isOfferActive ? "Yes" : "No"}</TableCell>
          <TableCell>{item?.points}</TableCell>
          <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
            <Link to={`/admin/dashboard/create-package/${item._id}`}>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(item?._id)}
              size="sm"
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      )) ?? null // Ensure a fallback in case `data?.data?.result` is undefined
    );
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-700 my-4">All Package</h1>
      <div>
        <Separator />
        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No Package Found</h1>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Offer Price</TableHead>
                  <TableHead>Is Offer Active</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanPage;
