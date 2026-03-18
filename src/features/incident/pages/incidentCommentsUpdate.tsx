import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Paper,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useGetIncidentCommentsUpdatesByIdQuery } from "../api/incidentApi";

// --- Types ---
interface MongoDate {
  $date: string;
}

interface IncidentComment {
  _id: { $oid: string };
  userId: { $oid: string };
  comment: string;
  createdAt: MongoDate;
  editedAt?: MongoDate;
}

type Props = {
  updatesId: string | undefined;
  users?: Record<string, { name: string }>;
};

export default function IncidentCommentsUpdatesList({
  updatesId,
  users,
}: Props) {
  const theme = useTheme();

  // Note: Ensure your API hook is updated to return the new object structure
  const { data, isLoading, isError } = useGetIncidentCommentsUpdatesByIdQuery(
    updatesId!,
  );
  console.log("data comments", data);

  if (isLoading) return <CircularProgress size={24} sx={{ m: 2 }} />;

  if (isError || !data || data.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <ChatBubbleOutlineIcon color="disabled" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          No comments or activity recorded yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={0} sx={{ bgcolor: "transparent" }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
      >
        <ChatBubbleOutlineIcon fontSize="small" /> Incident Comments
      </Typography>

      <List disablePadding>
        {data.map((item: IncidentComment, index: number) => {
          const userIdString = item.userId.$oid;
          const userName = users?.[userIdString]?.name ?? "Unknown User";
          const isEdited = !!item.editedAt;

          return (
            <React.Fragment key={item._id.$oid}>
              <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: theme.palette.primary.main,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {userName}
                      </Typography>
                      <Tooltip
                        title={
                          isEdited
                            ? `Edited: ${new Date(item.editedAt!.$date).toLocaleString()}`
                            : ""
                        }
                      >
                        <Typography variant="caption" color="text.disabled">
                          {new Date(item.createdAt.$date).toLocaleString(
                            undefined,
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            },
                          )}
                          {isEdited && " (edited)"}
                        </Typography>
                      </Tooltip>
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.comment}
                    </Typography>
                  }
                />
              </ListItem>
              {index !== data.length - 1 && (
                <Divider component="li" variant="inset" sx={{ ml: "72px" }} />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
}
