import DCountInfo from "@/components/dashboard/admin/DHome/DCountInfo";
import DSection from "@/components/dashboard/admin/DHome/DSection";
import Notification from "@/components/dashboard/user/Notification/Notification";
import { useGetuserProfileQuery } from "@/redux/features/auth/authApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DHomePage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetuserProfileQuery({
    refetchOnMountOrArgChange: false,
  });
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="mt-3">
      <Notification user={data?.data} />
      <DSection title="All Info">
        <DCountInfo />
      </DSection>
    </div>
  );
};

export default DHomePage;
