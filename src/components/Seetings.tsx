"use client";
import React, { use, useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useRouter } from "next/navigation";

import { Country, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import moment, { ISO_8601 } from "moment";
import { getCurrentDate } from "@/app/utility/utility";
const { Option } = Select;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

interface User {
	name: string;
}
const tailLayout = {
	wrapperCol: {
		xl: { offset: 12, span: 12 },
		md: { offset: 12, span: 12 },
		sm: { offset: 12, span: 12 },
		xs: { offset: 12, span: 12 },
	},
};

const Seetings = () => {
	const router = useRouter();
	const [form] = Form.useForm();
	const [country, setCountry] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [regTime, setRegTime] = useState(moment());
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const WaqtName = [
		"Fajr",
		"Sunrise",
		"Dhuhr",
		"Asr",
		"Sunset",
		"Maghrib",
		"Isha",
	];

	function doesItemExist(dateKey: moment.Moment) {
		return localStorage.getItem(dateKey.format("DD-MM-YYYY")) !== null;
	}

	const onChangeMazhab = (value: string) => {
		switch (value) {
			case "01":
				form.setFieldsValue({ note: "Hi, man!" });
				break;
			case "02":
				form.setFieldsValue({ note: "Hi, lady!" });
				break;
			case "03":
				form.setFieldsValue({ note: "Hi there!" });
				break;
			default:
		}
	};

	const onChangeCity = (value: string) => {
		switch (value) {
			case "Dhaka":
				form.setFieldsValue({ note: "Hello, from Dhaka!" });
				break;
			case "Noakhali":
				form.setFieldsValue({ note: "Hello, Noakhali" });
				break;
			case "other":
				form.setFieldsValue({ note: "Hello there!" });
				break;
			default:
		}
	};

	useEffect(() => {
		const storedUser = localStorage.getItem("userData");

		if (storedUser) {
			setCurrentUser(JSON.parse(storedUser));
		}
	}, []);

	const onChangeCountry = (value: string) => {
		form.setFieldsValue({
			city: null,
			// or provide an initial value if needed
		});

		setCountry(value);
		setCountryCode((prevCountryCode) => {
			const selectedCountryCode = Country.getAllCountries().find(
				(e) => e.name === value
			);
			return selectedCountryCode?.isoCode || prevCountryCode;
		});
	};
	const onChangeMethod = (value: string) => {
		switch (value) {
			case "01":
				form.setFieldsValue({ note: "Thanks " });
				break;
			case "02":
				form.setFieldsValue({ note: "Thanks " });
				break;

			default:
		}
	};

	const onFinish = async (values: any) => {
		setRegTime(getCurrentDate());
		values.regTime = regTime;
		localStorage.setItem("userData", JSON.stringify(values));

		router.push("/today");
	};

	const onReset = () => {
		form.resetFields();
	};
	const onUpdate = async (values: any) => {
		const storedData = localStorage.getItem("userData");
		if (storedData) {
			const existingData = JSON.parse(storedData);
			const isDataChanged = Object.keys(values).some((key) => {
				return values[key] !== existingData[key];
			});
			if (isDataChanged) {
				setRegTime(getCurrentDate());
				values.regTime = regTime;
				values.name = values.name || currentUser?.name || "";
				localStorage.setItem("userData", JSON.stringify(values));
				const todaysData = localStorage.getItem(regTime.format("DD-MM-YYYY"));
				if (todaysData) {
					localStorage.setItem("previousData", todaysData);
				}
				while (doesItemExist(regTime)) {
					const dateKey = regTime.format("DD-MM-YYYY");
					const itemValue = localStorage.getItem(dateKey);
					itemValue && localStorage.removeItem(dateKey);
					setRegTime(regTime.add(1, "days"));
				}

				console.log("Data updated successfully");
				router.push("/today");
			} else {
				console.log("No Change Detected");
			}
		} else {
			console.log("No existing data found in LocalStorage");
		}
	};

	return (
		<Row>
			<Col xs={0} sm={4} md={6} lg={6}></Col>
			<Col xs={24} sm={16} md={12} lg={12} xl={10}>
				<Form
					{...layout}
					form={form}
					name="control-hooks"
					onFinish={currentUser ? onUpdate : onFinish}
					style={{
						marginTop: "20px",
					}}
				>
					<Form.Item
						name="name"
						label="Name"
						rules={[{ required: currentUser ? false : true }]}
					>
						<Input
							placeholder={
								currentUser ? currentUser?.name : "Please enter your name"
							}
							disabled={currentUser ? true : false}
						/>
					</Form.Item>
					<Form.Item
						name="country"
						label="Country"
						rules={[{ required: true }]}
					>
						<Select
							placeholder="Select your Country"
							onChange={onChangeCountry}
							allowClear
						>
							{Country.getAllCountries().map((value, index) => (
								<Option key={index} value={value.name}>
									{value.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="city" label="City" rules={[{ required: true }]}>
						<Select
							placeholder="Select your City"
							onChange={onChangeCity}
							allowClear
						>
							{City.getCitiesOfCountry(countryCode)?.map((value, index) => (
								<Option key={index} value={value.name}>
									{value.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="mazhab" label="Mazhab" rules={[{ required: true }]}>
						<Select
							placeholder="Select Your Mazhab"
							onChange={onChangeMazhab}
							allowClear
						>
							<Option value="01">Shafi</Option>
							<Option value="02">Hanafi</Option>
							<Option value="03">Other</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="method"
						label="Salat Time"
						rules={[{ required: true }]}
					>
						<Select
							placeholder="Select your Method for Salat Time Calculation"
							onChange={onChangeMethod}
							allowClear
						>
							<Option value="01">
								University of Islamic Sciences, Karachi
							</Option>
						</Select>
					</Form.Item>

					<Form.Item {...tailLayout}>
						{currentUser ? (
							<Button
								type="primary"
								style={{ marginRight: "8px" }}
								htmlType="submit"
							>
								Update
							</Button>
						) : (
							<Button
								type="primary"
								style={{ marginRight: "8px" }}
								htmlType="submit"
							>
								Submit
							</Button>
						)}
						<Button
							htmlType="button"
							style={{ marginLeft: "8px" }}
							onClick={onReset}
						>
							Reset
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col xs={0} sm={4} md={6} lg={6}></Col>
		</Row>
	);
};

export default Seetings;
