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

export default function Home() {
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
          py: { base: "100px", sm: "110px" },
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
            fontSize={{ base: "2.8em" }}
            size={{ sm: "4xl" }}
            sx={{
              maxW: "600px",
              color: "white",
              mb: { base: "35px", sm: "40px" },
              lineHeight: "1.4 !important",
            }}
          >
            تألّق بأناقة وإطلالة مميزة
          </Heading>
          <Text fontSize={{ base: "1.15em", sm: "2xl" }} lineHeight="2">
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
