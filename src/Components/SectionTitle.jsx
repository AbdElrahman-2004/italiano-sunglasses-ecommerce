import { Heading } from "@chakra-ui/react";
import containerStyles from "../utils/containerStyles";

export default function SectionTitle({ tilte }) {
  return (
    <Heading
      className="custom-bg"
      as="h2"
      size="2xl"
      sx={{
        py: 7,
        textAlign: {
          base: "center",
          lg: "initial",
        },
        color: "white",
        ...containerStyles,
      }}
    >
      {tilte}
    </Heading>
  );
}
