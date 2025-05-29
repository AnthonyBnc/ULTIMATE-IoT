/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { fetchWeatherApi } from 'openmeteo';

export const weatherRouter = createTRPCRouter({
	getWeatherData: publicProcedure.query(async () => {
		try {
			const params = {
				"latitude": 52.52,
				"longitude": 13.41,
				"hourly": ["temperature_2m", "precipitation_probability", "weathercode", "wind_speed_10m", "wind_direction_10m"]
			};
			const url = "https://api.open-meteo.com/v1/forecast";
			const responses = await fetchWeatherApi(url, params);
			const response = responses[0];

			const hourly = response?.hourly()!;
			
			const weatherData = {
				hourly: {
					time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
						(_, i) => new Date((Number(hourly.time()) + i * hourly.interval()) * 1000)
					),
					temperature2m: hourly.variables(0)!.valuesArray()!,
					precipitationProbability: hourly.variables(1)!.valuesArray()!,
					weathercode: hourly.variables(2)!.valuesArray()!,
					windSpeed10m: hourly.variables(3)!.valuesArray()!,
					windDirection10m: hourly.variables(4)!.valuesArray()!,
				},
				timezone: response?.timezone(),
				latitude: response?.latitude(),
				longitude: response?.longitude(),
			};

			return weatherData;
		} catch (error) {
			console.error("Error fetching weather data:", error);
			throw error;
		}
	}),
});