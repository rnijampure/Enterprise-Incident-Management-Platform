"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import FlagIcon from "@mui/icons-material/Flag";
import SpeedIcon from "@mui/icons-material/Speed";
import BuildIcon from "@mui/icons-material/Build";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import DomainIcon from "@mui/icons-material/Domain";
import PublicIcon from "@mui/icons-material/Public";
import {
  useGetIncidentByIdQuery,
  useUpdateIncidentMutation,
} from "../api/incidentApi";
import type { Incident } from "../../../types/types";

const severityOptions = ["low", "medium", "high", "critical"];
const statusOptions = ["open", "in-progress", "resolved", "obsolete"];
const typeOptions = ["security", "availability", "performance", "other"];
const categoryOptions = ["performance", "security", "infrastructure", "other"];

export function IncidentDetailsForm(defaultData: Incident) {
  const { data: incident, isLoading } = useGetIncidentByIdQuery(
    defaultData._id,
  );
  const [updateIncident, { isLoading: isUpdating }] =
    useUpdateIncidentMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultData.title,
      description: defaultData.description,
      status: defaultData.status,
      severity: defaultData.severity,
      type: defaultData.type,
      category: defaultData.category,
    },
  });

  React.useEffect(() => {
    if (incident) {
      reset({
        title: incident.title,
        description: incident.description,
        status: incident.status,
        severity: incident.severity,
        type: incident.type,
        category: incident.category,
      });
    }
  }, [incident, reset]);

  const onSubmit = async (data: any) => {
    try {
      await updateIncident({ id: defaultData._id, ...data }).unwrap();
      alert("Incident updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update incident");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
        <p>Loading incident details...</p>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Ticket ID */}
        <TextField
          label="Ticket ID"
          value={incident?.ticketId ?? defaultData.ticketId}
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

        {/* Title */}
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
              helperText={errors.title?.message ?? "Enter a descriptive title"}
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              value={field.value ?? ""}
            />
          )}
        />

        {/* Description */}
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
              helperText={
                errors.description?.message ??
                "Provide details about the incident"
              }
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              value={field.value ?? ""}
            />
          )}
        />

        {/* Status */}
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
              helperText={errors.status?.message ?? "Select the current status"}
              value={field.value ?? ""}
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
            >
              {statusOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
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
              helperText={errors.severity?.message ?? "Select severity"}
              value={field.value ?? ""}
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SpeedIcon color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
            >
              {severityOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
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
              helperText={errors.type?.message ?? "Select type"}
              value={field.value ?? ""}
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BuildIcon color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
            >
              {typeOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
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
              helperText={errors.category?.message ?? "Select category"}
              value={field.value ?? ""}
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
            >
              {categoryOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Assignee */}
        <TextField
          label="Assignee"
          value={incident?.assignee ? defaultData.assignee : ""}
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

        {/* Reporter */}
        <TextField
          label="Reporter"
          value={incident?.reporter ? defaultData.reporter : " "}
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

        {/* Region */}
        <TextField
          label="Region"
          value={incident?.region ?? defaultData.region}
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
        />

        {/* Department */}
        <TextField
          label="Department"
          value={incident?.department ?? defaultData.department}
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
          value={incident?.escalationLevel ?? defaultData.escalationLevel}
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
            incident?.createdAt ?? defaultData.createdAt,
          ).toLocaleString()}
          fullWidth
          margin="normal"
          disabled
          slots={{ input: OutlinedInput }}
        />
        <TextField
          label="Updated At"
          value={new Date(
            incident?.updatedAt ?? defaultData.updatedAt,
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
