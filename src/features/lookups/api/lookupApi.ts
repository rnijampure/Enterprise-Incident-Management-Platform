import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, Region, Team, Department } from "../../../types/types";
export type Lookups = {
  teams: Team[];
  users: User[];
  regions: Region[];
  Depertments: Department[];
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const lookupApi = createApi({
  reducerPath: "lookupApi",
  tagTypes: ["Lookups"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getLookups: builder.query<Lookups, void>({
      query: () => "/lookups",
      providesTags: ["Lookups"],
      keepUnusedDataFor: 300, // cache for 5 minutes
    }),
  }),
});
export const { useGetLookupsQuery } = lookupApi;
