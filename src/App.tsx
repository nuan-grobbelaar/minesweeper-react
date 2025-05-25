import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GameEmbed from "./GameEmbed";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<GameEmbed />
		</>
	);
}

export default App;
