import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormData } from "../FormDataContext";
import { Button, TextField, FormControl } from "@mui/material";
import { z } from "zod";
import { DeepPartial } from "react-hook-form";

type Props = {
  onNext: () => void;
};

const schema = z.object({
  firstName: z.string().min(2, "Too short").max(10, "Too long").nonempty(),
  lastName: z.string().min(2, "Too short").max(10, "Too long").nonempty(),
  email: z.string().email("Invalid email").nonempty(),
});

export type FormValues = z.infer<typeof schema>;

const Step1: React.FC<Props> = ({ onNext }) => {
  const { formData, setFormData } = useFormData();

  const methods = useForm<DeepPartial<FormValues>>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  const { handleSubmit, formState, register } = methods;

  const onSubmit = (data: DeepPartial<FormValues>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));

    console.log(data);
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        <FormControl fullWidth>
          <TextField
            {...register("firstName")}
            label="First Name"
            required
            error={!!formState.errors.firstName}
            helperText={formState.errors.firstName?.message}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            {...register("lastName")}
            label="Last Name"
            required
            error={!!formState.errors.lastName}
            helperText={formState.errors.lastName?.message}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            {...register("email")}
            label="Email"
            required
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
          />
        </FormControl>

        <Button type="submit" disabled={!formState.isValid}>
          Next
        </Button>
      </form>
    </FormProvider>
  );
};

export default Step1;
