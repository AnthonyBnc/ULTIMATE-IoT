import React from "react";
import { api } from "@/utils/api";
import { Loading } from "@/components/common/loading";
import { SensorData } from "@/components/page-component/example/sensor_data/client";


const Employees = () => {
  
  const { data, isLoading, isError, error } = api.sensorData.getAll.useQuery();
  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;
  

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 md:p-8">
        <SensorData data={data} />
      </div>
    </div>
  );
};

export default Employees;
