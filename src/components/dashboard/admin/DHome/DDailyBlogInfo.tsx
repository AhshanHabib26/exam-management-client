import Container from "@/lib/Container";
import { useGetDailyBlogsInfoQuery } from "@/redux/features/dashboard/dashboardApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DDailyBlogInfo = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetDailyBlogsInfoQuery({
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const blogData = data?.data?.map((item: string) => item);

  return (
    <Container>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={blogData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3B82F6"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default DDailyBlogInfo;
