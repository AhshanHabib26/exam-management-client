import { TBlog } from "@/types/common.data";
import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    getAllPost: builder.query({
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
          url: `/post?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 300,
      providesTags: ["Post"],
      transformResponse: (response: TResponseRedux<TBlog[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/post/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/post/likes/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useUpdatePostMutation,
  useLikePostMutation,
} = postApi;
