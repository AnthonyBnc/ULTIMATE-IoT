import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Button } from "../ui/button";

type SensorData = {
  temperature: number;
  humidity: number;
  soil_moisture: number;
};

type SendWeatherConditionProps = {
  sensorData: SensorData | null;
};

export const SendWeatherCondition = ({
  sensorData,
}: SendWeatherConditionProps) => {
  const [fanState, setFanState] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { data: weatherData } = api.weather.getWeatherData.useQuery();

  const fanCommand = {
    command: "FAN_ON",
  };

  const fanOffCommand = {
    command: "FAN_OFF",
  };

  // Send command to Arduino
  const sendCommand = async (command: boolean) => {
    try {
      const res = await fetch(
        `https://3099-2405-6e00-28ec-20d5-1156-2234-ae90-cfad.ngrok-free.app/api/control/fan/${
          command ? "on" : "off"
        }`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "content-type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      /* eslint-disable */
      const resJ = await res.json();
      console.log("response ", resJ, fanState);

      if (resJ.status === "success") {
        setFanState(command);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Check conditions and control fan
  useEffect(() => {
    const checkConditionsAndControl = async () => {
      if (!weatherData) return;

      // Get weather API data
      const weatherTemp = Number(weatherData.hourly.temperature2m[0]);
      const windSpeed = Number(weatherData.hourly.windSpeed10m?.[0] ?? 0);

      // Define thresholds
      const HIGH_TEMP_THRESHOLD = 25; // °C
      const HIGH_HUMIDITY_THRESHOLD = 70; // %
      const LOW_WIND_THRESHOLD = 10; // km/h

      // If sensor data is available, use both sensor and weather data
      // If not, use only weather data
      let shouldFanBeOn;

      if (sensorData) {
        shouldFanBeOn =
          (weatherTemp > HIGH_TEMP_THRESHOLD ||
            sensorData.temperature > HIGH_TEMP_THRESHOLD) &&
          sensorData.humidity > HIGH_HUMIDITY_THRESHOLD &&
          windSpeed < LOW_WIND_THRESHOLD;
      } else {
        // Fallback to weather API only
        shouldFanBeOn =
          weatherTemp > HIGH_TEMP_THRESHOLD && windSpeed < LOW_WIND_THRESHOLD;
      }

      // Set warning state based on conditions
      setShowWarning(shouldFanBeOn !== fanState);

      // Only send command if state needs to change
      if (shouldFanBeOn !== fanState) {
        await sendCommand(shouldFanBeOn);
      }
    };

    // Check conditions immediately
    checkConditionsAndControl();

    // Set up interval to check conditions periodically
    const interval = setInterval(checkConditionsAndControl, 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, [weatherData, sensorData, fanState]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div
          className={`h-3 w-3 rounded-full ${
            fanState ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <div>
          <div className="font-medium">
            Fan Status: {fanState ? "Active" : "Inactive"}
          </div>
          <div className="text-sm text-muted-foreground">
            {fanState
              ? sensorData
                ? "Fan is running (High temperature/humidity, Low wind)"
                : "Fan is running (High temperature, Low wind - Weather API only)"
              : "Fan is off (Normal conditions)"}
          </div>
        </div>
      </div>

      {showWarning && (
        <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800">
          <p className="font-medium">Weather Condition Warning</p>
          <p className="text-sm">
            {fanState
              ? "Current conditions are normal. Consider turning off the fan to save energy."
              : "Current conditions suggest the fan should be turned on for better ventilation."}
          </p>
        </div>
      )}

      <div className="flex flex-row items-center gap-3">
        <Button
          onClick={() => sendCommand(true)}
          variant={fanState ? "secondary" : "default"}
        >
          Turn Fan On
        </Button>
        <Button
          onClick={() => sendCommand(false)}
          variant={!fanState ? "secondary" : "default"}
        >
          Turn Fan Off
        </Button>
      </div>
    </div>
  );
};
