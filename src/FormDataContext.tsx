import { createContext, useContext, useState } from 'react';
import { z } from 'zod';
import { DeepPartial } from 'react-hook-form';

const schema = z.object({
  firstName: z.string().min(2, 'Too short').max(10, 'Too long').nonempty(),
  lastName: z.string().min(2, 'Too short').max(10, 'Too long').nonempty(),
  email: z.string().email('Invalid email').nonempty(),
  country: z.string().nonempty(),
  city: z.string().nonempty(),
  address: z.string().optional(),
  emailUpdates: z.boolean().optional(),
  terms: z.boolean().refine((val) => val, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type FormValues = z.infer<typeof schema>;

interface FormDataContextType {
  formData: DeepPartial<FormValues>;
  setFormData: React.Dispatch<React.SetStateAction<DeepPartial<FormValues>>>;
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<DeepPartial<FormValues>>({});

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataProvider;
