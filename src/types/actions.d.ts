type ActionResponse<T = unknown> = {
  success: boolean;
  errors?: string[];
  data: T | [];
};

type ActionResponseStatus = "pending" | "success" | "error" | "idle";
