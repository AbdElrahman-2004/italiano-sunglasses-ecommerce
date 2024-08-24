import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;
export default function useGetSingleProduct(productId) {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    details: {},
    price: null,
    images: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/${productId}`)
      .then((res) => {
        setProductData(res.data.data);
      })
      .catch((err) => {
        navigate("/notfound");
      });
  }, []);

  return productData;
}
