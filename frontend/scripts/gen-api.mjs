import { execSync } from "child_process";

const apiUrl = process.env.VITE_API_URL ?? "http://localhost:3006";

execSync(`npx openapi-typescript ${apiUrl}/api-json -o src/types/api.d.ts`, {
  stdio: "inherit",
});
