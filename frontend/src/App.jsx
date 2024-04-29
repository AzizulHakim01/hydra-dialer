import './App.css'
import Homepages from './pages/Homepages'
import { useEffect } from "react";
import socket from "./utils/Socketio";

function App() {
  useEffect(() => {
    socket.on('disconnect', () => {
      console.log("socket connection disconnected");
    })
  }, []);

  return (
    <>
      <Homepages/>
    </>
  )
}

export default App
