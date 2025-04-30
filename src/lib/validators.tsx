import { z } from "zod";

// Example
export const employeeFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string().min(1),
});

export type EmployeeFromValues = z.infer<typeof employeeFormSchema>;

export const sensorDataColumn =  z.object({
  timestamp: z.date(),
  temperature: z.number().nullable(),
  humidity: z.number().nullable(),
  soil_moisture: z.number().nullable(),
  alert_code: z.string().nullable(),
  alert_message: z.string()
})

export type SensorDataColumn = z.infer<typeof sensorDataColumn>;

export const updateEmployeeFormSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
});
