import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  ListCategoriesResponse,
} from "./category.types";
import { httpClient } from "../httpClient";
import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

const createCategory = async (
  params: CreateCategoryRequest,
): Promise<CreateCategoryResponse | undefined> => {
  try {
    const res = await httpClient.post<CreateCategoryResponse>(
      "category",
      params,
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
  ctx: GetServerSidePropsContext,
): Promise<ListCategoriesResponse[] | undefined> => {
  const token = parseCookies(ctx)["@nextauth.token"];

  try {
    const res = await httpClient.get<ListCategoriesResponse[]>(
      "category",
      {},
      { Authorization: `Bearer ${token}` },
    );

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
