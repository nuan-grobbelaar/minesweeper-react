const Box = (props: any) => {
	return <div className={`box ${props.className}`}>{props.children}</div>;
};

export default Box;
