import * as React from "react";
import {
  Box,
  Tooltip,
  Avatar,
  Typography,
  Chip,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useGetUserByIdQuery } from "../../features/user/api/usersApi";
import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  userId: string;
  onViewProfile?: (id: string) => void;
  onEdit?: (id: string) => void;
}>;

export default function UserTooltip({
  userId,
  children,
  onViewProfile,
  onEdit,
}: Props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // RTK Query (cached globally)
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(userId, {
    skip: !open, // fetch only when opened
  });

  const positionRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const popperRef = React.useRef<any>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const hoverTimer = React.useRef<number | null>(null);
  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setOpen(true); // only open after delay
    }, 700); // 700ms delay
  };
  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    hoverTimer.current = setTimeout(() => {
      setOpen(false);
    }, 2000); // small grace period
  };
  // Severity-based role color mapping
  const getRoleColor = (role?: string) => {
    if (!role) return theme.palette.grey[500];

    const severityMap: Record<string, string> = {
      admin: theme.palette.severity.critical,
      analyst: theme.palette.severity.medium,
      viewer: theme.palette.severity.low,
    };

    return severityMap[role] || theme.palette.grey[500];
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "";

  const content = (
    <Box minWidth={280}>
      {isLoading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress size={20} />
        </Box>
      )}

      {isError && (
        <Typography variant="body2" color="error">
          Failed to load user
        </Typography>
      )}

      {user && (
        <>
          {/* Header */}
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Avatar
              sx={{
                bgcolor: alpha(getRoleColor(user.role), 0.15),
                color: getRoleColor(user.role),
                fontWeight: 600,
              }}
            >
              {initials}
            </Avatar>

            <Box>
              <Typography fontWeight={600}>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Stack>

          {/* Role Badge */}
          <Chip
            label={user.role.toUpperCase()}
            size="small"
            sx={{
              bgcolor: alpha(getRoleColor(user.role), 0.12),
              color: getRoleColor(user.role),
              fontWeight: 500,
              fontSize: "10px",
              mb: 1,
            }}
          />

          {/* Info */}
          <Box sx={{ typography: "body2", "& > div": { mb: 0.5 } }}>
            <div>
              <strong>Team:</strong> {user.team}
            </div>
            <div>
              <strong>Department:</strong> {user.department}
            </div>
            <div>
              <strong>Region:</strong> {user.region}
            </div>
          </Box>

          {/* Divider */}
          <Box
            mt={1}
            pt={1}
            sx={{
              borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            }}
          />

          {/* Actions */}
          <Stack direction="row" spacing={1} mt={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onViewProfile?.(userId)}
            >
              View Profile
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => onEdit?.(userId)}
            >
              Edit
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );

  return (
    <Tooltip
      title={content}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      disableInteractive={false}
      arrow
      placement="top"
      enterDelay={700}
      leaveDelay={200}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.customShadows.card,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            borderRadius: 2,
            px: 2,
            py: 1.5,
          },
        },
        arrow: {
          sx: { color: theme.palette.background.paper },
        },
        popper: {
          popperRef,
        },
      }}
    >
      <Box
        ref={areaRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Box>
    </Tooltip>
  );
}
