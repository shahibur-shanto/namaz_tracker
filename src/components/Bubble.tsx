'use client'
import React from "react";
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { faker } from '@faker-js/faker';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};

export const data = {
	datasets: [
		{
			label: "Red dataset",
			data: Array.from({ length: 10 }, () => ({
				x: faker.datatype.number({ min: -10, max: 10 }),
				y: faker.datatype.number({ min: -10, max: 10 }),
				r: faker.datatype.number({ min: 5, max: 8 }),
			})),
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
		// {
		// 	label: "Blue dataset",
		// 	data: Array.from({ length: 50 }, () => ({
		// 		x: faker.datatype.number({ min: -10, max: 10 }),
		// 		y: faker.datatype.number({ min: -10, max: 10 }),
		// 		r: faker.datatype.number({ min: 5, max: 8 }),
		// 	})),
		// 	backgroundColor: "rgba(53, 162, 235, 0.5)",
		// },
	],
};

export function BubblePage() {
	return <Bubble options={options} data={data} />;
}
