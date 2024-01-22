import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { ConnectionManager } from "./components/ComponentManager";
import { AddUser } from "./components/AddUser";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [waitingRoom, setWaitingRoom] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnect wtf");
      setIsConnected(false);
    }

    function updateWaitingRoom(value) {
      console.log("updateWaitingRoom", value);
      setWaitingRoom(value);
    }

    socket.on("oui", (value) => {
      console.log("oui", value);
    });

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("updateWaitingRoom", updateWaitingRoom);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("updateWaitingRoom", updateWaitingRoom);
      socket.off("oui");
    };
  }, []);

  // useEffect(() => {
  //   function onFooEvent(value) {
  //     setWaitingRoom(fooEvents.concat(value));
  //   }

  //   socket.on("foo", onFooEvent);

  //   return () => {
  //     socket.off("foo", onFooEvent);
  //   };
  // }, [waitingRoom]);

  return (
    <div>
      <h1>Waiting Room</h1>
      {isConnected && <p>coucou</p>}
      <ul>
        {waitingRoom.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <ConnectionManager />
      <AddUser />
    </div>
  );
}

export default App;
