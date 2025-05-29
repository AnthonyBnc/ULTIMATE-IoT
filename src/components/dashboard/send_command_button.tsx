import { Button } from "../ui/button";
import { useState } from "react";

export const SendCommandButton = () => {
  const [display, setDisplay] = useState(false);

  const sendCommand = async (command: boolean) => {
    try {
      const res = await fetch(`https://3099-2405-6e00-28ec-20d5-1156-2234-ae90-cfad.ngrok-free.app/api/control/pump/${command ? "on" : "off"}`, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      });
      /* eslint-disable */
      const resJ = await res.json();

      console.log("response ", resJ, display);

      if (resJ.status === "success") {
        setDisplay(command);
      }
    } catch (e) {
      console.log(e);
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
/* eslint-enable */
