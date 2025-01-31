import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TQuizCategory } from "@/types/common.data";

const quizCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuizCategory: builder.mutation({
      query: (data) => ({
        url: "/quiz-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["QuizCategory"],
    }),
    getAllQuizCategories: builder.query({
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
          url: `/quiz-categories?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["QuizCategory"],
      transformResponse: (response: TResponseRedux<TQuizCategory[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateQuizCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quiz-categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["QuizCategory"],
    }),
    deleteQuizCategory: builder.mutation({
      query: (id) => ({
        url: `/quiz-categories/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["QuizCategory"],
    }),
    getSingleQuizCategory: builder.query({
      query: (id) => ({
        url: `/quiz-categories/${id}`,
        method: "GET",
      }),
      providesTags: ["QuizCategory"],
    }),
  }),
});

export const {
  useCreateQuizCategoryMutation,
  useDeleteQuizCategoryMutation,
  useGetAllQuizCategoriesQuery,
  useGetSingleQuizCategoryQuery,
  useUpdateQuizCategoryMutation,
} = quizCategoryApi;
