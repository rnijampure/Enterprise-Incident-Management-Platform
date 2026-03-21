"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FlagIcon from "@mui/icons-material/Flag";
import SpeedIcon from "@mui/icons-material/Speed";
import BuildIcon from "@mui/icons-material/Build";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import DomainIcon from "@mui/icons-material/Domain";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  Alert,
} from "@mui/material";

import {
  useGetIncidentByIdQuery,
  useUpdateIncidentMutation,
} from "../api/incidentApi";
import type { Incident, Region, IncidentStatus } from "../../../types/types";
import { useGetLookupsQuery } from "../../lookups/api/lookupApi";
import UserTooltip from "../../../component/common/popover";
// = "open" | "resolved" | "obsolete" | "in_progress" | "closed" | "reopened" | "invalid" | "escalated_team"
const severityOptions = ["low", "medium", "high", "critical"];
const statusOptions: IncidentStatus[] = [
  "open",
  "in_progress", // Fixed: underscore to match IncidentStatus type
  "resolved",
  "closed",
  "reopened",
  "invalid",
  "obsolete",
  "escalated_team",
];
const typeOptions = ["security", "availability", "performance", "other"];
const categoryOptions = ["performance", "security", "infrastructure", "other"];

type FormValues = Pick<
  Incident,
  "title" | "description" | "status" | "severity" | "type" | "category"
>;

export function IncidentDetailsForm(defaultData: Incident) {
  // Fetch incident and lookups
  const {
    data: incident,
    isLoading,
    isFetching,
    isError,
  } = useGetIncidentByIdQuery(defaultData._id, { refetchOnFocus: false });

  const { data: lookups } = useGetLookupsQuery(); // teams, users, regions

  const [updateIncident, { isLoading: isUpdating }] =
    useUpdateIncidentMutation();

  // Form setup with always-controlled inputs
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Incident>({
    defaultValues: {
      title: "",
      description: "",
      status: "open",
      severity: "low",
      type: "other",
      category: "other",
      assigneeId: "",
      region: "",
    },
  });

  // Update form values when incident arrives (cache/reactive)
  useEffect(() => {
    if (incident) {
      console.log("region", incident.region);
      reset({
        title: incident.title ?? "",
        description: incident.description ?? "",
        status: incident.status ?? "",
        severity: incident.severity ?? "",
        type: incident.type ?? "",
        category: incident.category ?? "",
        assigneeId: incident?.assignee?._id,
        region: incident.region ?? " ",
      });
    }
  }, [incident, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!incident) return;

    try {
      await updateIncident({ id: incident._id, ...data }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (!incident && isFetching) {
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Failed to load incident</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
        <p>Loading incident details...</p>
      </Box>
    );
  }

  // Lookup data
  const userOptions = lookups?.users ?? [];
  const regionOptions = lookups?.regions ?? [];

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Status"
              select
              fullWidth
              margin="normal"
              error={!!errors.status}
              helperText={errors.status?.message}
              value={field.value ?? ""}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {/* Severity */}
        <Controller
          name="severity"
          control={control}
          rules={{ required: "Severity is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Severity"
              select
              fullWidth
              margin="normal"
              error={!!errors.severity}
              helperText={
                errors.severity?.message ?? "Select how severe the incident is"
              }
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SpeedIcon sx={{ width: "15px" }} color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              value={field.value ?? ""}
            >
              {severityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {/* Type */}
        <Controller
          name="type"
          control={control}
          rules={{ required: "Type is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Type"
              select
              fullWidth
              margin="normal"
              error={!!errors.type}
              helperText={errors.type?.message ?? "Select the incident type"}
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BuildIcon sx={{ width: "15px" }} color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              value={field.value ?? ""}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {/* Category */}
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Category"
              select
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={
                errors.category?.message ?? "Select the incident category"
              }
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon sx={{ width: "15px" }} color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {/* Assignee */}
        {/*         <TextField
          label="Assignee"
          value={incident?.assignee?.name ?? ""}
          fullWidth
          margin="normal"
          disabled
          slots={{ input: OutlinedInput }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        /> */}
        <Controller
          name="assigneeId"
          control={control}
          render={({ field }) => (
            <Box display="flex" alignItems="center">
              <TextField
                {...field}
                select
                label="Assignee"
                fullWidth
                value={field.value ?? ""}
              >
                {userOptions.map((user: any) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* Hover icon triggers tooltip */}
              {field.value && (
                <UserTooltip userId={field.value}>
                  <Box
                    sx={{
                      ml: 1,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                    }}
                  >
                    ℹ️
                  </Box>
                </UserTooltip>
              )}
            </Box>
          )}
        />
        {/* Reporter */}
        <TextField
          label="Reporter"
          value={incident?.reporter?.name ?? ""}
          fullWidth
          margin="normal"
          disabled
          slots={{ input: OutlinedInput }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />
        {/*  // regionOptions
         Region */}
        {/*  <TextField
          label="Region"
          value={incident?.region ?? defaultData.region ?? ""}
          fullWidth
          margin="normal"
          disabled
          slots={{ input: OutlinedInput }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        /> */}
        <Controller
          name="region"
          control={control}
          rules={{ required: "region is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Region"
              value={field.value ?? ""}
              select
              fullWidth
              margin="normal"
              error={!!errors.region}
              helperText={
                errors.region?.message ?? "Select the incident region"
              }
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon sx={{ width: "15px" }} color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
            >
              {regionOptions.map((option: Region) => (
                <MenuItem key={option._id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {/* Department */}
        <TextField
          label="Department"
          value={incident?.department ?? defaultData.department ?? ""}
          fullWidth
          margin="normal"
          disabled
          slots={{ input: OutlinedInput }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <DomainIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />
        {/* Escalation Level */}
        <TextField
          label="Escalation Level"
          value={incident?.escalationLevel ?? defaultData.escalationLevel ?? ""}
          fullWidth
          margin="normal"
          disabled
          slots={{ input: OutlinedInput }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FlagIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />
        {/* Created & Updated */}
        <TextField
          label="Created At"
          value={new Date(
            incident?.createdAt ?? defaultData.createdAt ?? "",
          ).toLocaleString()}
          fullWidth
          margin="normal"
          disabled
          slots={{ input: OutlinedInput }}
        />
        <TextField
          label="Updated At"
          value={new Date(
            incident?.updatedAt ?? defaultData.updatedAt ?? "",
          ).toLocaleString()}
          fullWidth
          margin="normal"
          disabled
          slots={{ input: OutlinedInput }}
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
