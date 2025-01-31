import { IPackage } from "@/types/common.data";
import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Package"],
    }),

    getAllPackage: builder.query({
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
          url: `/packages?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Package"],
      transformResponse: (response: TResponseRedux<IPackage[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    updatePackage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Package"],
    }),
    getSinglePackage: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package"],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetAllPackageQuery,
  useUpdatePackageMutation,
  useGetSinglePackageQuery,
  useDeletePackageMutation,
} = packageApi;
