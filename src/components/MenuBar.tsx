"use client";
import React, { useState } from "react";
import { Divider, Typography } from "antd";
import "./MenuBar.css";
import type { MenuInfo } from "rc-menu/lib/interface";
import { useRouter } from "next/navigation";
const MenuBar = () => {
	const [current, setCurrent] = useState("/"); // Assuming you have a default key
	const router = useRouter();
	const links = [
		{ key: "dashboard", label: "dashboard" },
		{ key: "today", label: "today" },
		{ key: "/", label: "settings" },
	];

	const onClick = (e: MenuInfo) => {
		setCurrent(e.key.toString());
		router.push(`/${e.key.toString()}`);
	};

	return (
		<div className="menu-bar">
			{links.map((link) => (
				<React.Fragment key={link.key}>
					<Divider type="vertical" />
					<Typography.Link
						onClick={() => onClick({ key: link.key } as MenuInfo)}
						style={{ color: current === link.label ? "blue" : "black" }}
					>
						{link.label}
					</Typography.Link>
				</React.Fragment>
			))}
		</div>
	);
};

export default MenuBar;
