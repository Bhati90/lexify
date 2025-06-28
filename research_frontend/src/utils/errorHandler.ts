// src/utils/errorHandler.ts
import { AxiosError } from "axios";
import { ApiError } from "./types/apiTypes";

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    // The request was made and the server responded with a status code
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      return {
        message: error.response.data?.message || "An error occurred",
        status: error.response.status,
        details: error.response.data,
      };
    }
    // The request was made but no response was received
    else if (error.request) {
      console.error("API Request Error:", error.request);
      return {
        message: "No response from server. Please check your connection.",
      };
    }
  }

  // Something happened in setting up the request or unknown error
  console.error("Error:", error);
  return {
    message: "An unexpected error occurred. Please try again.",
  };
};
