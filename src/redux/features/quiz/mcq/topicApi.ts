import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { IMCQTopic } from "@/types/common.data";

const mcqTopicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqTopic: builder.mutation({
      query: (data) => ({
        url: "/mcq-topic",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MCQTopic"],
    }),
    getAllMcqTopices: builder.query({
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
          url: `/mcq-topic?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["MCQTopic"],
      transformResponse: (response: TResponseRedux<IMCQTopic[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqTopic: builder.mutation({
      query: ({ id, data }) => ({
        url: `/mcq-topic/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MCQTopic"],
    }),
    deleteMcqTopic: builder.mutation({
      query: (id) => ({
        url: `/mcq-topic/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["MCQTopic"],
    }),
    getSingleMcqTopic: builder.query({
      query: (id) => ({
        url: `/mcq-topic/${id}`,
        method: "GET",
      }),
      providesTags: ["MCQTopic"],
    }),
  }),
});

export const {
  useCreateMcqTopicMutation,
  useDeleteMcqTopicMutation,
  useGetAllMcqTopicesQuery,
  useGetSingleMcqTopicQuery,
  useUpdateMcqTopicMutation
} = mcqTopicApi;
