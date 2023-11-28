import { BubblePage } from "@/components/Bubble";
import Header from "@/components/Header";
import MenuBar from "@/components/MenuBar";
import React from "react";

const Dashboard = () => {
	return (
		<>
			<Header />
			<MenuBar />
			<BubblePage />
		</>
	);
};

export default Dashboard;
