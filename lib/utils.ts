import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDevIconClassName = (techName: string) => {
  const normalizedName = techName.replace(/[ .]/g, "-").toLowerCase();

  return techMap[normalizedName]
    ? `${techMap[normalizedName]} colored`
    : "devicon-devicon-plain colored";
};

export const getTimeStamp = (date: string) => {
  const diff = new Date().getTime() - new Date(date).getTime();

  const units = [
    { label: "year", ms: 365 * 24 * 60 * 60 * 1000 },
    { label: "month", ms: 30 * 24 * 60 * 60 * 1000 },
    { label: "week", ms: 7 * 24 * 60 * 60 * 1000 },
    { label: "day", ms: 24 * 60 * 60 * 1000 },
    { label: "hour", ms: 60 * 60 * 1000 },
    { label: "minute", ms: 60 * 1000 },
    { label: "second", ms: 1000 },
  ];

  for (const { label, ms } of units) {
    const value = Math.floor(diff / ms);
    if (value >= 1) {
      return `${value} ${label}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};
