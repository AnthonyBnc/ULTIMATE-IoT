import WeatherTable from "@/components/weather/weather_table";

const WeatherTablePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 md:p-8">
            <h1>Weather Table</h1>
            <WeatherTable />
        </div>
      </div>
    </>
  );
};

export default WeatherTablePage;
