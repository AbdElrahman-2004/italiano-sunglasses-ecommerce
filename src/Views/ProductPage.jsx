import {
  border,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import useGetSingleProduct from "../hooks/useGetSingleProduct";
import { useMatch, useParams } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { useContext, useRef } from "react";
import containerStyles from "../utils/containerStyles";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CartContext } from "../App";
import handleAddToCart from "../utils/handleAddToCart";
import Loading from "../Components/Loading";

export default function ProductPage() {
  const { cart, setCart } = useContext(CartContext);
  let { productId } = useParams();
  const productData = useGetSingleProduct(productId);
  const toast = useToast();
  const [isLargerThan1150] = useMediaQuery("(min-width: 1150px)");

  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  const translationDetailsKeys = (key) => {
    return (
      (key === "brand" && "البراند") ||
      (key === "manufacturer" && "بلد المنشأ") ||
      (key === "material" && "الخامة") ||
      (key === "lenses" && "العدسات")
    );
  };

  let productDetails = [];

  for (const [key, val] of Object.entries(productData.details)) {
    productDetails = [...productDetails, [translationDetailsKeys(key), val]];
  }

  return (
    <>
      <Flex
        sx={{
          pt: { base: 5, lg: 10 },
          pb: { base: 8, lg: 10 },
          gap: "40px",
          flexWrap: "wrap",
          bg: "blackAlpha.50",
          justifyContent: "center",
          ...containerStyles,
        }}
      >
        {Object.values(productData.details).length ? (
          <>
            <Swiper
              modules={[Pagination, Navigation]}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              pagination
              style={{
                aspectRatio: "1/1",
                margin: "0",
                transitionTimingFunction: "ease-in-out",
                height: "100%",
                position: "relative",
                width: isLargerThan1150 ? "fit-content" : "100%",
                border: "1px solid",
                borderColor: "#CBD5E0",
                borderRadius: 8,
                overflow: "hidden",
                maxHeight: "500px",
              }}
              loop
            >
              {productData.images.map(({ url, imgId }) => (
                <SwiperSlide
                  key={imgId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    w="100%"
                    maxH="500px"
                    objectFit={"scale-down"}
                    src={url}
                    alt={productData.title}
                  />
                </SwiperSlide>
              ))}
              <IconButton
                ref={navigationPrevRef}
                aria-label="Next"
                icon={<FaChevronRight />}
                isRound
                sx={{
                  position: "absolute",
                  top: "50%",
                  zIndex: "10",
                  right: "5px",
                  opacity: "0.7",
                  transform: "translateY(-50%)",
                  _hover: {
                    opacity: "0.9",
                  },
                  _disabled: {
                    opacity: "0.5",
                    cursor: "initial",
                    _hover: {
                      opacity: "0.5",
                    },
                    _active: {
                      background: "gray.100",
                    },
                  },
                }}
              />
              <IconButton
                ref={navigationNextRef}
                aria-label="Prev"
                icon={<FaChevronLeft />}
                isRound
                sx={{
                  position: "absolute",
                  top: "50%",
                  zIndex: "10",
                  left: "5px",
                  opacity: "0.7",
                  transform: "translateY(-50%)",
                  _hover: {
                    opacity: "0.9",
                  },
                  _disabled: {
                    opacity: "0.5",
                    cursor: "initial",
                    _hover: {
                      opacity: "0.5",
                    },
                    _active: {
                      background: "gray.100",
                    },
                  },
                }}
              />
            </Swiper>
            <Stack
              sx={{
                minW: isLargerThan1150 ? "400px" : "100%",
                maxW: "600px",
                flex: 1,
                mx: { base: "auto", lg: "initial" },
                // px: "25px",
              }}
            >
              <Heading as={"h3"}>{productData.title}</Heading>
              <Text my="20px" fontSize={22}>
                {productData.description}
              </Text>
              <Box>
                <TableContainer>
                  <Table variant="simple">
                    <Tbody
                      sx={{
                        borderTop: "1px solid",
                        borderColor: "gray.200",
                      }}
                    >
                      {productDetails.map(([key, val], i) => (
                        <Tr key={i}>
                          <Td>{key}</Td>
                          <Td textAlign="left">{val}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <Box flex={1} />
              <Text
                sx={{
                  fontSize: 44,
                  fontWeight: "900",
                }}
              >
                {productData.price} جنيه
              </Text>
              <Button
                colorScheme="white"
                bg="black"
                onClick={() => {
                  handleAddToCart(cart, setCart, productData, toast);
                }}
              >
                اضف الى العربة
              </Button>
            </Stack>
          </>
        ) : (
          <Loading />
        )}
      </Flex>
    </>
  );
}
