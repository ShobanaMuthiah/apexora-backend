import { Schema, model, type InferSchemaType } from "mongoose";

const activity = new Schema(
  { day: Number, time: String, label: String },
  { _id: false },
);

const planSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    destination: String,
    startDate: Date,
    endDate: Date,
    budget: { type: Number, default: 0 },
    travellers: { type: Number, default: 1 },
    notes: String,
    activities: [activity],
  },
  { timestamps: true, versionKey: false },
);

planSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export type PlanDoc = InferSchemaType<typeof planSchema> & { id: string };
export const Plan = model<PlanDoc>("Plan", planSchema);
