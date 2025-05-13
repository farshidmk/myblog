import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

export const serverCall: MutationFunction<unknown, unknown> = async (
  variables
) => {
  const { entity, method, body } = variables as ServerCallType;
  try {
    const requestOptions: RequestInit = {
      method,
      credentials: "include",
      body,
    };
    const response = await fetch(entity, requestOptions);
    const result = await response.json();
    // const response = await fetch({ ...requestOptions });
    if (result?.status === 200) {
      return result?.data;
    } else if (result?.status === 204) {
      return { data: { rows: [] } };
    } else {
      throw new Error(`Error on operation... - ${result?.statusText}`);
    }
  } catch (e) {
    throw new Error(JSON.stringify(e) || `Error on operation...`);
  }
};

export const getRequest: QueryFunction<unknown, QueryKey, never> = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  let tempEntity = "";
  if (Array.isArray(queryKey)) {
    tempEntity = queryKey.join("/");
  }
  tempEntity = String(tempEntity);
  try {
    return await serverCall({ entity: tempEntity, method: "get" });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Error on Fetching Da`);
  }
};
