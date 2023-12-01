import React from "react";
import { Col, Row } from "antd";

const FooterPage: React.FC = () => {
	return (
		<>
			<Row>
				<Col
					span={24}
					style={{
						height: "40px",
						backgroundColor: "lightgray",
						display: "flex",
						alignItems: "center", // Vertical centering
						justifyContent: "center", // Horizontal centering
					}}
				>
					<p>Please perform your Prayer Every Day</p>
				</Col>
			</Row>
		</>
	);
};

export default FooterPage;
