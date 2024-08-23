import { Box, Heading, Text } from "@chakra-ui/react";
import containerStyles from "../utils/containerStyles";

export default function ErrorPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDir: "column",
        p: "150px",
        bg: "blackAlpha.50",
        ...containerStyles,
      }}
    >
      <Heading as={"h2"} fontSize={"170px"} mb={"20px"}>
        404
      </Heading>
      <Text fontSize={"70px"} fontWeight={"bold"}>
        Page Not Found
      </Text>
    </Box>
  );
}
