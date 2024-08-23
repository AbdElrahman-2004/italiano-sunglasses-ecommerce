import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;

export default function useGetProducts(page, limit) {
  const [data, setData] = useState({
    products: [],
    totalPages: 1,
  });
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`${API_URL}?page=${page || 1}&limit=${limit || 14}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toast({
          title: "حدثت مشكلة في جلب المنتجات",
          isClosable: false,
          duration: 5000,
          size: "lg",
          status: "error",
        });
      });
  }, [page]);

  return data;
}
