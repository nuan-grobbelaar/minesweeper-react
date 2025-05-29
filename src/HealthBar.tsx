const HealthBar = (props: any) => {
	return (
		<div className={`health-bar ${props.value == props.max ? "max" : ""}`}>
			<progress max={props.max} value={props.value}></progress>
		</div>
	);
};

export default HealthBar;
