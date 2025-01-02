import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        // Try fetching without 'no-cors' to ensure you can access the content type
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching URL:", error);
        return false;
      }
    }, {
      message: "The provided link is not a valid image URL",
    }),
  pitch: z.string().min(10),
});
