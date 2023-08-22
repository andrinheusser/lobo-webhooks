import { z } from "zod";

export const apiResponseSchema = <T extends z.ZodTypeAny>(
  resourceSchema: T,
) => {
  return z.object({
    data: z.array(resourceSchema),
    meta: z.object({
      count: z.number(),
      totalcount: z.number(),
    }),
  });
};

export const webhookEventSchema = z.object({
  position: z.number(),
  target: z.string(),
  event: z.string(),
  status: z.number(),
  queryparams: z.object({
    ts: z.string(),
    event: z.string(),
    target: z.string(),
    orderuuid: z.string(),
  }),
  description: z.string(),
});

export const webhookSchema = z.object({
  id: z.number(),
  target: z.string(),
  event: z.string(),
  url: z.string(),
  hmac_key: z.string(),
  hmac_algorithm: z.string(),
  header_authorization: z.string().optional(),
});
