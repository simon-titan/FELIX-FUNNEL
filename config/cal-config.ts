/**
 * Cal.com Integration – Buchungs-URL für 1:1 Beratung / Performance-Call
 * Kunde: pump-it-club | Event: cal.com/pump-it-club/performance
 */
const DEFAULT_CAL_BOOKING_URL = "https://cal.com/pump-it-club/performance";

export const calConfig = {
  /** Öffentliche Buchungs-URL (kann über NEXT_PUBLIC_CAL_BOOKING_URL überschrieben werden) */
  bookingUrl:
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_CAL_BOOKING_URL
      ? process.env.NEXT_PUBLIC_CAL_BOOKING_URL
      : DEFAULT_CAL_BOOKING_URL,
  /** Cal.com Username (pump-it-club) – für spätere API-Integration optional */
  username: "pump-it-club",
  /** Event-Slug (performance) – für spätere API-Integration optional */
  eventSlug: "performance",
} as const;
