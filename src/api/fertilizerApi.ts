import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/service/apiClient";
import { Fertilizer } from "@/interfaces/Fertilizer";

export const addFertilizerApi = async (payload: {
  name: string;
  quantityAvailable: number;
  maxQuantityPerAcre: number;
  pricePerKg: number;
  pricingID?: string;
}) => {
  try {
    const response = await api().post("/fertilizer/create", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFertilizersApi = async ({
  paginationReq,
}: {
  paginationReq?: {
    page: number;
    perPage: number;
  };
}) => {
  try {
    const response = await api().get("fertilizer/fertilizers", {
      params: {
        ...paginationReq,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFertilizersFormApi = async () => {
  try {
    const response = await api().get("/fertilizer/get-fertilizer");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateFertilizer = () => {
  return useMutation({
    mutationFn: addFertilizerApi,
  });
};

export const useFertilizers = ({
  paginationReq,
}: {
  paginationReq?: {
    page: number;
    perPage: number;
  };
}) => {
  return useQuery<{
    fertilizers: Fertilizer[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }>({
    queryKey: [import.meta.env.BASE_URL, paginationReq],
    queryFn: () => getFertilizersApi({ paginationReq }),
  });
};

export const useGetFertilizers = () => {
  return useQuery<Fertilizer[]>({
    queryKey: [import.meta.env.BASE_URL],
    queryFn: () => getFertilizersFormApi(),
  });
};
