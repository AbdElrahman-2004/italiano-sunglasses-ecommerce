import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "../utils/httpStatus";
import { useState } from "react";

// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;
export default function useDeleteProduct() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const token = sessionStorage.getItem("token");

  const deleteProduct = async (url) => {
    setIsDeleting(true);
    const productId = url.split("/")[4];
    if (productId) {
      await axios
        .delete(`${API_URL}/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.status === httpStatus.SUCCESS) {
            toast({
              title: "عملية ناجحة",
              description: "تم حذف المنتج بنجاح",
              status: "success",
              isClosable: false,
              duration: 3000,
            });
            navigate("/admin-dashboard");
          }
        })
        .catch((err) => {
          toast({
            title: "الرابط غير صحيح",
            status: "error",
            isClosable: false,
            duration: 3000,
          });
        });
      setIsDeleting(false);
    }
  };
  return { deleteProduct, isDeleting };
}
