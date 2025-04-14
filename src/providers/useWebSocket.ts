import { useEffect, useRef, useState } from "react";
import { useAuth } from "./authProvider";

export const useWebSocket = (url: string) => {
  const socket = useRef<WebSocket>(null);
  const [event, setEvent] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (typeof user !== `undefined`) {
      socket.current = new WebSocket(url);
      socket.current.onopen = () => socket.current?.send(user.access_token);
      socket.current.onmessage = function () {
        setEvent((prevEvent) => !prevEvent);
        console.log("Event received");
      };

      return () => {
        console.log("Connection closed");
        socket.current?.close();
      };
    }
  }, [url, user]);
  return event;
};
