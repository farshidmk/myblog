type ServerCallType = {
  entity: string;
  body?: unknown;
  method: "get" | "post" | "put" | "patch" | "delete";
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
};
