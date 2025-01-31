import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { IMCQSubject } from "@/types/common.data";

const mcqSubjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqSubject: builder.mutation({
      query: (data) => ({
        url: "/mcq-subject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MCQSubject"],
    }),
    getAllMcqSubjectes: builder.query({
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
          url: `/mcq-subject?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["MCQSubject"],
      transformResponse: (response: TResponseRedux<IMCQSubject[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqSubject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/mcq-subject/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MCQSubject"],
    }),
    deleteMcqSubject: builder.mutation({
      query: (id) => ({
        url: `/mcq-subject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["MCQSubject"],
    }),
    getSingleMcqSubject: builder.query({
      query: (id) => ({
        url: `/mcq-subject/${id}`,
        method: "GET",
      }),
      providesTags: ["MCQSubject"],
    }),
  }),
});

export const {
  useCreateMcqSubjectMutation,
  useDeleteMcqSubjectMutation,
  useGetAllMcqSubjectesQuery,
  useGetSingleMcqSubjectQuery,
  useUpdateMcqSubjectMutation
} = mcqSubjectApi;
