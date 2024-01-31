import { z } from "zod";

export const PinFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
});

export const InitialValues = {
  title: "",
  description: "",
  link: "",
  tag: "",
};
