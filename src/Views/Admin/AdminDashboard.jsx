import {
  Box,
  Card,
  CardBody,
  Divider,
  Heading,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import containerStyles from "../../utils/containerStyles";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const dashboardOptions = [
  [<HiOutlineViewGridAdd />, "إضــافــة مــنــتــج", "add-product"],
  [<MdDeleteOutline />, "حــــذف مــنــتــج", "delete-product"],
];

export default function AdminDashboard() {
  const [isLargerThan530] = useMediaQuery("(min-width: 530px)");
  const navigate = useNavigate();

  if (!sessionStorage.token) {
    navigate("/admin-login");
  }

  return (
    <Box>
      <Heading
        as="h3"
        sx={{
          py: "25px",
          textAlign: "center",
          bg: "black",
          color: "white",
        }}
        size="2xl"
      >
        Admin Dashboard
      </Heading>
      <Box
        sx={{
          py: "80px",
          bg: "blackAlpha.50",
          w: isLargerThan530 && "100%",
          ...containerStyles,
        }}
      >
        <Stack
          sx={{
            w: "fit-content",
            mx: "auto",
          }}
        >
          {dashboardOptions.map(([icon, text, url], index) => (
            <Link
              // @ts-ignore
              to={url}
              key={index}
            >
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                sx={{
                  mx: "auto",
                  w: isLargerThan530 ? "500px" : "fit-content",
                  bg: "white",
                  boxShadow: "md",
                  cursor: "pointer",
                  mb: "35px",
                  borderColor: "gray.100",
                  transitionDuration: "0.3s",
                }}
                _hover={{
                  background: "gray.100",
                  boxShadow: "lg",
                }}
              >
                <Box p={2} fontSize={isLargerThan530 ? 100 : 200}>
                  {icon}
                </Box>
                {isLargerThan530 && (
                  <>
                    <Divider orientation="vertical" h="115px" />
                    <CardBody>
                      <Text
                        sx={{
                          py: 2,
                          fontSize: 40,
                          fontWeight: "bold",
                          mr: 4,
                        }}
                      >
                        {text}
                      </Text>
                    </CardBody>
                  </>
                )}
              </Card>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
