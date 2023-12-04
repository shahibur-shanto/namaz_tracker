// import React, { useEffect, useRef, useState } from "react";
// import Chart from "chart.js/auto";
// import { Col, Row } from "antd";
// import { ChartDataSets } from "chart.js";

// interface BubbleDataPoint {
// 	x: string;
// 	y: number;
// 	r: number;
// }

// const BubbleChart = () => {
// 	const chartRef = useRef<HTMLCanvasElement | null>(null);
// 	const chartInstance = useRef<Chart<
// 		"bubble",
// 		BubbleDataPoint[],
// 		unknown
// 	> | null>(null);
// 	const [data, setData] = useState(null);
// 	const [isDataLoaded, setIsDataLoaded] = useState(false);

// 	const getCurrentDate = () => {
// 		const today = new Date();
// 		return today;
// 	};

// 	const formatDate = (date: Date): string => {
// 		return date.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
// 	};

// 	useEffect(() => {
// 		const getDataFromLocalStorage = localStorage.getItem("02-12-2023");
// 		if (getDataFromLocalStorage && !isDataLoaded) {
// 			const dataToShow = JSON.parse(getDataFromLocalStorage);
// 			setData(dataToShow);
// 			setIsDataLoaded(true);
// 		}

// 		if (data && data.timings) {
// 			if (chartInstance.current) {
// 				chartInstance.current.destroy();
// 			}

// 			const myChartRef = chartRef.current?.getContext("2d");

// 			if (myChartRef) {
// 				const today = getCurrentDate();
// 				const daysOfWeek = [
// 					"Sun",
// 					"Mon",
// 					"Tue",
// 					"Wed",
// 					"Thu",
// 					"Fri",
// 					"Sat",
// 					"Sun",
// 					"Mon",
// 					"Tue",
// 					"Wed",
// 				];

// 				const dataKeys = Object.keys(data.timings);
// 				const bubbleData: BubbleDataPoint[] = dataKeys.map((key, index) => {
// 					const dayIndex = (today.getDay() + index) % 7; // Ensure the index is within 0-6 range
// 					const dayName = daysOfWeek[dayIndex];
// 					const isPrayerComplete =
// 						data.timings[key].isComplete || data.timings[key].isLateComplete;
// 					const datatoShow = formatDate(
// 						new Date(today.getTime() + index * 24 * 60 * 60 * 1000)
// 					);
// 					console.log(daysOfWeek[index]);
// 					return {
// 						x: daysOfWeek[index],
// 						y: dataKeys.indexOf(key),
// 						r: isPrayerComplete ? 10 : 5,
// 					};
// 				});

// 				chartInstance.current = new Chart(myChartRef, {
// 					type: "bubble",
// 					data: {
// 						datasets: [
// 							{
// 								label: "Prayer Times",
// 								data: bubbleData,
// 								backgroundColor: "rgb(255,99,132)",
// 							} as ChartDataSets<"bubble", BubbleDataPoint[]>, // Specify the type here
// 						],
// 					},
// 					options: {
// 						scales: {
// 							y: {
// 								ticks: {
// 									callback: (value) => dataKeys[value],
// 								},
// 							},
// 						},
// 					},
// 				});
// 			}
// 		}
// 	}, [data, isDataLoaded]);

// 	return (
// 		<Row>
// 			<Col span={18} push={6}>
// 				<div>
// 					<canvas ref={chartRef} />
// 				</div>
// 			</Col>
// 			<Col span={6} pull={18}>
// 				col-18 col-push-6
// 			</Col>
// 		</Row>
// 	);
// };

// export default BubbleChart;
