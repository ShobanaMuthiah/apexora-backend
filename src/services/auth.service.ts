import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { signJwt } from "../utils/jwt";
import type { LoginInput, RegisterInput } from "../validators/auth.validator";

const toAuthUser = (u: any) => ({
  id: u._id.toString(),
  name: u.name,
  email: u.email,
  role: u.role,
  avatar: u.avatar,
  phone: u.phone,
  createdAt: u.createdAt,
});

export const authService = {
  async register(input: RegisterInput) {
    const exists = await User.findOne({ email: input.email.toLowerCase() });
    if (exists) throw ApiError.conflict("Email already in use");

    const passwordHash = await User.hashPassword(input.password);
    const user = await User.create({
      name: input.name,
      email: input.email.toLowerCase(),
      passwordHash,
      role: input.role ?? "user",
    });

    const token = signJwt({ sub: user.id, role: user.role, email: user.email });
    return { user: toAuthUser(user), token };
  },

  async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email.toLowerCase() }).select("+passwordHash");
    if (!user) throw ApiError.unauthorized("Invalid credentials");
    const ok = await User.comparePassword(input.password, user.passwordHash);
    if (!ok) throw ApiError.unauthorized("Invalid credentials");
    const token = signJwt({ sub: user.id, role: user.role, email: user.email });
    return { user: toAuthUser(user), token };
  },

  async me(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw ApiError.notFound("User not found");
    return toAuthUser(user);
  },
};
