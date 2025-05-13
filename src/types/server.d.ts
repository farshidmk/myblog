type ServerCallType = {
  entity: string;
  body?: RequestInit["body"];
  method: RequestInit["method"];
  headers?: RequestInit["headers"];

  // method: AXIOS
};
