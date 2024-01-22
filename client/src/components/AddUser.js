import React from "react";
import { socket } from "../socket";
import { useState } from "react";

export function AddUser() {
  const [username, setUsername] = useState("");

  function adddUser() {
    socket.emit("create-user", username, () => {
      console.log("wow");
    });
  }

  return (
    <>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={adddUser}>Connect</button>
    </>
  );
}
