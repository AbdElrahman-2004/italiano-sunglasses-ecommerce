import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import SectionTitle from "../Components/SectionTitle";
import containerStyles from "../utils/containerStyles";
import { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import deleteFromCart from "../utils/deleteFromCart";
import increaseQuantity from "../utils/increaseQuantity";
import _ from "lodash";
import decreaseQuantity from "../utils/decreaseQuantity";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext } from "../App";
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    setTotalPrice(_.sumBy(cart, (item) => item.price * item.quantity));
  }, [cart]);

  return (
    <Box bg="blackAlpha.50">
      <SectionTitle tilte={"الـعـربـة"} />

      {cart.length ? (
        <HStack
          sx={{
            py: "30px",
            alignItems: "start",
            flexWrap: "wrap",
            gap: "20px",
            ...containerStyles,
          }}
        >
          <Box flex={2}>
            <AnimatePresence>
              {cart.map((productData) => (
                <motion.div
                  key={productData._id}
                  layout
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    direction={{ base: "column", sm: "row" }}
                    variant="filled"
                    key={productData._id}
                    sx={{
                      overflow: "hidden",
                      mb: "12px",
                      bg: "white",
                      boxShadow: "base",
                      cursor: "pointer",
                      transitionDuration: "0.3s",
                      _hover: {
                        boxShadow: "md",
                      },
                    }}
                    onClick={() => {
                      navigate(`/product/${productData._id}`);
                    }}
                  >
                    <Image
                      objectFit="scale-down"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={productData.images[0].url}
                      alt={productData.title}
                      bg={"blackAlpha.50"}
                    />

                    <Stack flex={1}>
                      <CardBody
                        p={{ base: "20px 30px 5px", sm: "25px 30px 5px" }}
                      >
                        <Heading as={"h3"} size="md" noOfLines={1} mb={"5px"}>
                          {productData.title}
                        </Heading>

                        <Text py="2" noOfLines={2} lineHeight="2">
                          {productData.description}
                        </Text>
                        <Text pt="2" fontSize="25px" fontWeight="extrabold">
                          {productData.price} جنيه
                        </Text>
                      </CardBody>

                      <CardFooter p={"10px 30px 25px"}>
                        <HStack
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flex: "1",
                          }}
                        >
                          {isLargerThan700 ? (
                            <Button
                              aria-label="Delete product from cart"
                              bg="#df2020"
                              colorScheme="white"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteFromCart(cart, setCart, productData);
                              }}
                            >
                              حذف من العربة
                            </Button>
                          ) : (
                            <IconButton
                              aria-label="Delete product from cart"
                              bg="#df2020"
                              colorScheme="white"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteFromCart(cart, setCart, productData);
                              }}
                              fontSize={"1.15em"}
                              icon={<MdDelete />}
                            />
                          )}
                          <HStack>
                            <IconButton
                              aria-label="increase-quantity"
                              colorScheme="white"
                              bg="black"
                              icon={<FaPlus />}
                              onClick={(e) => {
                                e.stopPropagation();
                                increaseQuantity(cart, setCart, productData);
                              }}
                            />
                            <Text mx={2} fontSize={"20px"} fontWeight={"bold"}>
                              {productData.quantity}
                            </Text>
                            <IconButton
                              aria-label="decrease-quantity"
                              colorScheme="white"
                              bg="black"
                              icon={<FaMinus />}
                              onClick={(e) => {
                                e.stopPropagation();
                                decreaseQuantity(cart, setCart, productData);
                              }}
                              isDisabled={productData.quantity === 1}
                            />
                          </HStack>
                        </HStack>
                      </CardFooter>
                    </Stack>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
          <Box
            sx={{
              minW: { base: "100%", sm: "300px" },
              flex: 1,
              bg: "white",
              borderRadius: 10,
              p: { base: "20px 30px", sm: "25px 40px" },
              boxShadow: "base",
            }}
          >
            <VStack
              sx={{
                alignItems: "center",
                mb: "35px",
              }}
            >
              <Text
                sx={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  pl: "40px",
                  ml: "auto",
                }}
              >
                الإجمالي بدون تكاليف الشحن :
              </Text>
              <Text
                sx={{
                  fontWeight: "extrabold",
                  fontSize: "30px",
                  mr: "auto",
                }}
              >
                {totalPrice} جنيه
              </Text>
            </VStack>
            <Divider borderLeft=" 1px solid" borderColor="blackAlpha.500" />
            <Box mt="35px">
              <Text
                sx={{
                  fontSize: 22,
                  fontWeight: "bold",
                  mb: "25px",
                }}
              >
                طرق الدفع المتاحة
              </Text>
              <Stack direction="row" alignItems="center">
                <Box
                  sx={{
                    height: "fit-content",
                    width: "75px",
                  }}
                >
                  <Image
                    src={"/Images/payment-methods/vodafone-cash.png"}
                    w="100%"
                  />
                </Box>
                <Divider
                  orientation="vertical"
                  borderLeft=" 1px solid"
                  borderColor="blackAlpha.500"
                  h="67px"
                  mx="15px"
                />
                <Box
                  sx={{
                    height: "45px",
                    width: "fit-content",
                    p: "15px 20px",
                    bg: "#4C096E",
                    borderRadius: 6,
                  }}
                >
                  <Image
                    src={"/Images/payment-methods/instapay.png"}
                    h={"100%"}
                  />
                </Box>
              </Stack>
            </Box>
            <Button
              sx={{
                w: "100%",
                mt: "40px",
                bg: "black",
              }}
              colorScheme="white"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              إتمام عملية الشراء
            </Button>
          </Box>
        </HStack>
      ) : (
        <VStack
          sx={{
            py: "40px",
            justifyContent: "center",
            alignItems: "center",
            ...containerStyles,
          }}
          spacing={8}
        >
          <FaShoppingCart fontSize={90} color="#333" />
          <Text fontSize={28} fontWeight={"bold"} textAlign={"center"}>
            لم تحصل على منتجات بعد؟ واصل التسوق للإستكشاف
          </Text>
          <Button
            colorScheme={"white"}
            bg={"black"}
            size={"lg"}
            onClick={() => {
              navigate("/store");
            }}
          >
            استكشف المنتجات
          </Button>
        </VStack>
      )}
    </Box>
  );
}
