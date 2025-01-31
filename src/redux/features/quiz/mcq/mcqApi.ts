import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { IMCQ } from "@/types/common.data";

const mcqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcq: builder.mutation({
      query: (data) => ({
        url: "/mcq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mcq"],
    }),
    uploadMcq: builder.mutation({
      query: (data) => ({
        url: "/mcq/quiz-upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mcq"],
    }),
    getAllMcq: builder.query({
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
          url: `/mcq?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 300,
      providesTags: ["Mcq"],
      transformResponse: (response: TResponseRedux<IMCQ[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/mcq/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Mcq"],
    }),
    getSingleMcq: builder.query({
      query: (id) => ({
        url: `/mcq/${id}`,
        method: "GET",
      }),
      providesTags: ["Mcq"],
    }),

    deleteMcq: builder.mutation({
      query: (id) => ({
        url: `/mcq/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Mcq"],
    }),
  }),
});

export const {
  useCreateMcqMutation,
  useDeleteMcqMutation,
  useGetAllMcqQuery,
  useGetSingleMcqQuery,
  useUpdateMcqMutation,
  useUploadMcqMutation
} = mcqApi;
