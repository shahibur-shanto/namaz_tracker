"use client";
import React, { useState } from "react";
import { Button, Flex, Segmented } from "antd";
import type { FlexProps } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const boxStyle: React.CSSProperties = {
	width: "100%",
};

const justify = "center";

const alignItems = "flex-start";

const DateSelect = () => {
	const date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let currentDate = `${day}-${month}-${year}`;

	const [today,setToday] = useState(currentDate)

	const dateChanger = (token: string) => {
		if (token === "forward") {
			date.setDate(date.getDate() + 1);
			let day = date.getDate();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();
			let currentDate = `${day}-${month}-${year}`;
			setToday(currentDate)
			return;
		} else if (token === "backward") {
			date.setDate(date.getDate() - 1);
			let day = date.getDate();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();
			let currentDate = `${day}-${month}-${year}`;
			setToday(currentDate)
			return;
		}
	};
	return (
		<Flex align="start">
			<Flex style={boxStyle} justify={justify} align={alignItems}>
				<div
					style={{
						marginRight: "20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<p onClick={() => dateChanger("backward")}>
						<FaArrowLeft />
					</p>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<p>Today: {today}</p>
				</div>

				<div
					style={{
						marginLeft: "20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<p onClick={() => dateChanger("forward")}>
						<FaArrowRight />
					</p>
				</div>
			</Flex>
		</Flex>
	);
};

export default DateSelect;
