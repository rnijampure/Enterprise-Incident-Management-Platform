import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Incident, IncidentUpdate } from "../../../types/types";
import type { RootState } from "../../../app/store/store";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:5000/api";
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // 1. Get the token from your Redux Auth State
    const token = (getState() as RootState).auth.accessToken;

    // 2. If it exists, attach it to the 'Authorization' header
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const incidentApi = createApi({
  reducerPath: "incidentApi",
  baseQuery: baseQuery,
  tagTypes: ["Incident"],
  endpoints: (builder) => ({
    getIncidents: builder.query({
      query: () => "/incidents",
      providesTags: (result) =>
        result.data
          ? [
              ...result.data.map(({ _id }: any) => ({
                type: "Incident" as const,
                id: _id,
              })),
              { type: "Incident", id: "LIST" },
            ]
          : [{ type: "Incident", id: "LIST" }],
    }),
    /* =========================================================
       SINGLE INCIDENT
    ========================================================== */
    updateIncident: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `incidents/${id}`,
        method: "PATCH",
        body: patch,
      }),
      // This mutation only kills the specific item and the general list
      invalidatesTags: (_result, _error, { _id }) => [
        { type: "Incident", id: _id },
      ],
    }),
    getIncidentById: builder.query<Incident, number | string>({
      query: (id) => `incidents/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Incident", id: id }],
    }),
    getIncidentUpdatesById: builder.query<IncidentUpdate[], number | string>({
      query: (id) => `incidents/updates/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Incident", id: id }],
    }),
    getIncidentCommentsUpdatesById: builder.query<any[], number | string>({
      query: (id) => `incidents/updates/comments/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Incident", id: id }],
    }),
  }),
});
export const {
  useGetIncidentsQuery,
  useUpdateIncidentMutation,
  useGetIncidentByIdQuery,
  useGetIncidentUpdatesByIdQuery,
  useGetIncidentCommentsUpdatesByIdQuery,
} = incidentApi;
