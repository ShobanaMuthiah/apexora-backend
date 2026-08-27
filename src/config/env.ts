import dotenv from "dotenv";
dotenv.config();

const required = (key: string, fallback?: string): string => {
  const v = process.env[key] ?? fallback;
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parseInt(process.env.PORT ?? "5000", 10),
  apiPrefix: process.env.API_PREFIX ?? "/api/v1",
  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/apexora"),
  jwtSecret: required("JWT_SECRET", "dev-secret-change-me"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  bcryptRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10),
  corsOrigin: (process.env.CORS_ORIGIN ?? "http://localhost:5173,http://localhost:8080")
    .split(",")
    .map((s) => s.trim()),
};
