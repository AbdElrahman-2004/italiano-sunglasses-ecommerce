import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Image,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import handleAddToCart from "../utils/handleAddToCart";
import { CartContext } from "../App";
// @ts-ignore
const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export default function ProductCard({ productData }) {
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Card
      pos="relative"
      cursor="pointer"
      _hover={{
        boxShadow: "lg",
      }}
      transitionDuration="0.3s"
      p="15px"
      rounded={7}
      w={"100%"}
    >
      <CardBody
        p={0}
        onClick={() => {
          navigate(`/product/${productData._id}`);
        }}
      >
        <Box
          sx={{
            minH: "160px",
            borderRadius: "lg",
            overflow: "hidden",
            bg: "blackAlpha.100",
            aspectRatio: "1/1",
          }}
        >
          <Image
            src={`${API_IMAGES_URL}/${productData.images[0]}`}
            sx={{
              m: "auto",
              h: "100%",
            }}
            alt={productData.title}
            objectFit="scale-down"
          />
        </Box>
        <Stack mt="4" spacing="2" w="fit-content">
          <Heading as={"h4"} size="sm" fontWeight="extrabold" noOfLines={1}>
            {productData.title}
          </Heading>
          <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
            {productData.description}
          </Text>
          <Text color="#000" fontSize="lg" fontWeight="extrabold" mb={1}>
            {productData.price} جنيه
          </Text>
        </Stack>
      </CardBody>

      <IconButton
        aria-label="Add To Cart"
        icon={<FaCartPlus />}
        isRound
        sx={{
          position: "absolute",
          bottom: "125px",
          left: "20px",
          bg: "#fefefe",
          fontSize: { base: "30px", sm: "22px" },
          h: { base: "60px", sm: "45px" },
          w: { base: "60px", sm: "45px" },
        }}
        _hover={{
          bg: "#000",
          color: "white",
        }}
        // size={{sm:'md'}}
        boxShadow="md"
        onClick={() => {
          handleAddToCart(cart, setCart, productData, toast);
        }}
      />
    </Card>
  );
}
