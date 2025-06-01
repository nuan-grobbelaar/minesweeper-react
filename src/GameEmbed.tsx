import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Box from "./Box";
import HealthBar from "./HealthBar";
import Title from "./Title";

interface GameState {
	defuse_mode: boolean;
	cluster_selected: boolean;
	health: number;
	max_health: number;
	score: number;
	remaing_flags: number;
}

const GameEmbed = () => {
	const iframeRef = useRef(null);
	const [gameState, setGameState] = useState<GameState>();
	const [confirmPressed, setConfirmPressed] = useState(false);

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
			const state: GameState = JSON.parse(data);
			setGameState(state);
		} catch (e) {
			console.error("Failed to parse data from Godot", e);
		}
	}

	function toggleDefuseMode() {
		const gameWindow = getGameWindow();
		gameWindow?.callGodotSetDefuseMode(!gameState?.defuse_mode);
	}

	function defuseSelectedCluster() {
		setConfirmPressed(true);
		setTimeout(() => {
			setConfirmPressed(false);
		}, 1000);
		const gameWindow = getGameWindow();
		gameWindow?.callGodotDefuseSelectedCluster();
	}

	return (
		<div className="grid">
			<Title active={!!gameState} />
			<HealthBar
				max={gameState ? gameState.max_health : 10}
				value={gameState ? gameState.health : 10}
			/>
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
					color="#fff"
					selectedColor="#ff5050"
					selectedGlowColor="#ff9090cc"
					selected={gameState?.defuse_mode}
					disabled={!gameState}
				>
					Defuse Mode
				</Button>
				<Button
					className="action-button"
					onClick={() => defuseSelectedCluster()}
					color="#fff"
					selectedColor="#ff5050"
					selectedGlowColor="#ff9090cc"
					selected={confirmPressed}
					disabled={!gameState?.cluster_selected}
				>
					Confirm
				</Button>
			</div>
			<div className="right-info">
				<Box className="score">
					<div>
						<span>Score:</span>
						<span>{gameState ? gameState.score : 0}</span>
					</div>
					<div>
						<span>Flags:</span>
						<span>{gameState ? gameState.remaing_flags : 0}</span>
					</div>
				</Box>
			</div>
		</div>
	);
};

export default GameEmbed;
