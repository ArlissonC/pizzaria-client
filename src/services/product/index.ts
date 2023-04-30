import { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import { RegisterProductResponse } from "./product.types";
import { toast } from "react-toastify";

const registerProduct = async (
  params: FormData,
): Promise<RegisterProductResponse | undefined> => {
  try {
    const res = await httpClient.post<RegisterProductResponse>(
      "product",
      params,
    );
    const data: RegisterProductResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.warning(error.response?.data.error);
    }
  }
};

export const productService = {
  registerProduct,
};
