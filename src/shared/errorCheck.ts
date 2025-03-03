export function isKnownError(error: any): error is KnownError {
  return error && typeof error.message === "string";
}
