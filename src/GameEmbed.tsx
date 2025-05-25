import React from "react";

const GameEmbed = () => {
	return (
		<div style={{ width: "100%", height: "80vh" }}>
			<iframe
				title="Godot Game"
				src="/godot/Minesweeper.html"
				width="100%"
				height="100%"
				allowFullScreen
			/>
		</div>
	);
};

export default GameEmbed;
