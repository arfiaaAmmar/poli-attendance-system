import { CircularProgress } from "@mui/material";

export const LoadingIndicator = () => (
  <div className="flex items-center justify-center h-40">
    <CircularProgress size={40} thickness={4} color="secondary" />
  </div>
);
