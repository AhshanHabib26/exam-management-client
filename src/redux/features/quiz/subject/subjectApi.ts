import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { IQuizSubject } from "@/types/common.data";


const quizSubjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuizSubject: builder.mutation({
      query: (data) => ({
        url: "/quiz-subject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["QuizSubject"],
    }),
    getAllQuizSubjectes: builder.query({
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
          url: `/quiz-subject?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["QuizSubject"],
      transformResponse: (response: TResponseRedux<IQuizSubject[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateQuizSubject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quiz-subject/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["QuizSubject"],
    }),
    deleteQuizSubject: builder.mutation({
      query: (id) => ({
        url: `/quiz-subject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["QuizSubject"],
    }),
    getSingleQuizSubject: builder.query({
      query: (id) => ({
        url: `/quiz-subject/${id}`,
        method: "GET",
      }),
      providesTags: ["QuizSubject"],
    }),
  }),
});

export const {
  useCreateQuizSubjectMutation,
  useGetAllQuizSubjectesQuery,
  useUpdateQuizSubjectMutation,
  useDeleteQuizSubjectMutation,
  useGetSingleQuizSubjectQuery,
} = quizSubjectApi;
