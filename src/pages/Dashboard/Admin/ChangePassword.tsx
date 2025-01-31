/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatePassword] = useUpdatePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading....");
    if (!oldPassword || !newPassword) {
      return toast.error("All fields are required", {
        id: toastId,
        duration: 2000,
      });
    }

    try {
      const userPass = {
        oldPassword,
        newPassword,
      };

      const res = await updatePassword(userPass).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        dispatch(logout());
        navigate("/login");
      }
    } catch (err: any) {
      if (err.res?.message) {
        toast.error(err.res?.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("An unknown error occurred", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="my-5">
      <div className="grid max-w-xs lg:max-w-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800 text-center">
          Change Password
        </h1>
        <div className="mt-2">
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              value={oldPassword}
              className="h-[50px]"
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              type="password"
              value={newPassword}
              className="h-[50px] my-3"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex items-end justify-end">
              <Button className=" bg-BgPrimary hover:bg-BgPrimaryHover">
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
