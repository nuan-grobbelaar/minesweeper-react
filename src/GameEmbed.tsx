import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Box from "./Box";

const GameEmbed = () => {
	const iframeRef = useRef(null);
	const [defuseMode, setDefuseMode] = useState(false);
	const [clusterSelected, setClusterSelected] = useState(false);

	// const iframe = document.getElementById("game") as HTMLIFrameElement | null;
	function getGameWindow() {
		return (iframeRef.current as HTMLIFrameElement | null)?.contentWindow as
			| Window & {
					callGodotSetDefuseMode: (enabled: boolean) => void;
					callGodotDefuseSelectedCluster: () => void;
					setClusterSelected: (selected: boolean) => void;
					setClusterDefuseMode: (mode_set: boolean) => void;
			  };
	}

	useEffect(() => {
		const gameWindow = getGameWindow();
		gameWindow.setClusterSelected = setClusterSelected;
		gameWindow.setClusterDefuseMode = setDefuseMode;
	}, []);

	function toggleDefuseMode() {
		const gameWindow = getGameWindow();
		gameWindow?.callGodotSetDefuseMode(!defuseMode);
	}

	function defuseSelectedCluster() {
		const gameWindow = getGameWindow();
		gameWindow?.callGodotDefuseSelectedCluster();
	}

	return (
		<>
			<ProgressBar max="100" value="100" />
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
			<Box>
				<span>Score:</span>
			</Box>
			<div className="action-bar">
				<Button
					className="action-button"
					onClick={() => toggleDefuseMode()}
					color="#f5f5f5"
					selected={defuseMode}
				>
					Defuse Mode
				</Button>
				<Button
					className="action-button"
					onClick={() => defuseSelectedCluster()}
					color="#f5f5f5"
					selected={!clusterSelected}
				>
					Confirm
				</Button>
			</div>
		</>
	);
};

export default GameEmbed;
