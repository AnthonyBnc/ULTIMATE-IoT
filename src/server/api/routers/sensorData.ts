import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import dayjs from "dayjs";
import { alertMessages } from "@/pages";


export const sensorDataRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ctx}) => {
        const data = await ctx.prisma.sensorData.findMany({
            orderBy: {
                timestamp: 'desc'
            }
        });
        return data.map(item => ({
            ...item,
            alert_message: item.alert_code ? alertMessages[item.alert_code] || item.alert_code : "No alert"
        }));
    }),

    getLiveData: publicProcedure.query(async () => {
        const res = await fetch(`https://55fe-2405-6e00-22ee-fb7-d08-249b-c6fa-67b6.ngrok-free.app/api/latest-data`)
        return (await res.json()) as {
            alert_code: string,
            humidity: number,
            id: number,
            soil_moisture: number,
            temperature: number,
            timestamp: string 
        }
    }),

    countAlert: publicProcedure.query(async ({ ctx }) => {
        const oneHourAgo = dayjs().subtract(1, 'hour').toDate();
      
        const countAlert = await ctx.prisma.sensorData.count({
          where: {
            timestamp: {
              gte: oneHourAgo,
            },
          },
        });
      
        return countAlert;
      }),

      getChangesFromSecondLatest: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.sensorData.findMany({
          orderBy: {
            timestamp: 'desc',
          },
          take: 2,
        });
      
        if (data.length < 2) {
          return {
            temperature: null,
            humidity: null,
            soil_moisture: null,
          };
        }
      
        const latest = data[0]!;
        const secondLatest = data[1]!;
      
        const calculateChange = (current: number | null, previous: number | null): number | null => {
          if (current === null || previous === null) {
            return null;
          }
      
          if (previous === 0) {
            if (current === 0) return 0;
            return current > 0 ? Infinity : -Infinity;
          }
      
          return ((current - previous) / Math.abs(previous)) * 100;
        };
      
        return {
          temperature: calculateChange(latest.temperature, secondLatest.temperature),
          humidity: calculateChange(latest.humidity, secondLatest.humidity),
          soil_moisture: calculateChange(latest.soil_moisture, secondLatest.soil_moisture),
        };
      }),
      
      
      
      
})
