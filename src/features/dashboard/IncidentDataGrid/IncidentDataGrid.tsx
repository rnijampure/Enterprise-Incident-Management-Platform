import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { incidentColumns } from "./incidentColumns";
import { alpha } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

export default function IncidentDataGrid({ incidents }: any) {
  //  const { data, isLoading } = useGetIncidentsQuery({});
  console.log("GRID DATA", incidents);
  const navigate = useNavigate();

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={incidents}
        columns={incidentColumns(navigate)}
        // onRowDoubleClick={handleRowDoubleClick} // ✅ attach here
        getRowId={(row) => row._id} // The magic line
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowClassName={(params) => `severity-${params.row.severity}`}
        sx={(theme) => ({
          "& .severity-low": {
            backgroundColor: alpha(theme.palette.severity.low, 0.08),
          },
          "& .severity-medium": {
            backgroundColor: alpha(theme.palette.severity.medium, 0.1),
          },
          "& .severity-high": {
            backgroundColor: alpha(theme.palette.severity.high, 0.14),
          },
          "& .severity-critical": {
            backgroundColor: alpha(theme.palette.severity.critical, 0.18),
            color: theme.palette.severity.critical,
          },

          // Keep hover behavior consistent
          "& .MuiDataGrid-row:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        })}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
