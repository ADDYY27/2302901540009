import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authResponse = await fetch(
      "http://4.224.186.213/evaluation-service/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: process.env.NEXT_PUBLIC_EMAIL,
          name: process.env.NEXT_PUBLIC_NAME,
          rollNo: process.env.NEXT_PUBLIC_ROLL_NO,
          accessCode: process.env.NEXT_PUBLIC_ACCESS_CODE,
          clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
          clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        }),
      }
    );

    const authData = await authResponse.json();

    const token = authData.access_token;

    const notificationResponse = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const notifications =
      await notificationResponse.json();

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch notifications",
      },
      { status: 500 }
    );
  }
}