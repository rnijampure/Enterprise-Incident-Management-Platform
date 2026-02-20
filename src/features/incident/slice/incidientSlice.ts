import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IncidentUIState } from "../../../types/types";

const initialState: IncidentUIState = {
  selectedIncidentId: null,
  statusFilter: "ALL",
  severityFilter: "ALL",
  isCreateModalOpen: false,
};

const incidentSlice = createSlice({
  name: "incidentUI",
  initialState,
  reducers: {
    setSelectedIncident(state, action: PayloadAction<string>) {
      state.selectedIncidentId = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    setSeverityFilter(state, action: PayloadAction<string>) {
      state.severityFilter = action.payload;
    },
    toggleCreateModal(state) {
      state.isCreateModalOpen = !state.isCreateModalOpen;
    },
  },
});

export const {
  setSelectedIncident,
  setStatusFilter,
  setSeverityFilter,
  toggleCreateModal,
} = incidentSlice.actions;

export default incidentSlice.reducer;
