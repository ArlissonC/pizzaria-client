import { categoryService } from "@/services/category";
import { FormEvent, useState } from "react";
const useCategory = () => {
  const [nameCategory, setNameCategory] = useState("");

  const handleRegisterCategory = (e: FormEvent) => {
    e.preventDefault();

    categoryService.createCategory({ name: nameCategory });
  };

  return { handleRegisterCategory, nameCategory, setNameCategory };
};

export default useCategory;
