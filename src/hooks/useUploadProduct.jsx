import axios from "axios";
import httpStatus from "../utils/httpStatus";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;
export default function useUploadProduct() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const token = sessionStorage.getItem("token");
  const uploadProduct = async (data) => {
    setIsUploading(true);
    await axios
      .post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === httpStatus.SUCCESS) {
          navigate("/admin-dashboard");
          toast({
            title: "عملية ناجحة",
            description: "تمت إضافة المنتج بنجاح",
            status: "success",
            duration: 3000,
          });
        }
      })
      .catch((err) => console.log(err.response.data));
    setIsUploading(false);
  };
  return { uploadProduct, isUploading };
}
