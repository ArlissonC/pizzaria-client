import { categoryService } from "@/services/category";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
const useCategory = () => {
  const [nameCategory, setNameCategory] = useState("");

  const handleRegisterCategory = async (e: FormEvent) => {
    e.preventDefault();

    const res = await categoryService.createCategory({
      name: nameCategory,
    });

    if (res) {
      toast.success(res.message);
      setNameCategory("");
    }
  };

  return { handleRegisterCategory, nameCategory, setNameCategory };
};

export default useCategory;
