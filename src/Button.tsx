const Button = (props: any) => {
	console.log(props.selected);
	return (
		<div
			id={props.id}
			className={`brutalButton ${props.className} ${
				props.selected ? "selected" : ""
			}`}
		>
			<div className="brutalButton__container">
				{!props.selected && <div className="brutalButton__shadow" />}
				<button
					className={props.className + " brutalButton__container__button"}
					style={
						!props.disabled
							? { backgroundColor: props.color }
							: { backgroundColor: "#bbb" }
					}
					onClick={props.onClick}
					disabled={props.disabled}
				>
					<div className={"brutalButton__container__button__text"}>
						{props.children}
					</div>
				</button>
			</div>
		</div>
	);
};

export default Button;
