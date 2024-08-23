import { Box, Grid, GridItem } from "@chakra-ui/react";
import ProductCard from "../Components/ProductCard";
import containerStyles from "../utils/containerStyles";
import useGetProducts from "../hooks/useGetProducts";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Loading from "../Components/Loading";
import SectionTitle from "../Components/SectionTitle";

export default function Store() {
  const [page, setPage] = useState(1);
  const data = useGetProducts(page, 16);

  return (
    <>
      <SectionTitle tilte={"الـمــتــجــر"} />
      <Box
        sx={{
          pt: 7,
          pb: 12,
          bg: "blackAlpha.50",
          mx: "auto",
          ...containerStyles,
        }}
      >
        {data.products.length ? (
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {data.products.map((productData) => (
              <GridItem key={productData._id} minW="fit-content">
                <ProductCard productData={productData} />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Loading />
        )}
        {data.totalPages > 1 && (
          <ReactPaginate
            className="pagination"
            pageCount={data.totalPages}
            onPageChange={(e) => {
              setPage(e.selected + 1);
            }}
            nextLabel={<FaChevronRight />}
            previousLabel={<FaChevronLeft />}
          />
        )}
      </Box>
    </>
  );
}
