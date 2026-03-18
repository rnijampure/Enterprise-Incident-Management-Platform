import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Incident, IncidentUpdate } from "../../../types/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const incidentApi = createApi({
  reducerPath: "incidentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
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
      invalidatesTags: (result, error, { _id }) => [
        { type: "Incident", id: _id },
      ],
    }),
    getIncidentById: builder.query<Incident, number | string>({
      query: (id) => `incidents/${id}`,
      providesTags: (result, error, id) => [{ type: "Incident", id: id }],
    }),
    getIncidentUpdatesById: builder.query<IncidentUpdate[], number | string>({
      query: (id) => `incidents/updates/${id}`,
      providesTags: (result, error, id) => [{ type: "Incident", id: id }],
    }),
    getIncidentCommentsUpdatesById: builder.query<any[], number | string>({
      query: (id) => `incidents/updates/comments/${id}`,
      providesTags: (result, error, id) => [{ type: "Incident", id: id }],
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
