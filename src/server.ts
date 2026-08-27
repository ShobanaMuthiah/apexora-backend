import { createApp } from "./app";
import { connectDb } from "./config/db";
import { env } from "./config/env";

async function main() {
  await connectDb();
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`[apexora] api ready → http://localhost:${env.port}${env.apiPrefix}`);
  });
}

main().catch((err) => {
  console.error("[apexora] fatal:", err);
  process.exit(1);
});
