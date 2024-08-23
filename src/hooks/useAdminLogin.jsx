import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// @ts-ignore
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
export default function useAdminLogin() {
  const toast = useToast();
  const navigate = useNavigate();

  const adminLogin = (password) => {
    axios
      .post(LOGIN_URL, {
        password,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        navigate("/admin-dashboard");
      })
      .catch((err) => {
        toast({
          title: "الرقم السري غير صحيح",
          status: "error",
          isClosable: false,
          duration: 3000,
        });
      });
  };

  return adminLogin;
}
