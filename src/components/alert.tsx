import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type MessageProps = {
  message: string;
};
export function ErrorAlert({ message }: MessageProps) {
  return (
    <div className="flex justify-center items-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}
