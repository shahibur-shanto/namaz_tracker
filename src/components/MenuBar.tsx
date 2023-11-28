"use client";
import React, { useEffect, useState } from "react";
import { Divider, Typography } from "antd";
import "./MenuBar.css";
import type { MenuInfo } from "rc-menu/lib/interface";
import { useRouter } from "next/navigation";
const MenuBar = () => {
	const [current, setCurrent] = useState("/");
	useEffect(() => {
		// Retrieve active link from local storage on component mount
		const storedLink = window.localStorage.getItem("activeLink");
		if (storedLink) {
			setCurrent(storedLink);
		}
	}, []);

	const router = useRouter();
	const links = [
		{ key: "dashboard", label: "Dashboard" },
		{ key: "today", label: "Today" },
		{ key: "/", label: "Settings" },
	];

	const onClick = (e: MenuInfo) => {
		setCurrent(e.key.toString());
		window.localStorage.setItem("activeLink", e.key.toString());
		router.push(`/${e.key.toString()}`);
	};

	return (
		<div className="menu-bar">
			{links.map((link) => (
				<div
					key={link.key}
					className="menu-link"
					onClick={() => onClick({ key: link.key } as MenuInfo)}
					style={{
						backgroundColor: current === link.key ? "#a8a8a8" : "#ded9ca",
						padding: "5px",
						margin: "0px 5px",
						borderRadius: "5px",
						transition: "background-color 0.3s ease",
						cursor: "pointer",
					}}
				>
					{/* <Divider type="vertical" /> */}
					<Typography.Link
						style={{
							backgroundColor: current === link.key ? "#a8a8a8" : "#ded9ca",
							padding: "5px",
							margin: "0px 5px",
							borderRadius: "5px",
							color: current === link.key ? "white" : "black",
							letterSpacing: "2px",
							fontWeight: "bold",
							transition: "background-color 0.3s ease", // Smooth transition for the hover effect
							cursor: "pointer", // Change cursor to pointer on hover
						}}
						className="menu-link"
					>
						{link.label}
					</Typography.Link>
				</div>
			))}
		</div>
	);
};

export default MenuBar;
