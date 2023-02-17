import React from "react";
import * as ReactDOMClient from "react-dom/client";
import SnakeGame from "./components/SnakeGame"

alert("nice");

const container = document.querySelector('#app');

const root = ReactDOMClient.createRoot(container)

root.render(<SnakeGame />)
