import { z } from "zod";
import { webhookSchema } from "../api/schemas";
import useSWRMutation from "swr/mutation";
import api from "../api/api";

async function deleteWebhook(_key: string, { arg }: { arg: { id: number } }) {
  const { id } = arg;
  const success = await api.webhooks.delete(id);
  return success;
}

export default function Webhook({
  webhook,
}: {
  webhook: z.infer<typeof webhookSchema>;
}) {
  const { trigger } = useSWRMutation("webhooks", deleteWebhook, {});
  const handleDeleteWebhookClick = () => {
    trigger({ id: webhook.id });
  };

  return (
    <li>
      <div class="px-1 py-2">
        <div class="underline italic">
          {webhook.target} - {webhook.event}
        </div>
        <div>
          Id: {webhook.id}, Url: {webhook.url}
        </div>
        <div>
          Hmac_alg: {webhook.hmac_algorithm}, Hmac_key: {webhook.hmac_key}
        </div>
        <div>header_authorization: {webhook.header_authorization ?? ""}</div>
        <div>
          <button
            class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleDeleteWebhookClick}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
