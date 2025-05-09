"use client";
import React from "react";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type SensorDataColumn } from "@/lib/validators";
import { columns } from "./columns";

interface SensorDataClientProps {
  data: SensorDataColumn[];
}
export const SensorData = ({ data }: SensorDataClientProps) => {
  

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Sensor Data History"
          description="Manage sensor data"
        />
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};
