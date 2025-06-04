"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { type SensorDataColumn } from "@/lib/validators";


export const columns: ColumnDef<SensorDataColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "timestamp",
    header: "Time Stamp",
    cell: ({ row }) => {
      const date = new Date(row.original.timestamp);
      const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "temperature",
    header: "Temperature",
    cell: ({ row }) => (
      <div>
        {row.original.temperature ? row.original.temperature : "Null "}°C
      </div>
    ),
  },
  {
    accessorKey: "soil_moisture",
    header: "Soil Moisture",
    cell: ({ row }) => {
      const value = row.original.soil_moisture;
      return (
        <div>
          {value !== null && value !== undefined ? `${value}%` : "Null %"}
        </div>
      );
    },
  },
  {
    accessorKey: "humidity",
    header: "Humidity",
    cell: ({ row }) => (
      <div>{row.original.humidity ? row.original.humidity : "Null "}%</div>
    ),
  },
  {
    accessorKey: "light_level",
    header: "Light Level",
    cell: ({ row }) => <div>{row.original.light_level ? row.original.light_level : "Null "}</div>,
  },
  {
    accessorKey: "alert_code",
    header: "Alert Code",
    cell: ({ row }) => <div>{row.original.alert_code ? row.original.alert_code : "Null "}</div>,
  },
  {
    accessorKey: "alert_message",
    header: "Alert Message",
    cell: ({ row }) => <div>{row.original.alert_message}</div>,
  },
  
];
