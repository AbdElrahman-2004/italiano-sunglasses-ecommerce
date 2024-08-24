// @ts-nocheck
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import SectionTitle from "../Components/SectionTitle";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSubmit } from "@formspree/react";

const emailRegEx =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegEx = /^01[0-2,5]{1}[0-9]{8}$/;

export default function ContactUs() {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    formState: { errors, isSubmitSuccessful, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast({
        title: "تم استلام رسالتك",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
      navigate("/");
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
  }, [isSubmitSuccessful, errors.root]);

  const submit = useSubmit("xkgwvona", {
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
  });

  return (
    <Stack>
      <SectionTitle tilte={"أرسل لنا رسالة"} />
      <Box
        as="form"
        onSubmit={handleSubmit(submit)}
        sx={{
          w: { base: "90%", lg: "50%" },
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          flexDir: "column",
          gap: "20px",
          mt: "30px",
          mb: "40px",
        }}
      >
        <Input
          id="name"
          placeholder="الاسم"
          name="الاسم"
          type="text"
          variant={"filled"}
          size="lg"
          border={errors.name && "2px solid red"}
          {...register("name", {
            required: { value: true, message: "هذا الحقل مطلوب" },
          })}
        />
        {errors.name && (
          <Text color={"red"} mt={"-15px"} mb={"-5px"}>
            {errors.name.message}
          </Text>
        )}
        <Input
          id="phone"
          placeholder="رقم الموبايل"
          name="رقم الموبايل"
          type="tel"
          variant={"filled"}
          size="lg"
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
          <Text color={"red"} mt={"-15px"} mb={"-5px"}>
            {errors.phone.message}
          </Text>
        )}

        <Input
          id="email"
          placeholder="البريد الالكتروني"
          name="البريد الالكتروني"
          type="email"
          variant={"filled"}
          size="lg"
          border={errors.name && "2px solid red"}
          formNoValidate
          {...register("email", {
            required: { value: true, message: "هذا الحقل مطلوب" },
            pattern: {
              value: emailRegEx,
              message: "هذا الايميل غير صحيح",
            },
          })}
        />

        {errors.email && (
          <Text color={"red"} mt={"-15px"} mb={"-5px"}>
            {errors.email.message}
          </Text>
        )}

        <Textarea
          id="message"
          placeholder="رسالــــــتك"
          name="الرسالة"
          variant={"filled"}
          size="lg"
          border={errors.name && "2px solid red"}
          {...register("message", {
            required: { value: true, message: "هذا الحقل مطلوب" },
            minLength: { value: 20, message: "يرجى كتابة 20 حرف على الأقل" },
          })}
          h={"140px"}
        />

        {errors.message && (
          <Text color={"red"} mt={"-15px"} mb={"-5px"}>
            {errors.message.message}
          </Text>
        )}

        <Button
          colorScheme="white"
          bg="black"
          w={{ base: "initial", lg: "18%" }}
          mt={"5px"}
          type="submit"
          size="lg"
          border={errors.name && "2px solid red"}
          isDisabled={isSubmitting}
        >
          إرسال
        </Button>
      </Box>
    </Stack>
  );
}
