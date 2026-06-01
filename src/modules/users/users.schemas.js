import { z } from "zod";

export const refillWalletSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
  body: z.object({
    amount: z.number().positive("Amount must be a positive number"),
  }),
});

export const getAnalyticsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
