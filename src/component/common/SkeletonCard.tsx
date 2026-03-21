// src/component/common/SkeletonCard.tsx
import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        maxWidth: 150,
        minWidth: 150,
        mb: 2,
        flex: 1,
        maxHeight: "20px",
      }}
    >
      <CardContent>
        <Skeleton variant="text" width="150px" height={10} />
        <Skeleton variant="text" width="150px" height={10} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={10}
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
