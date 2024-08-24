import { Box, Heading } from "@chakra-ui/react";
import Lottie from "lottie-react";
import orderCompleted from "../Animation/order-completed.json";
import containerStyles from "../utils/containerStyles";

export default function CompletedOrder() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDir: "column",
        mt: "70px",
        textAlign: "center",
        ...containerStyles,
      }}
    >
      <Heading
        as={"h3"}
        fontSize={{ base: 36, sm: 50 }}
        fontWeight={"extrabold"}
        mb={{ base: "-30px", sm: "-20px" }}
        lineHeight={1.5}
      >
        تم إستلام طلبك
      </Heading>
      <Box maxW="300px">
        <Lottie animationData={orderCompleted} />
      </Box>
    </Box>
  );
}
