import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { USidebar } from "./USidebar";
import diamondImg from "../../../assets/icons/diamond.png"
import { useGetuserProfileQuery } from "@/redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useAppSelector } from "@/redux/hooks";
import { FaMoon, FaSun } from "react-icons/fa6";

const UserDashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState<React.ReactNode>(null);

  const { data, isLoading } = useGetuserProfileQuery({
    refetchOnMountOrArgChange: false,
  });
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
      setIcon(<FaSun className="text-yellow-500 mt-1" size={13} />);
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon");
      setIcon(<FaSun className="text-orange-500 mt-1" size={13} />);
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good evening");
      setIcon(<FaMoon className="text-blue-500 mt-1" size={13} />);
    } else {
      setGreeting("Good night");
      setIcon(<FaMoon className="text-gray-500 mt-1" size={13} />);
    }
  }, []);

  return (
    <div className="text-gray-950">
      <SidebarProvider>
        <USidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b mr-5">
            <div className="flex items-center gap-1 pl-1">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-1 h-4" />
              <div>
                <h1 className="text-[16px] font-medium">
                  Welcome to{" "}
                  <span className="text-TextPrimary">
                    {data?.data?.firstname ?? "Guest"}
                  </span>
                </h1>
                <div className="flex items-center flex-wrap gap-1">
                  <p className="text-sm uppercase text-gray-600">{user?.role}</p>
                  <span className="text-gray-600">|</span>
                  <p className=" text-gray-600">{greeting}</p>
                  <span className=" hidden lg:block"> {icon}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className={`flex items-center gap-1 ${data?.data?.totalPoints === 0 ? "bg-red-500" : "bg-green-500"} px-2 py-[3px] rounded-md`}>
                <img src={diamondImg} alt="" className=" size-5" />
                <p className="text-lg font-medium text-gray-100">{data?.data?.totalPoints ?? 0}</p>
              </div>
              <Button onClick={handleLogout} className="font-medium bg-red-600 hover:bg-red-700">Logout</Button>
            </div>
          </header>

          <div className="px-5">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default UserDashboardLayout;
