import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { IQuizUserSubmission } from "@/types/common.data";
const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reservePointsQuiz: builder.mutation({
      query: (id) => ({
        url: `/submission/reserve-points/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Quiz"],
    }),
    submitQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/submission/submit-quiz/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Submission"],
    }),
    getAllUserQuizSubmission: builder.query({
      query: (args = {}) => {
        const params = new URLSearchParams();

        if (args.page !== undefined && args.page !== null) {
          params.set("page", args.page.toString());
        }
        if (args.limit !== undefined && args.limit !== null) {
          params.set("limit", args.limit.toString());
        }
        if (args.searchTerm && args.searchTerm.trim()) {
          params.set("searchTerm", args.searchTerm.trim());
        }

        Object.keys(args).forEach((key) => {
          if (
            key !== "page" &&
            key !== "limit" &&
            args[key] !== undefined &&
            args[key] !== null
          ) {
            params.set(key, args[key]);
          }
        });

        return {
          url: `/submission?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 300,
      providesTags: ["Post"],
      transformResponse: (response: TResponseRedux<IQuizUserSubmission[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getSubmissionQuiz: builder.query({
      query: (id) => ({
        url: `/submission/get-quiz-result/${id}`,
        method: "GET",
      }),
      providesTags: ["Submission"],
    }),
    delteSubmissionQuiz: builder.mutation({
      query: (id) => ({
        url: `/submission/delete-submission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Submission"],
    }),
    getUserQuizSubmissions: builder.query({
      query: () => ({
        url: "/submission/quiz-submissions",
        method: "GET",
      }),
      providesTags: ["Submission"],
    }),
    getUserQuizProgressReport: builder.query({
      query: () => ({
        url: "/submission/user-progress-report",
        method: "GET",
      }),
      providesTags: ["Submission"],
    }),
  }),
});

export const {
  useGetSubmissionQuizQuery,
  useReservePointsQuizMutation,
  useGetUserQuizSubmissionsQuery,
  useSubmitQuizMutation,
  useGetUserQuizProgressReportQuery,
  useGetAllUserQuizSubmissionQuery,
  useDelteSubmissionQuizMutation
} = submissionApi;
