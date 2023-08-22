import { z } from "zod";
import client from "./client";
import {
  apiResponseSchema,
  webhookEventSchema,
  webhookSchema,
} from "./schemas";

const typedClient = async <T extends z.ZodTypeAny>(
  resource: T,
  url: string,
  options?: RequestInit,
) => {
  const response = await client(url, options);
  const json = await response.json();
  const result = z.object({
    data: z.array(resource),
    meta: z.object({ count: z.number(), totalcount: z.number() }),
  }).parse(json);
  return result;
};

const api = {
  webhookevents: {
    get: () => {
      return typedClient(webhookEventSchema, "webhookevents");
    },
  },
  webhooks: {
    get: () => {
      return typedClient(webhookSchema, "webhooks");
    },
    single: (id: number) => {
      return typedClient(webhookSchema, `webhooks/${id}`);
    },
    post: (
      target: string,
      event: string,
      url: string,
      header_authorization?: string,
    ) => {
      return typedClient(webhookSchema, `webhooks`, {
        method: "POST",
        body: JSON.stringify({
          target,
          event,
          url,
          header_authorization: header_authorization
            ? header_authorization
            : undefined,
        }),
      });
    },
    delete: async (id: number) => {
      const response = await client(`webhooks/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    },
  },
};

export default api;
