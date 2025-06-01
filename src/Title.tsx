const Title = (props: any) => {
	return (
		<div className={`title ${props.active ? "active" : ""}`}>
			<h1>EXPLODYSSEY</h1>
		</div>
	);
};

export default Title;
