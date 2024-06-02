import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/service/apiClient";
import { Seed } from "@/interfaces/Seed";

export const addSeedApi = async (payload: {
  name: string;
  quantityAvailable: number;
  maxQuantityPerAcre: number;
  compatibleFertilizers: string[];
  pricePerKg: number;
  pricingID?: string;
}) => {
  try {
    const response = await api().post("/seed/create", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSeedsApi = async ({
  paginationReq,
}: {
  paginationReq?: {
    page: number;
    perPage: number;
  };
}) => {
  try {
    const response = await api().get("seed/seeds", {
      params: {
        ...paginationReq,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSeedsFormApi = async () => {
  try {
    const response = await api().get("/seed/get-seeds");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateSeed = () => {
  return useMutation({
    mutationFn: addSeedApi,
  });
};

export const useSeeds = ({
  paginationReq,
}: {
  paginationReq?: {
    page: number;
    perPage: number;
  };
}) => {
  return useQuery<{
    seeds: Seed[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }>({
    queryKey: [import.meta.env.BASE_URL, paginationReq],
    queryFn: () => getSeedsApi({ paginationReq }),
  });
};

export const useGetSeeds = () => {
  return useQuery<Seed[]>({
    queryKey: [import.meta.env.BASE_URL],
    queryFn: () => getSeedsFormApi(),
  });
};
