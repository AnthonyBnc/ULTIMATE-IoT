import { api } from "@/utils/api";



export function RecentSales() {
  const { data, isLoading } = api.sensorData.getAll.useQuery();

  const AlertModule = ({
    messageTitle,
    message,
    timeStamp
  }: {
    messageTitle: string | null;
    message: string;
    timeStamp: Date
  }) => {
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    return (
      <div className="flex items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-destructive"
          >
            <path d="M12 9v2m0 4h.01M10.29 3.86l-8.18 14A1 1 0 0 0 3 19h18a1 1 0 0 0 .87-1.5l-8.18-14a1 1 0 0 0-1.74 0z" />
          </svg>
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{messageTitle}</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <div className="ml-auto font-medium text-sm">{formattedDate}</div>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {data &&
        data.slice(0, 5).map((item) => (
          <AlertModule
            key={item.id} // Ensure a unique key
            messageTitle={item.alert_code}
            message={item.alert_message}
            timeStamp={item.timestamp}
          />
        ))}
    </div>
  );
}
