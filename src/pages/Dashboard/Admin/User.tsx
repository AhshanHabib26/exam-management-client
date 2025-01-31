import {
  useActiveUserRoleMutation,
  useDeactiveUserRoleMutation,
  useGetAllUsersQuery,
  useUserBlockMutation,
  useUserUnblockMutation,
} from "@/redux/features/auth/authApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HardDrive } from "lucide-react";
import { PaginationCard } from "@/lib/PaginationCard";
import moment from "moment";
import { Button } from "@/components/ui/button";
import SearchBtn from "@/components/client/SearchBtn";
import { Separator } from "@/components/ui/separator";
import { handleUserAction } from "@/components/dashboard/admin/User/UserAction";

export default function UserPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [userBlock] = useUserBlockMutation();
  const [userUnblock] = useUserUnblockMutation();
  const [activeUserRole] = useActiveUserRoleMutation();
  const [deactiveUserRole] = useDeactiveUserRoleMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllUsersQuery(
    { page, limit, searchTerm: searchTerm.trim() ? searchTerm : undefined },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);


  // Render table rows with dynamic data
  const renderTableRows = () => {
    return data?.data?.map((user) => (
      <TableRow key={user?._id}>
        <TableCell>{user?.fullname}</TableCell>
        <TableCell>{user?.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          {moment(user?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </TableCell>
        <TableCell className="text-right">
          {
            user.isMainAdmin ? null : <div className="flex items-center justify-end gap-2">

              {user.isBlocked ? (
                <Button
                  onClick={() =>
                    handleUserAction(
                      userUnblock,
                      user._id as string,
                      "Are you sure you want to unblock this user?"
                    )
                  }
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                >
                  Unblock
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleUserAction(
                      userBlock,
                      user._id as string,
                      "Are you sure you want to block this user?"
                    )
                  }
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Block
                </Button>
              )}
              
              {user.isAdmin ? (
                <Button
                  onClick={() =>
                    handleUserAction(
                      deactiveUserRole,
                      user._id as string,
                      "User's role has been changed to regular user."
                    )
                  }
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                >
                  Remove Admin
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleUserAction(
                      activeUserRole,
                      user._id as string,
                      "Are you sure you want to make this user an admin?"
                    )
                  }
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Promote to Admin
                </Button>
              )}
            </div>
          }
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">All User</h1>
        <SearchBtn setSearchTerm={setSearchTerm} inputBelow={false} />
      </div>
      <Separator className="mt-5" />
      <div>
        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className="text-gray-400" />
            <h1 className="text-gray-400">No User Found!</h1>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
            {total > limit && (
              <div className="my-5 flex items-end justify-end">
                <PaginationCard
                  page={page}
                  limit={limit}
                  total={total}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
