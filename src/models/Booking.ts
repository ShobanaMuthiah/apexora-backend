import { Schema, model, type InferSchemaType } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    tripTitle: String,
    tripImage: String,
    destination: String,
    travellers: { type: Number, default: 1 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled", "completed"],
      default: "confirmed",
    },
  },
  { timestamps: true, versionKey: false },
);

bookingSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export type BookingDoc = InferSchemaType<typeof bookingSchema> & { id: string };
export const Booking = model<BookingDoc>("Booking", bookingSchema);
