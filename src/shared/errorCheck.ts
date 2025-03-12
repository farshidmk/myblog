export function isKnownError(error: unknown): error is KnownError {
  if (typeof error === "object" && error !== null) {
    return "message" in error;
  }
  return false;
}
