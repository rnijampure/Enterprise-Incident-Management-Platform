import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  Divider,
  Stack,
  Paper,
  CircularProgress,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import { useGetIncidentUpdatesByIdQuery } from "../api/incidentApi";

// Helper to make field names and values readable
const formatValue = (field: string, value: string) => {
  if (!value) return "None";
  // If the field is 'severity' or 'status', capitalize it
  if (["severity", "status"].includes(field)) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  // Shorten IDs if they haven't been populated yet
  if (value.length > 20) return `${value.substring(0, 6)}...`;
  return value;
};

type Props = {
  updatesId: string | undefined;
  users?: Record<string, { name: string }>;
};

export default function IncidentUpdatesList({ updatesId, users }: Props) {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetIncidentUpdatesByIdQuery(
    updatesId!,
  );

  if (isLoading) return <CircularProgress size={24} sx={{ m: 2 }} />;

  if (isError || !data || data.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <HistoryIcon color="disabled" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          No activity recorded yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <HistoryIcon fontSize="small" /> Incident Activity
      </Typography>

      <List disablePadding>
        {data.map((update: any, index: number) => {
          const userName = users?.[update.userId]?.name ?? "System";

          return (
            <React.Fragment key={update._id}>
              <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primaryTypographyProps={{ component: "div" }}
                  primary={
                    <Box component="span">
                      <Typography
                        variant="body2"
                        component="span"
                        fontWeight="bold"
                      >
                        {userName}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ mx: 0.5 }}
                      >
                        changed
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        fontWeight="medium"
                        color="primary"
                      >
                        {update.fieldChanged}
                      </Typography>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: "div" }}
                  secondary={
                    <Stack spacing={1} mt={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={formatValue(
                            update.fieldChanged,
                            update.oldValue,
                          )}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                        <Typography variant="caption" color="text.disabled">
                          →
                        </Typography>
                        <Chip
                          label={formatValue(
                            update.fieldChanged,
                            update.newValue,
                          )}
                          size="small"
                          color="primary"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(update.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
              {index !== data?.length - 1 && (
                <Divider component="li" variant="inset" />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
}
