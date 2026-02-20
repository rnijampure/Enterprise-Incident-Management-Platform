// incident-management\src\features\dashboard\IncidentDataGrid\incidentColumns.ts
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { type Incident } from "./types"; // Adjust path as needed
import { Button } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

export const incidentColumns: GridColDef<Incident>[] = [
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 120,
    sortable: false,
    renderCell: (params: GridRenderCellParams<Incident>) => {
      const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // important
        console.log("Row data:", params.row); // now defined
        // navigate(`/incidents/${params.row._id}`);
      };

      return (
        <EditIcon
          sx={{ color: "#003049", cursor: "pointer" }}
          onClick={handleEditClick}
        />
      );
    },
  },
  {
    field: "ticketId",
    headerName: "Ticket ID",
    width: 120,
    // Makes the ID stand out
    renderCell: (params) => `**${params.value}**`,
  },

  {
    field: "title",
    headerName: "Title",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
  },
  {
    field: "severity",
    headerName: "Severity",
    width: 120,
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 160,
    // In v8, valueGetter receives (value, row)
    valueGetter: (_value, row) => row.assignee?.name ?? "Unassigned",
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
  },
  {
    field: "region",
    headerName: "Region",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created",
    width: 160,
    // In v8, valueFormatter receives only the value (not the whole params object)
    valueFormatter: (value) =>
      value ? new Date(value as string).toLocaleDateString() : "",
  },

  {
    field: "updatedAt",
    headerName: "updated",
    width: 160,
    // In v8, valueFormatter receives only the value (not the whole params object)
    valueFormatter: (value) =>
      value ? new Date(value as string).toLocaleDateString() : "",
  },
];
