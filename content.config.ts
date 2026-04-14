import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**",
      schema: z.object({
        title: z.string(),
        type: z.string(),
        status: z.string().optional(),
        score: z.number().optional(),
        recommend: z.boolean().optional(),
        notrecommend: z.boolean().optional(),
        date: z.date(),
        image: z.string().optional(),
        hidden: z.boolean().optional(),
      }),
      indexes: [
        { columns: ["title"] },
        { columns: ["type"] },
        { columns: ["status"] },
        { columns: ["score"] },
        { columns: ["recommend"] },
        { columns: ["notrecommend"] },
        { columns: ["date"] },
        { columns: ["hidden"] },
      ],
    }),
  },
});
