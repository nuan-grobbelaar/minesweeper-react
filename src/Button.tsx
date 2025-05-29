const Button = (props: any) => {
	return (
		<div
			id={props.id}
			className={`brutalButton ${props.className} ${
				props.selected && !props.disabled ? "selected" : ""
			} ${props.disabled ? "disabled" : ""} ${props.className}`}
			style={
				props.selected && props.selectedGlowColor
					? { boxShadow: "0 0 15px #ff9090cc" }
					: {}
			}
		>
			<div className="brutalButton__container">
				{!props.selected && !props.disabled && (
					<div className="brutalButton__shadow" />
				)}
				<button
					className={"brutalButton__container__button"}
					style={
						props.selected && props.selectedColor
							? { backgroundColor: props.selectedColor }
							: { backgroundColor: props.color }
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
