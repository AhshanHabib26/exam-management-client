import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

// http://localhost:5000/api/v1
// https://exam-management-server-navy.vercel.app/api/v1

const baseQuery = fetchBaseQuery({
  baseUrl: "https://exam-management-server-navy.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    const errorData = result.error.data as { message: string };
    toast.error(errorData.message);
  }

  if (result?.error?.status === 403) {
    const errorData = result.error.data as { message: string };
    toast.error(errorData.message);
  }

  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log("Sending refresh token");

    const res = await fetch("https://exam-management-server-navy.vercel.app/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "Category",
    "Feedback",
    "Post",
    "User",
    "Comment",
    "Package",
    "QuizCategory",
    "QuizSubject",
    "Quiz",
    "Submission",
    "MCQCategory",
    "Mcq",
    "Board",
    "Chapter",
    "MCQTopic",
    "University",
    "School",
    "MCQSubject",
    "Year",
    "Class"
  ],
  endpoints: () => ({}),
});
