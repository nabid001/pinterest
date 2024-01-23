import { z } from "zod";

export const PinFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  link: z.string().url(),
  tag: z.string(),
});

export const InitialValues = {
  title: "",
  description: "",
  link: "",
  tag: "",
};
