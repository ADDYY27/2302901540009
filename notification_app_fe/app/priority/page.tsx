"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "../../services/notificationApi";

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getNotifications();

        const weights = {
          Placement: 100,
          Result: 60,
          Event: 30,
        };

        const sorted = data
          .map((item: any) => {
            const ageHours =
              (Date.now() -
                new Date(item.Timestamp).getTime()) /
              (1000 * 60 * 60);

            const recencyScore = Math.max(
              0,
              50 - ageHours
            );

            return {
              ...item,
              priority:
                (weights[
                  item.Type as keyof typeof weights
                ] || 0) + recencyScore,
            };
          })
          .sort(
            (a: any, b: any) =>
              b.priority - a.priority
          )
          .slice(0, 10);

        setNotifications(sorted);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Top 10 Priority Notifications</h1>

      {notifications.map((item: any) => (
        <div
          key={item.ID}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "12px",
            background: "white",
            borderRadius: "6px",
          }}
        >
          <h3>{item.Type}</h3>

          <p>{item.Message}</p>

          <p>
            <strong>
              Priority Score:
            </strong>{" "}
            {item.priority.toFixed(2)}
          </p>

          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}