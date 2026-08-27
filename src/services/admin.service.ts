import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";

export const adminService = {
  async listUsers() {
    return User.find({ role: "user" }).sort({ createdAt: -1 });
  },
  async listAdmins() {
    return User.find({ role: "admin" }).sort({ createdAt: -1 });
  },
  async createAdmin(payload: { name: string; email: string; company?: string; password?: string }) {
    const exists = await User.findOne({ email: payload.email.toLowerCase() });
    if (exists) throw ApiError.conflict("Email already in use");
    const passwordHash = await User.hashPassword(payload.password ?? "password");
    return User.create({
      name: payload.name,
      email: payload.email.toLowerCase(),
      company: payload.company,
      passwordHash,
      role: "admin",
    });
  },
};
