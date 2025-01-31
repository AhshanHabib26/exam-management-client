import { IFeedback } from "@/types/common.data";
import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (data) => ({
        url: "/feedback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),
    getAllFeedback: builder.query({
      query: (args = {}) => {
        const params = new URLSearchParams();

        // Only append page and limit if they are provided
        if (args.page !== undefined && args.page !== null) {
          params.append("page", args.page.toString());
        }
        if (args.limit !== undefined && args.limit !== null) {
          params.append("limit", args.limit.toString());
        }
        Object.keys(args).forEach((key) => {
          if (
            key !== "page" &&
            key !== "limit" &&
            args[key] !== undefined &&
            args[key] !== null
          ) {
            params.append(key, args[key]);
          }
        });

        return {
          url: `/feedback?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Feedback"],
      transformResponse: (response: TResponseRedux<IFeedback>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getUserFeedback: builder.query({
      query: () => ({
        url: "/feedback/user",
        method: "GET",
      }),
      providesTags: ["Feedback"],
    }),

    respondFeedback: builder.mutation({
      query: ({ id, data }) => ({
        url: `/feedback/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),

  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllFeedbackQuery,
  useGetUserFeedbackQuery,
  useRespondFeedbackMutation,
} = feedbackApi;
