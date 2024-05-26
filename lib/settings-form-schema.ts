import { z } from "zod";

export const settingsFormSchema = z.object({
  title: z.string().min(2).max(50),

});
