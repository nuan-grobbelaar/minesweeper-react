import { useRef, useState } from "react";
import Button from "./Button";

const GameEmbed = () => {
	const iframeRef = useRef(null);
	const [defuseMode, setDefuseMode] = useState(false);

	function toggleDefuseMode() {
		setDefuseMode(!defuseMode);
		const iframe = document.getElementById("game") as HTMLIFrameElement | null;
		const gameWindow = iframe?.contentWindow as
			| (Window & {
					callGodotToggleDefuseMode: (enabled: boolean) => void;
			  })
			| null;
		gameWindow?.callGodotToggleDefuseMode(true);
	}

	return (
		<>
			<div className="game-container">
				<iframe
					id="game"
					ref={iframeRef}
					title="Godot Game"
					src="/godot/Minesweeper.html"
					width="100%"
					height="100%"
					allowFullScreen
				/>
			</div>
			<div className="action-bar">
				<Button
					className="action-button"
					onClick={() => toggleDefuseMode()}
					color="#ffffff"
					selected={defuseMode}
				>
					Click
				</Button>
			</div>
		</>
	);
};

export default GameEmbed;
