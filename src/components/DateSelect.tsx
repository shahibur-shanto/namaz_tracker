"use client";
import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDateContext } from "@/app/Context/store";
import { getCurrentDate, formatDate } from "@/app/utility/utility";
import dayjs from "dayjs";

const boxStyle: React.CSSProperties = {
	width: "100%",
};

const paragraphStyle: React.CSSProperties = {
	fontSize: "20px",
	fontWeight: "bold",
};

const justify = "center";

const alignItems = "flex-start";

const DateSelect = () => {
	const { selectedDate, setSelectedDate } = useDateContext();

	useEffect(() => {
		setSelectedDate(getCurrentDate());
	}, [setSelectedDate]);

	const updateDateForward = () => {
		const newDate = dayjs(selectedDate);
		newDate.add(1, "day");
		setSelectedDate(newDate);
	};

	const updateDateBackward = () => {
		const newDate = dayjs(selectedDate);
		newDate.subtract(1, "day");
		setSelectedDate(newDate);
	};

	return (
		<Flex align="start">
			<Flex style={boxStyle} justify={justify} align={alignItems}>
				<div
					style={{
						marginRight: "40px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<p style={paragraphStyle} onClick={updateDateBackward}>
						<FaArrowLeft />
					</p>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "center",
					}}
				>
					<p style={paragraphStyle}>{formatDate(selectedDate)}</p>
				</div>

				<div
					style={{
						marginLeft: "40px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<p style={paragraphStyle} onClick={updateDateForward}>
						<FaArrowRight />
					</p>
				</div>
			</Flex>
		</Flex>
	);
};

export default DateSelect;
