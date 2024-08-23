import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import SectionTitle from "./SectionTitle";
import { Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import sliderRatesData from "../data/sliderRatesData";

export default function RatesSection() {
  const [isLowerThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={{ bg: "blackAlpha.50" }}>
      <SectionTitle tilte="تـقـيـيـمــات عـمـلائـنــا" />
      <Box
        sx={{
          py: "30px",
          h: "500px",
          px: { base: "15px", md: 0 },
        }}
      >
        <Swiper
          modules={[Pagination, EffectCoverflow, Autoplay]}
          effect="coverflow"
          pagination
          style={{
            aspectRatio: "1/1",
            margin: "0",
            transitionTimingFunction: "ease-in-out",
            height: "100%",
            position: "relative",
            width: "100%",
            marginBottom: "30px",
          }}
          coverflowEffect={{
            rotate: 0,
            scale: 1,
            slideShadows: false,
            depth: 0,
            stretch: 10,
          }}
          slidesPerView={isLowerThan768 ? 1 : 3}
          loop
          spaceBetween="20px"
          autoplay={{
            delay: 3000,
          }}
        >
          {sliderRatesData.map((el, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: "#CBD5E0",
                overflow: "hidden",
                borderRadius: 12,
                background: "white",
              }}
            >
              <Image w="100%" src={el.img} alt="Rate" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
