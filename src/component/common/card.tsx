import { CardContent, Typography, CardActions, Button } from "@mui/material";
import React from "react";
import { theme } from "../../theme";
type CardProps = {
  card: any;
};

const CardComponent = ({ card }: CardProps) => {
  return (
    <React.Fragment>
      <CardContent
        sx={{
          boxShadow: theme.customShadows.elevated,
          borderRadius: 2,
          maxWidth: 350,
          minWidth: 350,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          spacing: 6,
          // Responsive adjustments
          [theme.breakpoints.down("md")]: {
            maxWidth: "100%", // full width on small screens
            minWidth: "100%",
          },
        }}
      >
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </CardContent>
    </React.Fragment>
  );
};

export default CardComponent;
