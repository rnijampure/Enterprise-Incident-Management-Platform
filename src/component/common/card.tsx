//incident-management\src\component\common\card.tsx
import { CardContent, Typography, CardActions, Button } from "@mui/material";
import React from "react";
import { theme } from "../../theme";
export type CardData = {
  title: string;
  value?: number;
};

const CardComponent = ({ card }: { card: CardData }) => {
  const { title, value } = card;
  const setBorderRadius = (title: String) => {
    switch (title) {
      case "Total":
        return "blue";
      case "Open":
        return "orange";
      case "Resolved":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <React.Fragment>
      <CardContent
        sx={{
          boxShadow: theme.customShadows.elevated,
          borderRadius: 2,
          maxWidth: "30%",
          minWidth: 150,
          mb: 0,
          display: "flex",
          flexDirection: "column",
          gap: 0,
          spacing: 6,
          padding: 0,
          paddingLeft: "5px",
          paddingTop: "5px",
          maxHeight: "max-content",
          "&:last-child": { paddingBottom: 0 },
          borderLeft: `3px solid ${setBorderRadius(title)} `,
          // Responsive adjustments
          [theme.breakpoints.down("md")]: {
            maxWidth: "100%", // full width on small screens
            minWidth: "100%",
          },
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            mb: 0,
            whiteSpace: "wrap",
            paddingLeft: "5px",
            marginTop: "0px",
            "&:last-child": { paddingBottom: 0 },
          }}
        >
          {title}:{" "}
          <b style={{ color: `${setBorderRadius(title)}`, marginLeft: "5px" }}>
            {" "}
            {value}{" "}
          </b>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};

export default CardComponent;
