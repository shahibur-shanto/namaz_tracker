"use client";
import React from "react";
import { Flex } from "antd";
import type { FlexProps } from "antd";
import Icon from "./Icon";
import UserPicture from "./Avatar";

const boxStyle: React.CSSProperties = {
	width: "100%",
	
};
const buttonStyle: React.CSSProperties = {
	margin: "10px",
};
const body: React.CSSProperties = {
	backgroundColor: "#d9d5d4",
	margin: 0,
};
const justifyOptions = ["center"];
const alignOptions = ["flex-start"];

const Header = () => {
	const [justify, setJustify] = React.useState<FlexProps["justify"]>(
		justifyOptions[0]
	);
	const [alignItems, setAlignItems] = React.useState<FlexProps["align"]>(
		alignOptions[0]
	);
	return (
		<Flex gap="middle" align="start" vertical style={body}>
			<Flex className="sm:flex sm:items-center" style={boxStyle} justify={justify} align={alignItems}>
				<div className="sm:w-1/4 md:w-1/6 lg:w-1/12" style={buttonStyle}>
					<Icon />
				</div>
				<div className="sm:w-1/2 md:w-2/3 lg:w-5/6" style={buttonStyle}>
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Namaz Tracker</h1>
				</div>
				<div className="sm:w-1/4 md:w-1/6 lg:w-1/12" style={buttonStyle}>
					<UserPicture />
				</div>
			</Flex>
		</Flex>
	);
};
export default Header;
