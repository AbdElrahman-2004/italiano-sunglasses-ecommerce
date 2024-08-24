import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import SectionTitle from "../../Components/SectionTitle";
import containerStyles from "../../utils/containerStyles";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteProductPage() {
  const [url, setUrl] = useState("");
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const navigate = useNavigate();

  if (!sessionStorage.token) {
    navigate("/admin-login");
  }

  return (
    <Box>
      <SectionTitle tilte="حـــذف مــنــتــج" />
      <Box sx={{ py: "80px", ...containerStyles }}>
        <InputGroup size="md" sx={{ direction: "ltr" }}>
          <InputLeftAddon sx={{ direction: "ltr" }}>https://</InputLeftAddon>
          <Input
            placeholder="أضف رابط المنتج"
            sx={{ direction: "ltr" }}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <InputRightAddon sx={{ direction: "ltr" }}>.com</InputRightAddon>
        </InputGroup>
        <Button
          type="submit"
          p="15px 30px"
          mt="25px"
          colorScheme="white"
          bg="black"
          color="white"
          onClick={() => {
            deleteProduct(url);
          }}
          isDisabled={isDeleting}
        >
          تـأكـيـد
        </Button>
      </Box>
    </Box>
  );
}
