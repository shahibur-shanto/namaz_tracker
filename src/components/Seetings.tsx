"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, message, Spin } from "antd";
import { useRouter } from "next/navigation";
import { Country, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { doesItemExist, getCurrentDate } from "@/app/utility/utility";
import dayjs, { Dayjs } from "dayjs";
import isEqual from "lodash/isEqual";
import { LoadingOutlined } from "@ant-design/icons";
import { has } from "lodash";

const { Option } = Select;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

interface User {
	name: string;
	country: string;
	city: string | null;
	mazhab: string;
	method: string;
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
	const [countryCode, setCountryCode] = useState("");
	const [hasCity, setHasCity] = useState(false);
	const [regTime, setRegTime] = useState<Dayjs>(dayjs());
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const currentYear = parseInt(dayjs().format("YYYY"));
	const currentMonth = parseInt(dayjs().format("MM"));
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const onChangeMazhab = (value: string) => {};

	const onChangeCity = (value: string) => {};

	useEffect(() => {
		setHasCity((prevHasCity) => {
			const citiesForCountry = City.getCitiesOfCountry(countryCode);
			console.log("Cities for Country:", citiesForCountry);

			const hasCity = (citiesForCountry?.length ?? 0) > 0;
			if (prevHasCity !== hasCity) {
				// Only log when the value changes
				console.log("Has City Changed:", hasCity);
			}
			return hasCity;
		});
		console.log("Updated Country Code:", countryCode);
	}, [countryCode]);
	useEffect(() => {
		const storedUser = localStorage.getItem("userData");

		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setCurrentUser(parsedUser);

			console.log("Parsed User Country:", parsedUser?.country);

			setCountryCode((prevCountryCode) => {
				const selectedCountryCode = Country.getAllCountries().find(
					(e) => e.name === parsedUser?.country
				);
				console.log(selectedCountryCode?.isoCode);
				return selectedCountryCode?.isoCode || prevCountryCode;
			});
			// console.log(countryCode);
			setHasCity((prevHasCity) => {
				const citiesForCountry = City.getCitiesOfCountry(countryCode);
				console.log("Cities for Country:", citiesForCountry);

				const hasCity = (citiesForCountry?.length ?? 0) > 0;
				if (prevHasCity !== hasCity) {
					// Only log when the value changes
					console.log("Has City Changed:", hasCity);
				}
				return hasCity;
			});
		}

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onChangeCountry = (value: string) => {
		form.setFieldsValue({
			city: null,
		});

		const selectedCountryCode = Country.getAllCountries().find(
			(e) => e.name === value
		);
		setCountryCode(selectedCountryCode?.isoCode || "");

		setHasCity((prevHasCity) => {
			const citiesForCountry = City.getCitiesOfCountry(
				selectedCountryCode?.isoCode || ""
			);
			const hasCity = (citiesForCountry?.length ?? 0) > 0;
			return hasCity;
		});
	};

	const onChangeMethod = (value: string) => {};

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
		try {
			setLoading(true);
			const storedData = localStorage.getItem("userData");
			const info = () => {
				messageApi.info("Data not found for your country");
			};
			if (storedData) {
				const existingData = JSON.parse(storedData);
				const isDataChanged = !isEqual(values, existingData);
				if (isDataChanged) {
					const response = await fetch(
						`https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${values.city}&country=${values.country}&method=${values.method}&iso8601=true`
					);

					if (!response.ok) {
						// console.error(`Error: ${response.status} - ${response.statusText}`);
						info();
						return;
					} else {
						let newRegTime = regTime;
						while (doesItemExist(newRegTime.format("DD-MM-YYYY"))) {
							const itemValue = localStorage.getItem(
								newRegTime.format("DD-MM-YYYY")
							);

							if (itemValue) {
								localStorage.removeItem(newRegTime.format("DD-MM-YYYY"));
							}

							newRegTime = newRegTime.add(1, "day"); // Update newRegTime here
							setRegTime(newRegTime); // Update the state with the new value
							console.log(newRegTime.format("DD-MM-YYYY"));
						}
						values.regTime = regTime;
						localStorage.setItem("userData", JSON.stringify(values));
						router.push("/today");
					}
				}
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Row>
			{contextHolder}
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
						/>
					</Form.Item>
					<Form.Item
						name="country"
						label="Country"
						rules={[{ required: true }]}
					>
						<Select
							showSearch
							placeholder={
								currentUser ? currentUser?.country : "Select your Country"
							}
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

					<Form.Item
						name="city"
						label="City"
						rules={[{ required: hasCity ? true : false }]}
						style={{
							display: hasCity && currentUser?.city ? "block" : "none",
						}}
					>
						<Select
							showSearch
							placeholder={"Select your City"}
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
							placeholder={"Select your Method for Salat Time Calculation"}
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
								{loading ? (
									<div>
										<Spin
											indicator={
												<LoadingOutlined
													style={{ fontSize: 24, color: "white" }}
													spin
												/>
											}
										/>
										<span style={{ marginLeft: 8 }}>Updating...</span>
									</div>
								) : (
									"Update"
								)}
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
