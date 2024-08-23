import { SimpleGrid, Box, Image } from "@chakra-ui/react";
import containerStyles from "../utils/containerStyles";

const brandsPath = "/Images/brands";
const brands = [
  `${brandsPath}/ray-ban.png`,
  `${brandsPath}/hugo-boss.png`,
  `${brandsPath}/police.png`,
  `${brandsPath}/oakley.png`,
  `${brandsPath}/persol.png`,
  `${brandsPath}/cartier.png`,
];

export default function BrandsSection() {
  return (
    <SimpleGrid
      columns={3}
      gap={4}
      sx={{
        py: "40px",
        height: "80px",
        justifyContent: "center",
        h: "fit-content",
        bg: "blackAlpha.50",
        ...containerStyles,
      }}
    >
      {brands.map((brand, index) => (
        <Box
          style={{
            maxWidth: "200px",
            display: "flex",
            alignItems: "center",
            margin: "auto",
          }}
          key={index}
        >
          <Image src={brand} />
        </Box>
      ))}
    </SimpleGrid>
  );
}
