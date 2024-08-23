import { Box, Heading } from "@chakra-ui/react";
import Lottie from "lottie-react";
import orderCompleted from "../Animation/order-completed.json";

export default function CompletedOrder() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDir: "column",
        mt: '70px'
      }}
    >
      <Heading as={"h3"} fontSize={50} fontWeight={"extrabold"} mb={'-20px'}>
        تم إستلام طلبك
      </Heading>
      <Box maxW="300px">
        <Lottie animationData={orderCompleted} />
      </Box>
    </Box>
  );
}
