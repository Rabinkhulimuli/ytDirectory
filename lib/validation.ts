import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD",mode:"no-cors" });
        const contentType = res.headers.get("content-type");
        console.log(contentType)
        return contentType?.startsWith("image/"); // Validates if it's an image
      } catch {
        return false; // Fails validation if fetch fails
      }
    }, {
      message: "The link must point to a valid image file (jpg, jpeg, png)."
    }),
  pitch: z.string().min(5),
});
