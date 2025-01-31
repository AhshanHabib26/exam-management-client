import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { IBoard } from "@/types/common.data";

const mcqCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqCategory: builder.mutation({
      query: (data) => ({
        url: "/mcq-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MCQCategory"],
    }),
    getAllMcqCategories: builder.query({
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
          url: `/mcq-categories?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["MCQCategory"],
      transformResponse: (response: TResponseRedux<IBoard[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/mcq-categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MCQCategory"],
    }),
    deleteMcqCategory: builder.mutation({
      query: (id) => ({
        url: `/mcq-categories/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["MCQCategory"],
    }),
    getSingleMcqCategory: builder.query({
      query: (id) => ({
        url: `/mcq-categories/${id}`,
        method: "GET",
      }),
      providesTags: ["MCQCategory"],
    }),
  }),
});

export const {
  useCreateMcqCategoryMutation,
  useGetAllMcqCategoriesQuery,
  useUpdateMcqCategoryMutation,
  useDeleteMcqCategoryMutation,
  useGetSingleMcqCategoryQuery,
} = mcqCategoryApi;
