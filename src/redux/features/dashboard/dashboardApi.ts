import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboardCounts: builder.query({
      query: () => ({
        url: "/dashboard/counts",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
    getDailyBlogsInfo: builder.query({
      query: () => ({
        url: "/dashboard/daily-blogs",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetAllDashboardCountsQuery, useGetDailyBlogsInfoQuery } =
  dashboardApi;
