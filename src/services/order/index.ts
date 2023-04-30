import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  FinishOrderResponse,
  GetOrderDetailsResponse,
  ListOrdersResponse,
} from "./order.types";
import { httpClient } from "../httpClient";

const listOrders = async (): Promise<ListOrdersResponse[] | undefined> => {
  try {
    const res = await httpClient.get<ListOrdersResponse[]>("order/orders");

    const data: ListOrdersResponse[] = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.warning(error.response?.data.error);
    }
  }
};

const getOrderDetails = async (
  order_id: string,
): Promise<GetOrderDetailsResponse[] | undefined> => {
  try {
    const res = await httpClient.get<GetOrderDetailsResponse[]>(
      "order/details",
      {
        order_id,
      },
    );

    const data: GetOrderDetailsResponse[] = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.warning(error.response?.data.error);
    }
  }
};

const finishOrder = async (
  order_id: string,
): Promise<FinishOrderResponse | undefined> => {
  try {
    const res = await httpClient.put<FinishOrderResponse>("order/finish", {
      order_id,
    });

    const data: FinishOrderResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.warning(error.response?.data.error);
    }
  }
};

export const orderService = {
  listOrders,
  getOrderDetails,
  finishOrder,
};
