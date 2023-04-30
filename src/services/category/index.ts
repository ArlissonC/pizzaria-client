import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  ListCategoriesResponse,
} from "./category.types";
import { httpClient } from "../httpClient";
import { parseCookies } from "nookies";

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

const listCategories = async (
  ctx: any,
): Promise<ListCategoriesResponse[] | undefined> => {
  const token = parseCookies(ctx)["@nextauth.token"];

  try {
    const res = await httpClient.get<ListCategoriesResponse[]>(
      "category",
      {},
      { Authorization: `Bearer ${token}` },
    );

    console.log(res);
    const data: ListCategoriesResponse[] = res.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.warning(error.response?.data.error);
    }
  }
};

export const categoryService = {
  createCategory,
  listCategories,
};
