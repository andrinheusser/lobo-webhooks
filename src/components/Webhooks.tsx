import useSWR from "swr";
import api from "../api/api";
import Webhook from "./Webhook";

export default function Webhooks() {
  const { data } = useSWR(`webhooks`, () => api.webhooks.get());

  if (data?.meta?.count === 0) return <div>No Webhooks</div>;

  if (data?.data)
    return (
      <div>
        <h1>Active Webhooks</h1>
        <ul class="divide-y">
          {data.data.map((webhook, i) => (
            <Webhook key={`webhook-${i}`} webhook={webhook} />
          ))}
        </ul>
      </div>
    );

  return null;
}
