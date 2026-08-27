import { Plan } from "../models/Plan";

export const planService = {
  async listByUser(userId: string) {
    return Plan.find({ userId }).sort({ createdAt: -1 });
  },
  async create(userId: string, payload: any) {
    return Plan.create({ ...payload, userId });
  },
};
