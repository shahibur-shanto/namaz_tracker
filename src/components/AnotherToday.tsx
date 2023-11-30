"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Checkbox from "antd/es/checkbox";
import { useDateContext } from "@/app/Context/store";

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
	isComplete?: boolean;
	time?: string;
	key?: string;
	[key: string]: any;
}

const AnotherToday = () => {
	const [data, setData] = useState<Record<string, { time: string; isComplete: boolean; isLateComplete: boolean }> | null>(null);
	const { selectedDate } = useDateContext();
	const [dateString, setDateString] = useState<string>("");

	useEffect(() => {
		const currentDayOfMonth = selectedDate.getDate();
		const currentMonth = selectedDate.getMonth() + 1;
		const currentYear = selectedDate.getFullYear();
		const dateString = `${currentDayOfMonth}-${currentMonth}-${currentYear}`;
		setDateString(dateString);
		const fetchData = async () => {
			try {
				const getUserData = localStorage.getItem("userData");
				if (getUserData) {
					const userData = JSON.parse(getUserData);
					const { city, method, country } = userData;
					const prayerTime = await fetch(
						`https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${city}&country=${country}&method=${method}`
					);
					const prayer = await prayerTime.json();

					prayer.data.forEach((item: { timings: Record<string, string> }) => {
						const newTimings: {
							[key: string]: {
								time: string;
								isComplete: boolean;
								isLateComplete: boolean;
							};
						} = {};

						Object.entries(item.timings).forEach(([timingKey, timingValue]) => {
							newTimings[timingKey] = {
								time: `${timingValue}`,
								isComplete: false,
								isLateComplete: false,
							};
							item.timings = newTimings as unknown as Record<string, string>;
						});
					});
					prayer.data.forEach(
						(element: { date: { gregorian: { date: any } } }) => {
							const dateString = element.date.gregorian.date;
							const value = JSON.stringify(element);
							if (!localStorage.getItem(dateString)) {
								localStorage.setItem(dateString, value);
							}
						}
					);
				}
				const storedData = localStorage.getItem(dateString);

				if (storedData && selectedDate !== undefined) {
					const newData = JSON.parse(storedData);
					setData(newData?.timings);
				} else {
					console.log("No data found in local storage.");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData(); // Call the function to fetch data when the component mounts or whenever needed
	}, [selectedDate]);

	const handleCheckboxChange = (prayerKey: string, property: string) => {
		const fetchData = localStorage.getItem(dateString);
		if (fetchData !== null) {
			const updatedData = JSON.parse(fetchData);
			const updatedPrayer = updatedData.timings[prayerKey];
			updatedPrayer[property] = !updatedPrayer[property];
			localStorage.setItem(dateString, JSON.stringify(updatedData));
			setData(updatedData?.timings);
		}
	};

	const Header = ["Waqt", "Time", "Action", "Late Complete"];
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
							span={5}
							xs={4}
							sm={12}
							md={6}
							lg={5}
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
					Object.entries(data).map(([prayerKey, value]: [string, any], index: number) => (
						<React.Fragment key={index}>
							<Col
								span={5}
								style={{
									...styles,
									backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
								}}
							>
								{prayerKey}
							</Col>
							<Col
								span={5}
								style={{
									...styles,
									backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
								}}
							>
								{String(value.time)}
							</Col>
							<Col
								span={5}
								style={{
									...styles,
									backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
								}}
							>
								<Checkbox
									disabled={
										data[prayerKey].isComplete || data[prayerKey].isLateComplete
									}
									name="isComplete"
									checked={data[prayerKey].isComplete}
									onChange={() => handleCheckboxChange(prayerKey, "isComplete")}
								/>
							</Col>
							<Col
								span={5}
								style={{
									...styles,
									backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
								}}
							>
								<Checkbox
									disabled={
										data[prayerKey].isLateComplete || data[prayerKey].isComplete
									}
									name="isLateComplete"
									checked={data[prayerKey].isLateComplete}
									onChange={() =>
										handleCheckboxChange(prayerKey, "isLateComplete")
									}
								/>
							</Col>
						</React.Fragment>
					))}
			</Row>
		</div>
	);
};

export default AnotherToday;
