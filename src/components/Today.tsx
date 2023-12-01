"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Checkbox from "antd/es/checkbox";
import { useDateContext } from "@/app/Context/store";
import "./today.css";

const Today = () => {
	const [data, setData] = useState<Record<
		string,
		{ time: string; isComplete: boolean; isLateComplete: boolean }
	> | null>(null);
	const { selectedDate } = useDateContext();
	const [dateString, setDateString] = useState<string>("");

	const getCurrentDate = () => {
		const today = new Date();
		return today;
	};

	const formatDate = (date: Date): string => {
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	function removeOffsetFromWaqtTime(waqtTime: string) {
		return waqtTime.replace(/\s*\(\+\d+\)/, ""); // Remove "(+06)" or similar pattern
	}

	const isFutureWaqt = (presentSelectedDate: Date, waqtTime: string) => {
		const currentDateTime = getCurrentDate();
		// const presentSelectedDateTime = new Date(presentSelectedDate);

		// Extract date components without time
		const currentDate = new Date(
			currentDateTime.getFullYear(),
			currentDateTime.getMonth(),
			currentDateTime.getDate()
		);
		const selectedDate = new Date(
			presentSelectedDate.getFullYear(),
			presentSelectedDate.getMonth(),
			presentSelectedDate.getDate()
		);

		if (currentDate < selectedDate) {
			return true;
		} else if (currentDate > selectedDate) {
			return false;
		} else {
			const currentHour = currentDateTime.getHours();
			const currentMinute = currentDateTime.getMinutes();
			const [waqtHour, waqtMinutes] = removeOffsetFromWaqtTime(waqtTime)
				.split(":")
				.map(Number);

			if (currentHour * 60 + currentMinute < waqtHour * 60 + waqtMinutes) {
				return true;
			} else {
				return false;
			}
		}
	};

	useEffect(() => {
		const currentDayOfMonth = selectedDate.getDate();
		const formattedDayOfMonth =
			currentDayOfMonth < 10 ? `0${currentDayOfMonth}` : currentDayOfMonth;
		const currentMonth = selectedDate.getMonth() + 1;
		const currentYear = selectedDate.getFullYear();
		const dateString = `${formattedDayOfMonth}-${currentMonth}-${currentYear}`;
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
	const WaqtName = [
		"Fajr",
		"Sunrise",
		"Dhuhr",
		"Asr",
		"Sunset",
		"Maghrib",
		"Isha",
	];

	const styles: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",

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
							xs={5}
							sm={4}
							md={5}
							lg={5}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "20px",
								fontWeight: "bold",
								backgroundColor: "#adaaaa",
								height: "50px",
								marginLeft: "8px",
								marginRight: "8px",
								marginTop: "8px",
							}}
						>
							<p className="your-title-class">{item}</p>
						</Col>
					</React.Fragment>
				))}

				{/* Content Cards */}
				{data &&
					Object.entries(data).map(
						([prayerKey, value]: [string, any], index: number) => {
							if (WaqtName.includes(prayerKey)) {
								const isFuture = isFutureWaqt(selectedDate, value.time);
								return (
									<React.Fragment key={index}>
										<Col
											span={5}
											style={{
												...styles,
												backgroundColor:
													index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
											}}
										>
											{prayerKey}
										</Col>
										<Col
											span={5}
											style={{
												...styles,
												backgroundColor:
													index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
											}}
										>
											{(() => {
												switch (prayerKey) {
													case "Fajr":
														return (
															String(value.time) +
															" to " +
															String(data?.Sunrise?.time)
														);
													case "Sunrise":
														return String(data?.Sunrise?.time);
													case "Dhuhr":
														return (
															String(data?.Sunrise?.time) +
															" to " +
															String(data?.Asr?.time)
														);
													case "Asr":
														return (
															String(data?.Asr?.time) +
															" to " +
															String(data?.Maghrib?.time)
														);
													case "Sunset":
														return String(data?.Sunset?.time);
													case "Maghrib":
														return (
															String(data?.Maghrib?.time) +
															" to " +
															String(data?.Isha?.time)
														);
													case "Isha":
														return (
															String(data?.Isha?.time) +
															" to " +
															String(`12:00 (+06)`)
														);
													default:
														return String(value.time);
												}
											})()}
										</Col>
										<Col
											span={5}
											style={{
												...styles,
												backgroundColor:
													index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
											}}
										>
											<Checkbox
												disabled={
													isFuture ||
													data[prayerKey].isComplete ||
													data[prayerKey].isLateComplete
												}
												name="isComplete"
												checked={data[prayerKey].isComplete}
												onChange={() =>
													handleCheckboxChange(prayerKey, "isComplete")
												}
											/>
										</Col>
										<Col
											span={5}
											style={{
												...styles,
												backgroundColor:
													index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
											}}
										>
											<Checkbox
												disabled={
													isFuture ||
													data[prayerKey].isLateComplete ||
													data[prayerKey].isComplete
												}
												name="isLateComplete"
												checked={data[prayerKey].isLateComplete}
												onChange={() =>
													handleCheckboxChange(prayerKey, "isLateComplete")
												}
											/>
										</Col>
									</React.Fragment>
								);
							} else {
								return null; // Skip rendering for excluded prayers
							}
						}
					)}
			</Row>
		</div>
	);
};

export default Today;
