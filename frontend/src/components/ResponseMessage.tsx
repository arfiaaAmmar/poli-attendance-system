import { Typography } from "@mui/material";
import { Feedback } from "shared-library/src/declarations/types";

type FeedbackMessageProp = Feedback & {
  className: string;
};

const FeedbackMessage = ({
  success,
  error,
  className,
}: FeedbackMessageProp) => {
  let textStyle = "";
  const responseMessage = success ? success : error;
  if (success) textStyle = "text-green-500";
  if (error) textStyle = "text-red-500";

  return (
    <Typography className={`${textStyle} ${className}`}>
      {responseMessage}
    </Typography>
  );
};

export default FeedbackMessage;
