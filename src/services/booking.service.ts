import { Booking } from "../models/Booking";
import { Trip } from "../models/Trip";
import { ApiError } from "../utils/ApiError";

export const bookingService = {
  async listByUser(userId: string) {
    return Booking.find({ userId }).sort({ createdAt: -1 });
  },
  async listAll() {
    return Booking.find().sort({ createdAt: -1 });
  },
  async create(userId: string, payload: any) {
    const trip = await Trip.findById(payload.tripId);
    if (!trip) throw ApiError.notFound("Trip not found");
    return Booking.create({
      userId,
      tripId: trip._id,
      tripTitle: trip.title,
      tripImage: trip.image,
      destination: trip.destination,
      travellers: payload.travellers,
      startDate: payload.startDate,
      endDate: payload.endDate,
      totalPrice: payload.totalPrice,
      status: "confirmed",
    });
  },
  async cancel(id: string, actor: { id: string; role: string }) {
    const b = await Booking.findById(id);
    if (!b) throw ApiError.notFound("Booking not found");
    if (actor.role === "user" && b.userId.toString() !== actor.id) {
      throw ApiError.forbidden();
    }
    b.status = "cancelled";
    await b.save();
    return b;
  },
};
