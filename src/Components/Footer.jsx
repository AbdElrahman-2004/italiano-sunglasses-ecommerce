import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  Wrap,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa6";
import { LuMessagesSquare } from "react-icons/lu";
import containerStyles from "../utils/containerStyles";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box transitionDuration={".3s"}>
      <Flex
        sx={{
          bg: "black",
          pt: "30px",
          pb: "40px",
          gap: "50px 80px",
          ...containerStyles,
        }}
        flexWrap="wrap"
      >
        <Stack direction="column" spacing={10} sx={{ color: "white" }}>
          <Box>
            <Text
              sx={{
                fontSize: 22,
                fontWeight: "bold",
                mb: 4,
              }}
            >
              تابعنا عبر
            </Text>
            <Wrap spacing={4} fontSize={34}>
              <Link
                _hover={{
                  color: "#1877f2",
                }}
                transitionDuration="0.3s"
                cursor="pointer"
                href="https://www.facebook.com/profile.php?id=100075752301887"
              >
                <FaFacebook />
              </Link>
              {/* <Link
                _hover={{
                  color: "#e1306c",
                }}
                transitionDuration="0.3s"
                cursor="pointer"
              >
                <FaInstagram />
              </Link>
              <Link
                _hover={{
                  color: "#0088cc",
                }}
                transitionDuration="0.3s"
                cursor="pointer"
              >
                <FaTelegram />
              </Link>
              <Link
                _hover={{
                  color: "#000",
                }}
                transitionDuration="0.3s"
                cursor="pointer"
              >
                <FaTiktok />
              </Link> */}
            </Wrap>
          </Box>
          <Button
            sx={{
              fontSize: 22,
              fontWeight: "bold",
              mb: 4,
              justifyContent: "space-between",
              maxW: "200px",
            }}
            leftIcon={<LuMessagesSquare />}
            onClick={() => {
              navigate("/contact");
            }}
          >
            تواصل معنا
          </Button>
        </Stack>
        <Box sx={{ color: "white" }}>
          <Text
            sx={{
              fontSize: 22,
              fontWeight: "bold",
              mb: 4,
            }}
          >
            عنوان الاستور
          </Text>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d215.83010406975717!2d31.214442320238007!3d30.05745978829617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841ecec039b11%3A0x84dbbccd0220bcc3!2sSunglasses%20ltalynwo!5e0!3m2!1sen!2seg!4v1723850249068!5m2!1sen!2seg"
            height="220px"
            style={{ border: 0, width: "100%" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <Text
            sx={{
              maxW: "400px",
              mt: 3,
              fontSize: 18,
              lineHeight: 1.6,
              color: "blackAlpah.50",
            }}
          >
            الغيث العجوزة رقم 10 أمام باب مستشفى العجوزة الخيرية وخلف فندق شهر
            زاد , Giza, Egypt
          </Text>
        </Box>
        <Box sx={{ color: "white" }}>
          <Text
            sx={{
              fontSize: 22,
              fontWeight: "bold",
              mb: 4,
            }}
          >
            أنواع دفع متعددة و آمنة
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
              borderLeft=" 1px solid white"
              h="67px"
              mx="10px"
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
              <Image src={"/Images/payment-methods/instapay.png"} h={"100%"} />
            </Box>
          </Stack>
        </Box>
      </Flex>
      <Box
        sx={{
          bg: "#111",
          color: "white",
          py: 5,
          fontSize: "18px",
          ...containerStyles,
        }}
      >
        جميع الحقوق محفوظة &#169; 2024.
      </Box>
    </Box>
  );
}
