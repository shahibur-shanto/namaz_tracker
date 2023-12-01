"use client";
import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDateContext } from "@/app/Context/store";


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

	const getCurrentDate = () => {
		const today = new Date();
		return today;
	};

	const formatDate = (date: Date): string => {
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};
	useEffect(() => {
		setSelectedDate(getCurrentDate());
	}, [setSelectedDate]);

	const updateDateForward = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + 1);
		setSelectedDate(newDate);
	};

	const updateDateBackward = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() - 1);
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
