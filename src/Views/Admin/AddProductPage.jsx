import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import SectionTitle from "../../Components/SectionTitle";
import containerStyles from "../../utils/containerStyles";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import useUploadProduct from "../../hooks/useUploadProduct";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState({});
  const [price, setPrice] = useState();
  const [files, setFiles] = useState([]);
  const uploadProduct = useUploadProduct();
  const navigate = useNavigate();

  if (!sessionStorage.token) {
    navigate("/admin-login");
  }

  const handleUploadClick = (e) => {
    e.preventDefault();

    if (files) {
      const data = new FormData();
      [...files].forEach((file) => {
        data.append("images", file, file.name);
      });

      for (const [key, value] of Object.entries(details)) {
        data.append(`details[${key}]`, value);
      }

      data.append("title", title);
      data.append("description", description);
      data.append("price", price);

      uploadProduct(data);
    }
  };

  const renderImages = () => (
    <List>
      {[...files].map((file, index) => (
        <ListItem key={index}>
          {file.name} - {file.type}
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <SectionTitle tilte="إضــافــة مــنــتــج" />
      <Box
        as="form"
        sx={{
          my: 7,
          mx: { base: "auto", lg: "initial" },
          w: { base: "90%", lg: "70%" },
          ...containerStyles,
        }}
        onSubmit={handleUploadClick}
      >
        <Input
          type="text"
          variant="filled"
          placeholder="اسم المنتج"
          size="lg"
          mb="20px"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          variant="filled"
          placeholder="وصف المنتج"
          size="lg"
          mb="20px"
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormLabel mb="10px" fontSize="18px" fontWeight="bold">
          تفاصيل المنتج :
        </FormLabel>
        <Input
          type="text"
          variant="filled"
          placeholder="البراند"
          size="lg"
          mb="15px"
          onChange={(e) => setDetails({ ...details, brand: e.target.value })}
        />
        <Input
          type="text"
          variant="filled"
          placeholder="بلد المنشأ"
          size="lg"
          mb="15px"
          onChange={(e) =>
            setDetails({ ...details, manufacturer: e.target.value })
          }
        />
        <Input
          type="text"
          variant="filled"
          placeholder="الخامة"
          size="lg"
          mb="15px"
          onChange={(e) => setDetails({ ...details, material: e.target.value })}
        />
        <Input
          type="text"
          variant="filled"
          placeholder="العدسات"
          size="lg"
          mb="15px"
          onChange={(e) => setDetails({ ...details, lenses: e.target.value })}
        />
        <FormControl>
          <FormLabel mb="10px" fontSize="18px" fontWeight="bold">
            سعر المنتج :{" "}
          </FormLabel>
          <NumberInput variant="outline" size="lg" mb="20px">
            <NumberInputField
              sx={{ direction: "ltr" }}
              // @ts-ignore
              onChange={(e) => setPrice(e.target.value)}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel
            sx={{
              w: "100%",
              p: "10px",
              borderRadius: "md",
              bg: "gray.100",
              _hover: {
                bg: "gray.200",
              },
              display: "flex",
              alignItems: "center",
              flexDir: "row",
            }}
          >
            <FaPlus fontSize="24px" />
            <Divider orientation="vertical" mx="8px" />
            <Text display="inline" fontSize="18px" fontWeight="bold">
              إضــافــة صور للمنتج
            </Text>
          </FormLabel>
          <Input
            type="file"
            multiple
            accept="image/*"
            style={{
              display: "none",
            }}
            // @ts-ignore
            onChange={(e) => setFiles(e.target.files)}
          />
        </FormControl>
        {renderImages()}
        <Button
          type="submit"
          p="15px 30px"
          mt="15px"
          colorScheme="white"
          bg="black"
          color="white"
        >
          إضــافــة
        </Button>
      </Box>
    </>
  );
}
