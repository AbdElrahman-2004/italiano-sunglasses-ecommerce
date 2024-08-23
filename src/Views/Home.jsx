import { Heading, Image, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFlip } from "swiper/modules";
import sliderData from "../data/sliderModelsData";
import BrandsSection from "../Components/BrandsSection";
import StoreSection from "../Components/StoreSection";
import RatesSection from "../Components/RatesSection";
import containerStyles from "../utils/containerStyles";
import "swiper/css";
import "swiper/css/bundle";
import { useContext } from "react";
import { CartContext } from "../App";

export default function Home() {
  const { cart, setCart } = useContext(CartContext);
  const [isLargerThan1240] = useMediaQuery("(min-width: 1240px)");

  return (
    <>
      <Stack
        direction="row"
        sx={{
          bg: "blackAlpha.900",
          minH: "500px",
          alignItems: "center",
          justifyContent: { base: "center", lg: "space-between" },
          flexWrap: "wrap",
          py: "110px",
          ...containerStyles,
        }}
      >
        <Stack
          direction="column"
          sx={{
            maxW: "600px",
            color: "white",
            textAlign: { base: "center", lg: "initial" },
          }}
        >
          <Heading
            as="h1"
            size="4xl"
            sx={{
              maxW: "600px",
              color: "white",
              mb: "40px",
              lineHeight: "1.4",
            }}
          >
            تألّق بأناقة وإطلالة مميزة
          </Heading>
          <Text fontSize="2xl" lineHeight="2">
            &quot; اكتشف مجموعتنا الواسعة من النظارات الشمسية التي تجمع بين
            الأناقة والحماية لتجد زوج النظارات المثالي لك &quot;
          </Text>
        </Stack>

        {isLargerThan1240 && (
          <Swiper
            modules={[EffectFlip, Autoplay]}
            effect="flip"
            style={{
              aspectRatio: "1/1",
              margin: "0",
              transitionTimingFunction: "ease-in-out",
              maxWidth: "410px",
            }}
            autoplay={{
              delay: 3000,
            }}
            speed={2500}
            loop
          >
            {sliderData.map((slide) => (
              <SwiperSlide key={slide.img}>
                <Image
                  sx={{ borderRadius: 14, w: "410px", h: "410px" }}
                  src={slide.img}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Stack>
      <BrandsSection />
      <StoreSection />
      <RatesSection />
    </>
  );
}
