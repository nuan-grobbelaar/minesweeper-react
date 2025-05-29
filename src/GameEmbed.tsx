import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Box from "./Box";
import HealthBar from "./HealthBar";

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
					updateGameState: (data: any) => void;
					// setClusterDefuseMode: (mode_set: boolean) => void;
			  };
	}

	useEffect(() => {
		const gameWindow = getGameWindow();
		gameWindow.updateGameState = updateGameState;
		// gameWindow.setClusterDefuseMode = setDefuseMode;
	}, []);

	function updateGameState(data: any) {
		try {
			const parsed = JSON.parse(data);
			setDefuseMode(parsed.defuse_mode);
			setClusterSelected(parsed.cluster_selected);
		} catch (e) {
			console.error("Failed to parse data from Godot", e);
		}
	}

	function toggleDefuseMode() {
		const gameWindow = getGameWindow();
		gameWindow?.callGodotSetDefuseMode(!defuseMode);
	}

	function defuseSelectedCluster() {
		const gameWindow = getGameWindow();
		gameWindow?.callGodotDefuseSelectedCluster();
	}

	return (
		<div className="grid">
			<HealthBar max="100" value="83" />
			<div className="game-window">
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
			<div className="right-info">
				<Box className="score">
					<div>
						<span>Score:</span>
						<span>328</span>
					</div>
					<div>
						<span>Flags:</span>
						<span>40</span>
					</div>
				</Box>
			</div>
		</div>
	);
};

export default GameEmbed;
