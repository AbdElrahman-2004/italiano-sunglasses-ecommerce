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
          {...register("name", {
            required: { value: true, message: "هذا الحقل مطلوب" },
          })}
        />
        {errors.name && (
          <Text color={"red"} mt={"-10px"}>
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
          {...register("phone", {
            required: { value: true, message: "هذا الحقل مطلوب" },
            pattern: {
              value: /^01[0-2,5]{1}[0-9]{8}$/,
              message: "رقم الهاتف غير صحيح",
            },
          })}
        />
        {errors.phone && (
          <Text color={"red"} mt={"-10px"}>
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
          {...register("email", {
            required: { value: true, message: "هذا الحقل مطلوب" },
          })}
        />

        {errors.email && (
          <Text color={"red"} mt={"-10px"}>
            {errors.email.message}
          </Text>
        )}

        <Textarea
          id="message"
          placeholder="رسالــــــتك"
          name="الرسالة"
          variant={"filled"}
          size="lg"
          {...register("message", {
            required: { value: true, message: "هذا الحقل مطلوب" },
            minLength: { value: 20, message: "يرجى كتابة 20 حرف على الأقل" },
          })}
        />

        {errors.message && (
          <Text color={"red"} mt={"-10px"}>
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
          isDisabled={isSubmitting}
        >
          إرسال
        </Button>
      </Box>
    </Stack>
  );
}
