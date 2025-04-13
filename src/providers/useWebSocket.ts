import { useEffect, useRef, useState } from "react";

export const useWebSocket = (url: string) => {
  const socket = useRef<WebSocket>(null);
  const [event, setEvent] = useState<boolean>(true);

  useEffect(() => {
    socket.current = new WebSocket(url);
    socket.current.onmessage = function () {
      setEvent((prevEvent) => !prevEvent);
      console.log("Event received");
    };

    return () => {
      console.log("Connection closed");
      socket.current?.close();
    };
  }, []);
  return event;
};
