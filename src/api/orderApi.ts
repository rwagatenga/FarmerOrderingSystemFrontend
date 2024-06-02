import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/service/apiClient";
import { Order, OrderStatus, PaymentStatus } from "@/interfaces/Order";

export type OrderHeaders = {
  id: string;
  LandOwner: string;
  LandUPI: string;
  LandAddress: string;
  SeedName: string;
  SeedQuantityOrdered: number;
  SeedTotalPrice: number;
  FertilizerName: string;
  FertilizerQuantityOrdered: number;
  FertilizerTotalPrice: number;
  Status: OrderStatus;
  PaymentStatus: PaymentStatus;
};
export const addOrderApi = async (payload: {
  _id: string;
  farmerID?: string;
  landID?: string;
  fertilizerID?: string;
  seedID?: string;
  fertilizerQuantityOrdered?: number;
  seedQuantityOrdered?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  seedPricePerUnit?: number;
  seedTotalPrice?: number;
  fertilizerPricePerUnit?: number;
  fertilizerTotalPrice?: number;
}) => {
  try {
    const response = await api().post("/order/create", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersApi = async ({
  paginationReq,
  farmerID,
}: {
  paginationReq?: {
    page: number;
    perPage: number;
  };
  farmerID?: string;
}) => {
  try {
    const response = await api().get("order/orders", {
      params: {
        ...paginationReq,
        farmerID,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderApi = async (
  payload: Partial<Order> & { id: string },
) => {
  const { id, ...rest } = payload;
  try {
    const response = await api().put(`/order/update/`, rest, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: addOrderApi,
  });
};

export const useOrders = ({
  paginationReq,
  farmerID,
}: {
  paginationReq?: {
    page: number;
    perPage: number;
  };
  farmerID?: string;
}) => {
  return useQuery<{
    orders: Order[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }>({
    queryKey: [import.meta.env.BASE_URL, paginationReq, farmerID],
    queryFn: () => getOrdersApi({ paginationReq, farmerID }),
  });
};

export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: updateOrderApi,
  });
};
