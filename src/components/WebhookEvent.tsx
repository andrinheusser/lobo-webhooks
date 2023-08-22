import { set, z } from "zod";
import { webhookEventSchema } from "../api/schemas";
import { useState } from "preact/hooks";
import api from "../api/api";
import useSWRMutation from "swr/mutation";

async function registerWebhook(
  _key,
  {
    arg,
  }: {
    arg: {
      target: string;
      event: string;
      url: string;
      header_authorization?: string;
    };
  }
) {
  const { target, event, url, header_authorization } = arg;
  const { data } = await api.webhooks.post(
    target,
    event,
    url,
    header_authorization
  );
  return data;
}

export default function WebhookEvent({
  webhookevent,
}: {
  webhookevent: z.infer<typeof webhookEventSchema>;
}) {
  const { trigger } = useSWRMutation("webhooks", registerWebhook, {});
  const [isAddingHook, setIsAddingHook] = useState(false);
  const [url, setUrl] = useState("");
  const [header_authorization, setHeaderAuthorization] = useState("");

  const resetRegisterWebhookData = () => {
    setUrl("");
    setHeaderAuthorization("");
  };

  const handleAddWebhookClick = () => {
    setIsAddingHook(true);
  };
  const handleCancelAddWebhookClick = () => {
    setIsAddingHook(false);
    resetRegisterWebhookData();
  };
  const handleSaveWebhookClick = () => {
    setIsAddingHook(false);
    trigger({
      event: webhookevent.event,
      target: webhookevent.target,
      url,
      header_authorization,
    });
    resetRegisterWebhookData();
  };

  return (
    <li class="pb-4">
      <div class="px-1 py-2">
        <div class={"underline italic"}>
          {webhookevent.target} - {webhookevent.event}
        </div>
        <div>
          Position: {webhookevent.position}, Status: {webhookevent.status}
        </div>
        <pre class="text-xs">
          {JSON.stringify(webhookevent.queryparams, null, 2)}
        </pre>
      </div>
      {!isAddingHook && (
        <div>
          <button
            class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleAddWebhookClick}
          >
            Add Webhook
          </button>
        </div>
      )}
      {isAddingHook && (
        <div>
          <div class="flex flex-col gap-1 mb-2">
            <div class="flex flex-col gap-1">
              <label for="username">Hook URL*</label>
              <input
                id="url"
                type="text"
                value={url}
                onInput={(e) => setUrl((e.target as HTMLInputElement).value)}
              />
            </div>
            <div class="flex flex-col gap-1">
              <label for="username">Header Authorization (optional)</label>
              <input
                id="header_authorization"
                type="text"
                value={header_authorization}
                onInput={(e) =>
                  setHeaderAuthorization((e.target as HTMLInputElement).value)
                }
              />
            </div>
          </div>
          <button
            class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleCancelAddWebhookClick}
          >
            Cancel
          </button>
          <button
            class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleSaveWebhookClick}
          >
            Save
          </button>
        </div>
      )}
    </li>
  );
}
