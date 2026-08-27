import { Trip } from "../models/Trip";
import { ApiError } from "../utils/ApiError";
import type { UserRole } from "../types";

export const tripService = {
  async list(params: { search?: string; category?: string }) {
    const q: any = {};
    if (params.category && params.category !== "all") q.category = params.category;
    if (params.search) {
      const rx = new RegExp(params.search, "i");
      q.$or = [{ title: rx }, { destination: rx }, { country: rx }];
    }
    return Trip.find(q).sort({ createdAt: -1 });
  },

  async getById(id: string) {
    const trip = await Trip.findById(id);
    if (!trip) throw ApiError.notFound("Trip not found");
    return trip;
  },

  async create(ownerId: string, payload: any) {
    return Trip.create({ ...payload, ownerId });
  },

  async update(id: string, actor: { id: string; role: UserRole }, payload: any) {
    const trip = await Trip.findById(id);
    if (!trip) throw ApiError.notFound("Trip not found");
    if (actor.role !== "superadmin" && trip.ownerId.toString() !== actor.id) {
      throw ApiError.forbidden("You can only update your own trips");
    }
    Object.assign(trip, payload);
    await trip.save();
    return trip;
  },

  async remove(id: string, actor: { id: string; role: UserRole }) {
    const trip = await Trip.findById(id);
    if (!trip) throw ApiError.notFound("Trip not found");
    if (actor.role !== "superadmin" && trip.ownerId.toString() !== actor.id) {
      throw ApiError.forbidden("You can only delete your own trips");
    }
    await trip.deleteOne();
  },
};
