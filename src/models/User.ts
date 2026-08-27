import { Schema, model, type InferSchemaType, type Model } from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "../config/env";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
      required: true,
    },
    avatar: String,
    phone: String,
    company: String,
  },
  { timestamps: true, versionKey: false },
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.passwordHash;
    return ret;
  },
});

export type UserDoc = InferSchemaType<typeof userSchema> & { id: string };

interface UserModel extends Model<UserDoc> {
  hashPassword(pw: string): Promise<string>;
  comparePassword(pw: string, hash: string): Promise<boolean>;
}

userSchema.statics.hashPassword = (pw: string) => bcrypt.hash(pw, env.bcryptRounds);
userSchema.statics.comparePassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);

export const User = model<UserDoc, UserModel>("User", userSchema);
