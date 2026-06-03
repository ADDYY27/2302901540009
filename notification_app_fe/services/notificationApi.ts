import { Notification } from "../types/notification";

export async function getNotifications() {
  const response = await fetch("/api/notifications");

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  return data.notifications as Notification[];
}