// services/usersApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type User } from "../../../types/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const { useGetUserByIdQuery } = usersApi;
