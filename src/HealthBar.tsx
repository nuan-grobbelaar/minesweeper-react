const HealthBar = (props: any) => {
	return (
		<div
			className={`health-bar ${
				props.value == props.max || props.value <= 0 ? "end" : ""
			}`}
		>
			<progress max={props.max} value={props.value}></progress>
		</div>
	);
};

export default HealthBar;
