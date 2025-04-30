import { createTRPCRouter } from "@/server/api/trpc";
// import { employeeRouter } from "@/server/api/routers/employee";
import { sensorDataRouter } from "@/server/api/routers/sensorData";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // employee: employeeRouter,
  sensorData: sensorDataRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
