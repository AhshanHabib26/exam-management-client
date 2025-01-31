import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TUser } from "@/types/user.type";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    updatePassword: builder.mutation({
      query: (userPass) => ({
        url: "/auth/update-password",
        method: "PUT",
        body: userPass,
      }),
    }),
    getAllUsers: builder.query({
      query: (args = {}) => {
        const params = new URLSearchParams();

        // Only append page and limit if they are provided
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
          url: `/auth/users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
      transformResponse: (response: TResponseRedux<TUser[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getuserProfile: builder.query({
      query: () => ({
        url: `/auth/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    userBlock: builder.mutation({
      query: (id) => ({
        url: `/auth/user-block/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    userUnblock: builder.mutation({
      query: (id) => ({
        url: `/auth/user-unblock/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    purchasePackage: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/purchase-package",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    activeUserPackage: builder.mutation({
      query: (userId: string) => ({
        url: "/auth/active-user-package",
        method: "PUT",
        body: { id: userId },
      }),
      invalidatesTags: ["User"],
    }),
    deactiveUserPackage: builder.mutation({
      query: (userId: string) => ({
        url: "/auth/deactive-user-package",
        method: "PUT",
        body: { id: userId },
      }),
      invalidatesTags: ["User"],
    }),
    activeUserRole: builder.mutation({
      query: (userId: string) => ({
        url: "/auth/active-user-role",
        method: "PUT",
        body: { id: userId },
      }),
      invalidatesTags: ["User"],
    }),
    deactiveUserRole: builder.mutation({
      query: (userId: string) => ({
        url: "/auth/deactive-user-role",
        method: "PUT",
        body: { id: userId },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useUserBlockMutation,
  useUserUnblockMutation,
  useGetuserProfileQuery,
  useUpdatePasswordMutation,
  usePurchasePackageMutation,
  useActiveUserPackageMutation,
  useDeactiveUserPackageMutation,
  useActiveUserRoleMutation,
  useDeactiveUserRoleMutation,
} = authApi;
