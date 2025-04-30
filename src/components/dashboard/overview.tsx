"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useMemo } from "react";


type SensorData = {
    alert_message: string;
    id: number;
    temperature: number | null;
    humidity: number | null;
    soil_moisture: number | null;
    timestamp: Date;
    alert_code: string | null;
  };
  
  type OverviewProps = {
    data: SensorData[] | undefined;
  };
  
export function Overview({ data }: OverviewProps) {
    const groupedData = useMemo(() => {
      if (!data || !Array.isArray(data)) return [];
  
      const daily: Record<
        string,
        { date: string; temperature: number; humidity: number; soil_moisture: number; count: number }
      > = {};
  
      data.forEach((entry) => {
        const dateKey = dayjs(entry.timestamp).format("YYYY-MM-DD");
  
        if (!daily[dateKey]) {
          daily[dateKey] = {
            date: dateKey,
            temperature: 0,
            humidity: 0,
            soil_moisture: 0,
            count: 0,
          };
        }
  
        if (entry.temperature !== null) daily[dateKey].temperature += entry.temperature;
        if (entry.humidity !== null) daily[dateKey].humidity += entry.humidity;
        if (entry.soil_moisture !== null) daily[dateKey].soil_moisture += entry.soil_moisture;
  
        daily[dateKey].count += 1;
      });
  
      return Object.values(daily)
        .map((day) => ({
          date: day.date,
          temperature: parseFloat((day.temperature / day.count).toFixed(1)),
          humidity: parseFloat((day.humidity / day.count).toFixed(1)),
          soil_moisture: parseFloat((day.soil_moisture / day.count).toFixed(1)),
        }))
        .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
        .slice(-30);
    }, [data]);
  
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={groupedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="temperature" stackId="a" fill="#8884d8" />
          <Bar dataKey="humidity" stackId="a" fill="#82ca9d" />
          <Bar dataKey="soil_moisture" stackId="a" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  