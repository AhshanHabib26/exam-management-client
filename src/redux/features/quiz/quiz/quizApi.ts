import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TQuiz } from "@/types/common.data";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: (data) => ({
        url: "/quiz",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
    uploadQuiz: builder.mutation({
      query: (data) => ({
        url: "/quiz/quiz-upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
    getAllQuiz: builder.query({
      query: (args = {}) => {
        const params = new URLSearchParams();

        // Only append page and limit if they are provided
        if (args.page !== undefined && args.page !== null) {
          params.set("page", args.page.toString());
        }
        if (args.limit !== undefined && args.limit !== null) {
          params.set("limit", args.limit.toString());
        }

        // Append search term if provided
        if (args.searchTerm !== undefined && args.searchTerm.trim()) {
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
          url: `/quiz?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 300,
      providesTags: ["Quiz"],
      transformResponse: (response: TResponseRedux<TQuiz[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quiz/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
    getSingleQuiz: builder.query({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useGetAllQuizQuery,
  useUpdateQuizMutation,
  useUploadQuizMutation,
  useGetSingleQuizQuery,
} = quizApi;
