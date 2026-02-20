// src/features/dashboard/summary/utils.ts
import type { Incident } from "../../../types/types";

export type SummaryMetrics = {
  total: number;
  open: number;
  resolved: number;
  critical: number;
};

/**
 * Calculates summary metrics from cards array.
 * Handles undefined or empty array safely.
 */
export const calculateSummaryMetrics = (cards?: Incident[]): SummaryMetrics => {
  if (!cards || cards.length === 0) {
    return { total: 0, open: 0, resolved: 0, critical: 0 };
  }

  const total = cards.length;
  const open = cards.filter((i) => i.status === "open").length;
  const resolved = cards.filter((i) => i.status === "resolved").length;
  const critical = cards.filter((i) => i.severity === "critical").length;

  return { total, open, resolved, critical };
};
