import { Box, Button, Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import containerStyles from "../utils/containerStyles";
import useGetProducts from "../hooks/useGetProducts";
import Loading from "./Loading";
export default function StoreSection() {
  const navigate = useNavigate();
  const data = useGetProducts(1, 10);

  return (
    <Box
      sx={{
        mt: -3,
      }}
    >
      <SectionTitle tilte="الـــمـتـجـر" />
      <Box
        sx={{
          bg: "blackAlpha.50",
          pt: 9,
          pb: 12,
        }}
      >
        <Grid
          templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
          gap={6}
          sx={{
            mx: "auto",
            justifyContent: "center",
            ...containerStyles,
          }}
        >
          {data.products.length
            ? data.products.map((productData) => (
                <GridItem key={productData._id} sx={{ minW: "240px" }}>
                  <ProductCard productData={productData} />
                </GridItem>
              ))
            : null}
        </Grid>
        {data.products.length ? (
          <Button
            size="lg"
            colorScheme="white"
            sx={{
              bg: "black",
              color: "white",
              mx: "auto",
              mt: 9,
              display: "block",
            }}
            onClick={() => navigate("/store")}
          >
            عرض المزيد
          </Button>
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
}
