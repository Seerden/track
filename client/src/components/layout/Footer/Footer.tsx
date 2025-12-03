const size = "80px";

/** @todo functionality */
export default function Footer() {
	return (
		<footer
			style={{
				width: "100%",
				height: size,
				backgroundColor: "var(--bg-3-1)",
				clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
				position: "relative",
			}}
		>
			<div
				style={{
					width: "100%",
					height: `calc(100vh + ${size})`,
					bottom: 0,
					position: "fixed",
					left: 0,
					display: "flex",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "flex-end",
						position: "sticky",
						padding: "0.5rem",
					}}
				>
					<p style={{ margin: 0, alignSelf: "flex-end" }}>
						© {new Date().getFullYear()} Track. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
