"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Checkbox from "antd/es/checkbox";

interface Waqt {
	Fajr: string;
	Sunrise: string;
	Dhuhr: string;
	Asr: string;
	Sunset: string;
	Maghrib: string;
	Isha: string;
	Imsak: string;
	Midnight: string;
	Firstthird: string;
	Lastthird: string;
}
const Today = () => {
	const [data, setData] = useState<Waqt[] | null>(null);
	

	useEffect(() => {
		const fetchData = async () => {
			try {
				const storedData = localStorage.getItem("prayerTime");
				if (storedData) {
					const newData = JSON.parse(storedData);
					setData(newData[1].timings);
				} else {
					console.log("No data found in local storage.");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData(); // Call the function to fetch data when the component mounts or whenever needed
	}, []);

	const Header = ["Waqt", "Time", "Action"];

	const styles: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginTop: "20px",
		marginLeft: "8px",
		marginRight: "8px",
		height: "50px",
	};

	return (
		<div style={{ backgroundColor: "#ebe4e4" }}>
			<Row justify="center" align="middle" gutter={16}>
				{/* Title Card */}
				{Header.map((item, index) => (
					<React.Fragment key={index}>
						<Col
							span={6}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "20px",
								fontWeight: "bold",
								backgroundColor: "#adaaaa",
								height: "60px",
								marginLeft: "8px",
								marginRight: "8px",
								marginTop: "8px",
							}}
						>
							{item}
						</Col>
					</React.Fragment>
				))}

				{/* Content Cards */}
				{data &&
					Object.entries(data).map(([key, value], index) => (
						<React.Fragment key={index}>
							<Col
								span={6}
								style={{
									...styles,
									backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
								}}
							>
								{key}
							</Col>
							<Col
								span={6}
								style={{
									...styles,
									backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
								}}
							>
								{value}
							</Col>
							<Col
								key={index}
								span={6}
								style={{
									...styles,
									backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
								}}
							>
								<Checkbox />
							</Col>
						</React.Fragment>
					))}
			</Row>
		</div>
	);
};

export default Today;
