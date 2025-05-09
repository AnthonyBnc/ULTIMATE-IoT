import { createTRPCRouter } from "@/server/api/trpc";

import { sensorDataRouter } from "@/server/api/routers/sensorData";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  
  sensorData: sensorDataRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
