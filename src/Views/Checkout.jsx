// @ts-nocheck
import {
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  Box,
  StepTitle,
  StepSeparator,
  HStack,
  Button,
  Input,
  Stack,
  Textarea,
  Divider,
  VStack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import containerStyles from "../utils/containerStyles";
import { useSubmit, ValidationError } from "@formspree/react";
import _ from "lodash";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const emailRegEx =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegEx = /^01[0-2,5]{1}[0-9]{8}$/;

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();

  const orderedProducts = () => {
    return Object.values(cart)
      .map((m) => `${m.quantity} - ${m.title}`)
      .join("\n");
  };

  const {
    formState: { errors, isSubmitSuccessful, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm();

  const submit = useSubmit("xgvwloed", {
    onError(errs) {
      const formErrs = errs.getFormErrors();
      for (const { code, message } of formErrs) {
        setError(`root.${code}`, {
          type: code,
          message,
        });
      }

      const fieldErrs = errs.getAllFieldErrors();
      for (const [field, errs] of fieldErrs) {
        setError(field, {
          message: errs.map((e) => e.message).join(", "),
        });
      }
    },
    extraData: {
      "المنتجات المطلوبة": orderedProducts,
      "الإجمالي بدون تكاليف الشحن": `جنيه ${totalPrice}`,
    },
  });

  useEffect(() => {
    setTotalPrice(_.sumBy(cart, (item) => item.price * item.quantity));
  }, [cart]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate("/completed-order");
      localStorage.removeItem("cart");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }

    if (errors.root) {
      toast({
        title: "حدثت مشكلة",
        description: "حاول مرة اخرى",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
  }, [isSubmitSuccessful]);

  const steps = [
    { title: "عربة المشتريات" },
    { title: "إنهاء الطلب والشحن" },
    { title: "تأكيد الطلب" },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Box py="50px" bg={"blackAlpha.50"}>
      <Stepper
        size={{ base: "sm", md: "md", lg: "lg" }}
        index={activeStep}
        sx={containerStyles}
        alignItems={{ base: "start !important", lg: "initial" }}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            sx={{
              flexDir: { base: "column", lg: "initial" },
              textAlign: { base: "center", lg: "initial" },
              flex: { base: "1 !important", lg: "initial" },
            }}
          >
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <HStack
        sx={{
          mt: "65px",
          mb: "35px",
          alignItems: "start",
          gap: "40px 20px",
          flexDir: { base: "column-reverse", lg: "initial" },
          ...containerStyles,
        }}
      >
        <Stack
          mx={{ base: "auto", lg: 5 }}
          flex={2}
          w={{ base: "90%", lg: "initial" }}
        >
          <Box
            as="form"
            onSubmit={handleSubmit(submit)}
            sx={{
              w: "100%",
              ml: "auto",
              display: "flex",
              justifyContent: "center",
              flexDir: "column",
              gap: "15px",
            }}
          >
            <Input
              id="name"
              placeholder="الاسم"
              name="الاسم"
              type="text"
              variant={"filled"}
              size={"lg"}
              boxShadow={"base"}
              bg={"white"}
              _hover={{
                bg: "gray.100",
              }}
              border={errors.name && "2px solid red"}
              {...register("name", {
                required: { value: true, message: "هذا الحقل مطلوب" },
              })}
            />
            {errors.name && (
              <Text color={"red"} mt={"-10px"} mb={"-5px"}>
                {errors.name.message}
              </Text>
            )}
            <Input
              id="phone"
              placeholder="رقم الموبايل"
              name="رقم الموبايل"
              type="tel"
              variant={"filled"}
              size={"lg"}
              boxShadow={"base"}
              bg={"white"}
              _hover={{
                bg: "gray.100",
              }}
              border={errors.name && "2px solid red"}
              {...register("phone", {
                required: { value: true, message: "هذا الحقل مطلوب" },
                pattern: {
                  value: phoneRegEx,
                  message: "رقم الهاتف غير صحيح",
                },
              })}
            />
            {errors.phone && (
              <Text color={"red"} mt={"-10px"} mb={"-5px"}>
                {errors.phone.message}
              </Text>
            )}
            <Input
              id="email"
              placeholder="البريد الالكتروني"
              name="البريد الالكتروني"
              type="email"
              variant={"filled"}
              size={"lg"}
              boxShadow={"base"}
              bg={"white"}
              _hover={{
                bg: "gray.100",
              }}
              formNoValidate
              border={errors.name && "2px solid red"}
              {...register("email", {
                required: { value: true, message: "هذا الحقل مطلوب" },
                pattern: {
                  value: emailRegEx,
                  message: "هذا الايميل غير صحيح",
                },
              })}
            />
            {errors.email && (
              <Text color={"red"} mt={"-10px"} mb={"-5px"}>
                {errors.email.message}
              </Text>
            )}
            <Input
              id="address"
              placeholder="عنوان الشارع / الحي"
              name="عنوان الشارع / الحي"
              type="text"
              variant={"filled"}
              size={"lg"}
              boxShadow={"base"}
              bg={"white"}
              _hover={{
                bg: "gray.100",
              }}
              border={errors.name && "2px solid red"}
              {...register("address", {
                required: { value: true, message: "هذا الحقل مطلوب" },
              })}
            />
            {errors.address && (
              <Text color={"red"} mt={"-10px"} mb={"-5px"}>
                {errors.address.message}
              </Text>
            )}
            <Input
              id="region"
              placeholder="المنطقة"
              name="المنطقة"
              type="text"
              variant={"filled"}
              size={"lg"}
              boxShadow={"base"}
              bg={"white"}
              _hover={{
                bg: "gray.100",
              }}
              border={errors.name && "2px solid red"}
              {...register("region", {
                required: { value: true, message: "هذا الحقل مطلوب" },
              })}
            />
            {errors.region && (
              <Text color={"red"} mt={"-10px"} mb={"-5px"}>
                {errors.region.message}
              </Text>
            )}
            <Textarea
              placeholder="ملحوظات اضافية (اختياري)"
              name="ملحوظات اضافية"
              variant={"filled"}
              size={"lg"}
              boxShadow={"base"}
              bg={"white"}
              _hover={{
                bg: "gray.100",
              }}
              minH={"100px"}
            />
            <Button
              sx={{
                w: "100%",
                bg: "black",
              }}
              colorScheme="white"
              type="submit"
              isDisabled={isSubmitting}
            >
              تأكيد الطلب
            </Button>
          </Box>
        </Stack>
        <Box
          sx={{
            mr: "20px",
            minW: "300px",
            bg: "white",
            borderRadius: 10,
            flex: 1,
            mx: { base: "auto", lg: 5 },
            p: "25px 40px",
            boxShadow: "base",
            w: { base: "90%", lg: "initial" },
          }}
        >
          <VStack
            sx={{
              alignItems: "center",
              mb: "35px",
            }}
          >
            <Text
              sx={{
                fontWeight: "bold",
                fontSize: "25px",
                pl: "40px",
                ml: "auto",
              }}
            >
              الإجمالي بدون تكاليف الشحن :
            </Text>
            <Text
              sx={{
                fontWeight: "extrabold",
                fontSize: "30px",
                mr: "auto",
              }}
            >
              {totalPrice} جنيه
            </Text>
          </VStack>
          <Divider borderLeft=" 1px solid" borderColor="blackAlpha.500" />
          <Box mt="35px">
            <Text
              sx={{
                fontSize: 22,
                fontWeight: "bold",
                mb: "25px",
              }}
            >
              طرق الدفع المتاحة
            </Text>
            <Stack direction="row" alignItems="center">
              <Box
                sx={{
                  height: "fit-content",
                  width: "75px",
                }}
              >
                <Image
                  src={"/Images/payment-methods/vodafone-cash.png"}
                  w="100%"
                />
              </Box>
              <Divider
                orientation="vertical"
                borderLeft=" 1px solid"
                borderColor="blackAlpha.500"
                h="67px"
                mx="15px"
              />
              <Box
                sx={{
                  height: "45px",
                  width: "fit-content",
                  p: "15px 20px",
                  bg: "#4C096E",
                  borderRadius: 6,
                }}
              >
                <Image
                  src={"/Images/payment-methods/instapay.png"}
                  h={"100%"}
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}
