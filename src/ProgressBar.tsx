const ProgressBar = (props: any) => {
	return (
		<div className={`progress-bar ${props.value == props.max ? "max" : ""}`}>
			<progress max={props.max} value={props.value}></progress>
		</div>
	);
};

export default ProgressBar;
