import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
} from "./category.types";
import { httpClient } from "../httpClient";

const createCategory = async (
  param: CreateCategoryRequest,
): Promise<CreateCategoryResponse | undefined> => {
  try {
    const res = await httpClient.post<CreateCategoryResponse>(
      "category",
      param,
    );
    const data: CreateCategoryResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.warning(error.response?.data.error);
    }
  }
};

export const categoryService = {
  createCategory,
};
