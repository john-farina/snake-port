import React from "react";
import * as ReactDOMClient from "react-dom/client";
import SnakeGame from "./components/SnakeGame"

const container = document.querySelector('#app');

const root = ReactDOMClient.createRoot(container)

root.render(<SnakeGame scores={window.DATA_FROM_SERVER.highscores} form_authenticity_token={window.DATA_FROM_SERVER.form_authenticity_token} />)
