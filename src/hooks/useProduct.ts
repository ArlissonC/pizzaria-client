import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { productService } from "@/services/product";
import { schemaProductForm } from "@/schemas/productSchema";

const useProduct = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const image = e.target.files[0];

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category_id: "",
      description: "",
      price: "",
    },
    validationSchema: schemaProductForm,
    onSubmit: async (values) => {
      const data = new FormData();

      if (!!imageAvatar) {
        data.append("name", values.name);
        data.append("price", values.price);
        data.append("description", values.description);
        data.append("category_id", values.category_id);
        data.append("file", imageAvatar);

        const res = await productService.registerProduct(data);

        if (res) {
          toast.success(res.message);
          formik.resetForm();
          setAvatarUrl("");
        }
      } else {
        toast.warning("Selecione uma imagem para seu produto");
      }
    },
  });

  return {
    avatarUrl,
    imageAvatar,
    handleFile,
    formik,
  };
};

export default useProduct;
