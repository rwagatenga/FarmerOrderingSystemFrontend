import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/service/apiClient";
import { Land } from "@/interfaces/Land";

export const addLandApi = async (payload: {
  farmerId: string;
  sizeInAcre: number;
}) => {
  try {
    const response = await api().post("/land/create", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getLandsApi = async ({
  paginationReq,
}: {
  paginationReq?: {
    page: number;
    perPage: number;
  };
}) => {
  try {
    const response = await api().get("land/lands", {
      params: {
        ...paginationReq,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLandsFormApi = async () => {
  try {
    const response = await api().get("/land/get-land");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFarmersLandApi = async (farmerID: string) => {
  try {
    const response = await api().get("/land/farmer-land", {
      params: {
        farmerID,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateLand = () => {
  return useMutation({
    mutationFn: addLandApi,
  });
};

export const useLands = ({
  paginationReq,
}: {
  paginationReq?: {
    page: number;
    perPage: number;
  };
}) => {
  return useQuery<{
    fertilizers: Land[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }>({
    queryKey: [import.meta.env.BASE_URL, paginationReq],
    queryFn: () => getLandsApi({ paginationReq }),
  });
};

export const useGetLands = () => {
  return useQuery<Land[]>({
    queryKey: [import.meta.env.BASE_URL],
    queryFn: () => getLandsFormApi(),
  });
};

export const useFarmersLand = (farmerID: string) => {
  return useQuery<Land[]>({
    queryKey: [import.meta.env.BASE_URL, farmerID],
    queryFn: () => getFarmersLandApi(farmerID),
  });
};
