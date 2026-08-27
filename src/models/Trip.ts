import { Schema, model, type InferSchemaType } from "mongoose";

const itineraryItem = new Schema(
  { day: Number, title: String, details: String },
  { _id: false },
);

const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    destination: { type: String, required: true },
    country: { type: String, required: true },
    category: {
      type: String,
      enum: ["beach", "mountain", "city", "adventure", "cultural", "luxury"],
      required: true,
    },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    durationDays: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    image: String,
    gallery: [String],
    description: String,
    highlights: [String],
    includes: [String],
    itinerary: [itineraryItem],
    maxTravellers: { type: Number, default: 10 },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

tripSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export type TripDoc = InferSchemaType<typeof tripSchema> & { id: string };
export const Trip = model<TripDoc>("Trip", tripSchema);
