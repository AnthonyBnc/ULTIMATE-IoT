import { Button } from "../ui/button";
import { useState } from "react";

export const SendCommandButton = () => {
  const [display, setDisplay] = useState(false);
  const onCommand = {
    command: "PUMP_ON",
  };
  const offCommand = {
    command: "PUMP_OFF",
  };

  const sendCommand = async (command: boolean) => {
    const res = await fetch(
      `https://55fe-2405-6e00-22ee-fb7-d08-249b-c6fa-67b6.ngrok-free.app/api/control-pump`,
      {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "content-type": "application/json",
        },
        body: JSON.stringify(command ? onCommand : offCommand),
      }
    );
    const resJ = await res.json();

    console.log("response ", resJ, display);

    if (resJ.arduino_response === "PUMP_ON") {
      setDisplay(true);
    }
    if (resJ.arduino_response === "PUMP_OFF") {
      setDisplay(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-row items-center justify-center gap-3">
        <Button onClick={() => sendCommand(true)}>Turn on</Button>
        <Button onClick={() => sendCommand(false)}>Turn off</Button>
      </div>

      <div className="text-xs text-muted-foreground">
        Pump state {display ? `on` : `off`}
      </div>
    </div>
  );
};
