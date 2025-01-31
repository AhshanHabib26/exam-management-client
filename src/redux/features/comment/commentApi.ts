import { TComment } from "@/types/common.data";
import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ postId, description }) => ({
        url: `/comment/${postId}`,
        method: "POST",
        body: { description },
      }),
      invalidatesTags: ["Comment"],
    }),
    getAllComment: builder.query({
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
          url: `/comment?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Comment"],
      transformResponse: (response: TResponseRedux<TComment[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
    getUserCommentSubmissions: builder.query({
      query: () => ({
        url: "/comment/comment-submissions",
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentQuery,
  useUpdateCommentMutation,
  useGetUserCommentSubmissionsQuery,
} = commentApi;
