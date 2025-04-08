export interface SuccessAlertProps {
  message: string;
}

export interface ErrorAlertProps {
  success: boolean;
  message: string | null;
}
