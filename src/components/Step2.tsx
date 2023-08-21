import {
  TextField,
  Button,
  FormControl,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormData } from "../FormDataContext";
import { z } from "zod";
import { DeepPartial } from "react-hook-form";

type Props = {
  onBack: () => void;
};

const schema = z.object({
  country: z.string().nonempty(),
  city: z.string().nonempty(),
  address: z.string().optional(),
  emailUpdates: z.boolean().optional(),
  terms: z.boolean().refine((val) => val, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof schema>;

function Step2({ onBack }: Props) {
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

    console.log(formData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FormControl fullWidth>
          <TextField
            {...register("country")}
            label="Country"
            required
            error={!!formState.errors.country}
            helperText={formState.errors.country?.message}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            {...register("city")}
            label="City"
            required
            error={!!formState.errors.city}
            helperText={formState.errors.city?.message}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            {...register("address")}
            label="Address"
            error={!!formState.errors.address}
            helperText={formState.errors.address?.message}
          />
        </FormControl>

        <FormControlLabel
          control={<Switch {...register("emailUpdates")} color="primary" />}
          label="Email updates"
        />

        <FormControlLabel
          control={<Switch {...register("terms")} color="primary" />}
          label="I agree to the terms and conditions"
        />

        <Button onClick={onBack}>Back</Button>
        <Button
          type="submit"
          onClick={methods.handleSubmit(onSubmit)}
          disabled={!formState.isValid}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}

export default Step2;
