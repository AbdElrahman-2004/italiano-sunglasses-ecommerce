import { Box, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box textAlign={'center'}>
      <Text fontSize={{ base: 40, sm: 60}} fontWeight={'extrabold'} my={14}>يـتـم الـتـحــمـيـل...</Text>
    </Box>
  );
}
