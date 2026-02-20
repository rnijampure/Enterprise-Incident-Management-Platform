// src/features/dashboard/summary/SummarySection.tsx
import React from "react";
import { Grid } from "@mui/material";
import CardComponent, { type CardData } from "../../../component/common/card";
import SkeletonCard from "../../../component/common/SkeletonCard";
import { useGetIncidentsQuery } from "../../incident/api/incidentApi";
import { calculateSummaryMetrics } from "./utils";

const SummarySection: React.FC = () => {
  const { data, isLoading } = useGetIncidentsQuery({});

  let cards: CardData[] = [
    { title: "Total Incidents", value: 0 },
    { title: "Open Incidents", value: 0 },
    { title: "Resolved Incidents", value: 0 },
  ];
  if (data) {
    const { total, open, resolved } = calculateSummaryMetrics(data.data);

    cards = [
      { title: "Total", value: total },
      { title: "Open", value: open },
      { title: "Resolved", value: resolved },
    ];
  }

  // Decide how many placeholders to show while loading
  const displayCards: (CardData | undefined)[] = isLoading
    ? Array.from({ length: 3 })
    : cards;

  return (
    <Grid
      container
      spacing={3}
      sx={{
        maxWidth: "50%",
        display: "inline-flex",
        minWidth: 150,
        justifyContent: "flex-end",
      }}
    >
      {displayCards.map((card, index) => (
        <>
          {/* Check for BOTH isLoading OR a missing card object */}
          {isLoading || !card ? (
            <SkeletonCard />
          ) : (
            <CardComponent key={card.title} card={card} />
          )}
        </>
      ))}
    </Grid>
  );
};

export default SummarySection;
