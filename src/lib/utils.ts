import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { removeCookie } from "./universalCookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const APP_URL = import.meta.env.VITE_APP_URL;

export const forceLogout = () => {
  removeCookie("csb-jwt");
  removeCookie("csb-refresh-token");
  window.location.href = APP_URL
    ? `${APP_URL}login`
    : `${window.location.origin}login`;
};

// Function to calculate total quantity of fertilizer/Seed required for the land
export const calculateQuantityRequired = (
  landSize: number,
  quantity: number,
): number => {
  return landSize * quantity;
};

export const calculatePrice = (quantity: number, unitPrice: number) => {
  return quantity * unitPrice;
};

export const formatNumberWithCommas = (number: number | undefined): string => {
  if (number === undefined) {
    return "";
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
