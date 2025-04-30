import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const alertMessages: Record<string, string> = {
  "E001": "DHT11 sensor error",
  "E002": "Soil moisture sensor error",
  "E003": "Both sensors failed",
  "S001": "Soil moist enough - No watering needed",
  "A001": "Mildly dry soil - Short watering",
  "A002": "Dry soil - Medium watering",
  "A003": "Very dry soil - Long watering + alert",
  "A004": "Extreme heat and dryness - Extra watering"
};

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
    })
})
