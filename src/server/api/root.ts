import { createTRPCRouter } from "@/server/api/trpc";

import { sensorDataRouter } from "@/server/api/routers/sensorData";
import { weatherRouter } from "@/server/api/routers/weather";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  weather: weatherRouter,
  sensorData: sensorDataRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
