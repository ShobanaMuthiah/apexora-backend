import { z } from "zod";

export const tripCategory = z.enum([
  "beach", "mountain", "city", "adventure", "cultural", "luxury",
]);

export const createTripSchema = z.object({
  title: z.string().min(2),
  destination: z.string().min(2),
  country: z.string().min(2),
  category: tripCategory,
  price: z.number().nonnegative(),
  currency: z.string().default("USD"),
  durationDays: z.number().int().positive(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().int().nonnegative().optional(),
  image: z.string().url().optional(),
  gallery: z.array(z.string().url()).optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  itinerary: z.array(z.object({ day: z.number(), title: z.string(), details: z.string() })).optional(),
  maxTravellers: z.number().int().positive().optional(),
  featured: z.boolean().optional(),
});

export const updateTripSchema = createTripSchema.partial();

export const listTripsQuery = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
});

export const createBookingSchema = z.object({
  tripId: z.string().min(1),
  travellers: z.number().int().positive(),
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.number().nonnegative(),
});

export const createPlanSchema = z.object({
  title: z.string().min(1),
  destination: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.number().nonnegative().optional(),
  travellers: z.number().int().positive().optional(),
  notes: z.string().optional(),
  activities: z
    .array(z.object({ day: z.number(), time: z.string(), label: z.string() }))
    .optional(),
});

export const createAdminSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  password: z.string().min(6).optional(),
});
