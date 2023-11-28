"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useRouter } from "next/navigation";

import { Country, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
const { Option } = Select;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const tailLayout = {
	wrapperCol: {
		xl: { offset: 12, span: 12 },
		md: { offset: 12, span: 12 },
		sm: { offset: 12, span: 12 },
		xs: { offset: 12, span: 12 },
	},
};
async function getData() {
	const prayerTime = await fetch(
		"https://api.aladhan.com/v1/calendarByCity/2023/11?city=Noakhali&country=Bangladesh&method=2"
	);
	const prayer = await prayerTime.json();
	return prayer.data;
}

const Seetings = () => {
	const router = useRouter();
	const [form] = Form.useForm();
	const [country, setCountry] = useState("");
	const [countryCode, setCountryCode] = useState("");

	const onChangeMazhab = (value: string) => {
		switch (value) {
			case "Shafi":
				form.setFieldsValue({ note: "Hi, man!" });
				break;
			case "Hanafi":
				form.setFieldsValue({ note: "Hi, lady!" });
				break;
			case "Other":
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
			default:
		}
	};

	const onFinish = async (values: any) => {
		// const prayerTime = await getData();
		// localStorage.setItem("prayerTime", JSON.stringify(prayerTime));
		// localStorage.setItem("userData", JSON.stringify(values));
		console.log(values);

		// router.push("/today");
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Row>
			<Col xs={0} sm={4} md={6} lg={6}></Col>
			<Col xs={24} sm={16} md={12} lg={12} xl={10}>
				<Form
					{...layout}
					form={form}
					name="control-hooks"
					onFinish={onFinish}
					style={{
						marginTop: "20px",
					}}
				>
					<Form.Item name="name" label="Name" rules={[{ required: true }]}>
						<Input placeholder="Please enter your name" />
					</Form.Item>
					<Form.Item
						name="country"
						label="Country"
						rules={[{ required: true }]}
					>
						<Select
							placeholder="Select your City"
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
							<Option value="01">University of Scinece, Karachi</Option>
						</Select>
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button
							type="primary"
							style={{ marginRight: "8px" }}
							htmlType="submit"
						>
							Submit
						</Button>
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
