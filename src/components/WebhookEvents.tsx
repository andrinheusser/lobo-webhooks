import useSWR from "swr";
import api from "../api/api";
import WebhookEvent from "./WebhookEvent";

export default function WebhookEvents() {
  const { data } = useSWR(`webhookevents`, () => api.webhookevents.get());

  if (data?.meta?.count === 0) return <div>No Webhook Events</div>;

  if (data?.data)
    return (
      <div>
        <h1>Available Webhook Events</h1>
        <ul class="divide-y">
          {data.data.map((webhookevent, i) => (
            <WebhookEvent
              key={`webhookevent-${i}`}
              webhookevent={webhookevent}
            />
          ))}
        </ul>
      </div>
    );

  return null;
}
