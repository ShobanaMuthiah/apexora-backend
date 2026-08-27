import mongoose from "mongoose";
import { connectDb } from "../config/db";
import { User } from "../models/User";
import { Trip } from "../models/Trip";
import { Booking } from "../models/Booking";

async function run() {
  await connectDb();
  console.log("[seed] clearing collections…");
  await Promise.all([User.deleteMany({}), Trip.deleteMany({}), Booking.deleteMany({})]);

  const passwordHash = await User.hashPassword("password");

  console.log("[seed] users…");
  const [superadmin, admin, user] = await User.create([
    { name: "Super Admin", email: "super@apexora.io", role: "superadmin", passwordHash },
    { name: "Aurora Admin", email: "admin@apexora.io", role: "admin", passwordHash, company: "Aurora Travels" },
    { name: "Nova User", email: "user@apexora.io", role: "user", passwordHash },
  ]);

  console.log("[seed] trips…");
  const trips = await Trip.create([
    {
      title: "Santorini Sunset Escape",
      destination: "Santorini",
      country: "Greece",
      category: "beach",
      price: 1899,
      currency: "USD",
      durationDays: 6,
      rating: 4.9,
      reviews: 214,
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200",
      gallery: [],
      description: "Cliffside villas, caldera sunsets, and volcanic beaches.",
      highlights: ["Oia sunset cruise", "Wine tasting", "Private catamaran"],
      includes: ["Flights", "Boutique hotel", "Daily breakfast"],
      itinerary: [
        { day: 1, title: "Arrival", details: "Transfer to Oia, welcome dinner." },
        { day: 2, title: "Caldera cruise", details: "Sunset catamaran + BBQ." },
      ],
      maxTravellers: 8,
      ownerId: admin._id,
      featured: true,
    },
    {
      title: "Kyoto Cultural Immersion",
      destination: "Kyoto",
      country: "Japan",
      category: "cultural",
      price: 2450,
      currency: "USD",
      durationDays: 8,
      rating: 4.8,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
      gallery: [],
      description: "Temples, tea ceremonies, and bamboo forests.",
      highlights: ["Fushimi Inari at dawn", "Tea ceremony", "Arashiyama bamboo"],
      includes: ["Ryokan stay", "Rail pass", "Guided tours"],
      itinerary: [{ day: 1, title: "Arrival in Kyoto", details: "Ryokan check-in + kaiseki dinner." }],
      maxTravellers: 10,
      ownerId: admin._id,
      featured: true,
    },
  ]);

  console.log("[seed] bookings…");
  await Booking.create({
    userId: user._id,
    tripId: trips[0]._id,
    tripTitle: trips[0].title,
    tripImage: trips[0].image,
    destination: trips[0].destination,
    travellers: 2,
    startDate: new Date(Date.now() + 30 * 24 * 3600_000),
    endDate: new Date(Date.now() + 36 * 24 * 3600_000),
    totalPrice: trips[0].price * 2,
    status: "confirmed",
  });

  console.log("[seed] done ✔");
  console.log({
    superadmin: superadmin.email,
    admin: admin.email,
    user: user.email,
    password: "password",
  });

  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
