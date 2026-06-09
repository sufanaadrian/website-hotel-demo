import { writeFileSync } from "fs";
import path from "path";

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return Response.json({ error: "Only available in development" }, { status: 403 });
  }

  const data = await req.json();

  // Remove empty-string booking/social fields so components skip them cleanly
  if (data.bookingComUrl === "") delete data.bookingComUrl;
  if (data.airbnbUrl === "") delete data.airbnbUrl;
  if (data.web3formsKey === "") delete data.web3formsKey;
  if (data.socialLinks?.instagram === "") delete data.socialLinks.instagram;
  if (data.socialLinks?.tiktok === "") delete data.socialLinks.tiktok;

  const filePath = path.join(process.cwd(), "data", "client.json");
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  return Response.json({ ok: true });
}
