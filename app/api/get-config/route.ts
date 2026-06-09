import { readFileSync } from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "client.json");
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  return Response.json(data);
}
