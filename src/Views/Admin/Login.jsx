import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import useAdminLogin from "../../hooks/useAdminLogin";

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [password, setPassword] = useState("");
  const adminLogin = useAdminLogin();

  return (
    <Stack
      sx={{
        textAlign: "center",
        maxW: "50%",
        m: "auto",
      }}
    >
      <Heading
        as="h3"
        sx={{
          m: "60px 0 40px",
        }}
        size="2xl"
      >
        Admin Dashboard
      </Heading>
      <InputGroup>
        <Input
          placeholder="Password"
          size="lg"
          sx={{
            mb: "30px",
            textAlign: "left",
            borderColor: "gray.300",
          }}
          type={show ? "text" : "password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            mt="10px"
            mr="10px"
            size="sm"
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        sx={{
          mb: "100px",
          width: "fit-content",
          p: "15px 30px",
          mx: "auto",
          color: "white",
          bg: "black",
        }}
        colorScheme="white"
        onClick={() => {
          adminLogin(password);
        }}
      >
        تسجيل الدخول
      </Button>
    </Stack>
  );
}
