import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { TbSearch } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import containerStyles from "../utils/containerStyles";
import { useContext } from "react";
import sumOfCartProperties from "../utils/sumOfCartProperties";
import { CartContext } from "../App";

export default function Header() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const toast = useToast();

  return (
    <Flex
      sx={{
        maxH: "80px",
        pos: "sticky",
        top: 0,
        zIndex: 999,
        bg: "white",
        ...containerStyles,
      }}
      boxShadow="base"
    >
      <Link to="/">
        <Image src="/Images/Logo.png" alt="Logo" sx={{ h: "68px" }} />
      </Link>
      <Spacer />

      <Center flex={5}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            {/* <TbSearch /> */}
          </InputLeftElement>
          <Input
            variant="filled"
            placeholder="بحث في المنتجات ..."
            boxShadow="base"
            onFocus={() => {
              toast({
                title: `البحث في المنتجات غير متاح حاليًا`,
                status: "warning",
                isClosable: false,
              });
            }}
          />
          <InputRightElement pointerEvents="none">
            <TbSearch />
          </InputRightElement>
        </InputGroup>
      </Center>
      <Spacer />
      <HStack spacing={{ base: 1, sm: 2, md: 3 }}>
        <Box
          sx={{
            pos: "relative",
            cursor: "pointer",
          }}
          onClick={() => navigate("/cart")}
        >
          <IconButton
            isRound={true}
            colorScheme="white"
            color="white"
            bg="black"
            aria-label="Cart"
            size="md"
            icon={<FaCartShopping />}
          />

          {sumOfCartProperties(cart, "quantity") && (
            <Box
              sx={{
                pos: "absolute",
                top: "-4px",
                right: "-4px",
                bg: "gray.200",
                w: "20px",
                h: "20px",
                rounded: "full",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              {sumOfCartProperties(cart, "quantity")}
            </Box>
          )}
        </Box>
      </HStack>
    </Flex>
  );
}
