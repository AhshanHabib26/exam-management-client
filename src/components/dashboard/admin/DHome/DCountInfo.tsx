
import { useGetAllDashboardCountsQuery } from "@/redux/features/dashboard/dashboardApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import {  FileQuestion, Grip, MessageCircle, PackageOpen, UserRound } from "lucide-react";
import { useEffect } from "react";
import { FaBook } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import DCountInfoCard from "./DCountInfoCard";

const DCountInfo = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllDashboardCountsQuery({
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);
  
  const cardData = [
    {
      count: data?.data?.userCount,
      icon: <UserRound size={25} className="text-blue-500" />,
      bColor: "bg-blue-500",
      tColor: "text-blue-500",
      label: "User",
    },
    {
      count: data?.data?.postCount,
      icon: <FaBook size={25} className="text-cyan-500" />,
      bColor: "bg-cyan-500",
      tColor: "text-cyan-500",
      label: "Blog Post",
    },
    {
      count: data?.data?.postCategoryCount,
      icon: <FaBook size={25} className="text-cyan-500" />,
      bColor: "bg-cyan-500",
      tColor: "text-cyan-500",
      label: "Blog Category",
    },
    {
      count: data?.data?.examCount,
      icon: <FileQuestion size={25} className="text-green-500" />,
      bColor: "bg-green-500",
      tColor: "text-green-500",
      label: "Exam Set",
    },
    {
      count: data?.data?.examCategoryCount,
      icon: <FileQuestion size={25} className="text-green-500" />,
      bColor: "bg-green-500",
      tColor: "text-green-500",
      label: "Exam Category",
    },
    {
      count: data?.data?.totalParticipate,
      icon: <FileQuestion size={25} className="text-green-500" />,
      bColor: "bg-green-500",
      tColor: "text-green-500",
      label: "Exam Participate",
    },
    {
      count: data?.data?.mcqCount,
      icon: <Grip size={25} className="text-orange-500" />,
      bColor: "bg-orange-500",
      tColor: "text-orange-500",
      label: "MCQ",
    },
    {
      count: data?.data?.mcqCategoryCount,
      icon: <Grip size={25} className="text-orange-500" />,
      bColor: "bg-orange-500",
      tColor: "text-orange-500",
      label: "MCQ Category",
    },
    {
      count: data?.data?.packageCount,
      icon: <PackageOpen size={25} className="text-slate-500" />,
      bColor: "bg-slate-500",
      tColor: "text-slate-500",
      label: "Active Package",
    },
    {
      count: data?.data?.commentCount,
      icon: <MessageCircle size={25} className="text-emerald-500" />,
      bColor: "bg-emerald-500",
      tColor: "text-emerald-500",
      label: "Comments",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {cardData.map((card, index) => (
        <DCountInfoCard
          key={index}
          count={card.count}
          icon={card.icon}
          bColor={card.bColor}
          label={card.label}
          tColor={card.tColor}
        />
      ))}
    </div>
  );
};

export default DCountInfo;
