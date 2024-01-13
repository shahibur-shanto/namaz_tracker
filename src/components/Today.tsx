"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Checkbox from "antd/es/checkbox";
import { useDateContext } from "@/app/Context/store";
import "./today.css";
import { getCurrentDate } from "@/app/utility/utility";
import dayjs, { Dayjs } from "dayjs";

const Today = () => {
	const [data, setData] = useState<Record<
		string,
		{ time: string; isComplete: boolean; isLateComplete: boolean }
	> | null>(null);
	const { selectedDate } = useDateContext();
	const [dateString, setDateString] = useState<string>("");

	const isFutureWaqt = (waqtTime: Dayjs) => {
		const presentCurrentTime = getCurrentDate();

		return waqtTime.isAfter(presentCurrentTime);
	};
	useEffect(() => {
		const currentYear = selectedDate.format("YYYY");
		const currentMonth = selectedDate.format("MM");
		setDateString(dayjs(selectedDate).format("DD-MM-YYYY"));
		const fetchData = async () => {
			try {
				const getUserData = localStorage.getItem("userData");
				if (getUserData) {
					const userData = JSON.parse(getUserData);
					const { city, method, country, regTime } = userData;

					const prayerTime = await fetch(
						`https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${city}&country=${country}&method=${method}&iso8601=true`
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
						(element: { timings: any; date: { gregorian: { date: any } } }) => {
							const dateString = element.date.gregorian.date;
							const value = JSON.stringify(element);

							if (dateString === dayjs(regTime).format("DD-MM-YYYY")) {
								const previousDataString = localStorage.getItem("previousData");
								if (previousDataString) {
									const previousData = JSON.parse(previousDataString);
									Object.keys(JSON.parse(value).timings).forEach((waqt) => {
										if (previousData.timings[waqt]) {
											previousData.timings[waqt].time =
												JSON.parse(value).timings[waqt].time;
										}
									});
									localStorage.setItem(
										dateString,
										JSON.stringify(previousData)
									);
								}
							}
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
	}, [selectedDate, dateString]);

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
								const isFuture = isFutureWaqt(dayjs(value.time));

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
															dayjs(value.time).format("HH:mm A") +
															"--" +
															dayjs(data?.Sunrise?.time).format("HH:mm A")
														);
													case "Sunrise":
														return dayjs(data?.Sunrise?.time).format("HH:mm A");
													case "Dhuhr":
														return (
															dayjs(data?.Dhuhr?.time).format("HH:mm A") +
															"--" +
															dayjs(data?.Asr?.time).format("HH:mm A")
														);
													case "Asr":
														return (
															dayjs(data?.Asr?.time).format("HH:mm A") +
															"--" +
															dayjs(data?.Maghrib?.time).format("HH:mm A")
														);
													case "Sunset":
														return dayjs(data?.Sunset?.time).format("HH:mm A");
													case "Maghrib":
														return (
															dayjs(data?.Maghrib?.time).format("HH:mm A") +
															"--" +
															dayjs(data?.Isha?.time).format("HH:mm A")
														);
													case "Isha":
														return (
															dayjs(data?.Isha?.time).format("HH:mm A") +
															"--" +
															String(`00:00`)
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
													data[prayerKey].isLateComplete ||
													prayerKey === "Sunset" ||
													prayerKey == "Sunrise"
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
													data[prayerKey].isComplete ||
													prayerKey === "Sunset" ||
													prayerKey == "Sunrise"
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
