import { addDays, intervalToDuration, formatDuration } from "date-fns";
import type { MarketOrder } from "$lib/server/api/esi";

export function price(price: number): string {
  return price.toLocaleString(undefined, {
    minimumFractionDigits: price > 1000 ? 0 : 2,
    maximumFractionDigits: price > 1000 ? 0 : 2,
  });
}

export function quantity(quantity: number): string {
  return quantity.toLocaleString();
}

export function range(range: MarketOrder["range"]): string {
  if (range === "solarsystem") {
    return "system";
  }
  return range;
}

export function timeRemaining(
  start: Date,
  duration: number,
  time: Date = new Date()
): string {
  const endDate = addDays(new Date(start), duration);

  if (time >= endDate) {
    return "Expired";
  }

  const remainingDuration = intervalToDuration({ start: time, end: endDate });
  const formatted = formatDuration(remainingDuration, {
    format: ["days", "hours", "minutes"],
    delimiter: " ",
    zero: false,
  })
    .replace(/ days?/, "d")
    .replace(/ hours?/, "h")
    .replace(/ minutes?/, "m");

  return formatted;
}

export function volume(volume: number): string {
  return volume.toLocaleString() + " m³";
}

export function date(date: Date): string {
  return date.toLocaleDateString();
}
