"use client";
import React, { useEffect } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER } from "next/dist/lib/constants";

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
	const [form] = Form.useForm();

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
	const onChangeMethod = (value: string) => {
		switch (value) {
			case "01":
				form.setFieldsValue({ note: "Thanks " });
				break;
			default:
		}
	};

	const onFinish = async (values: any) => {
		const prayerTime = await getData();
		localStorage.setItem("prayerTime", JSON.stringify(prayerTime));
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
					<Form.Item name="City" label="City" rules={[{ required: true }]}>
						<Select
							placeholder="Select a City"
							onChange={onChangeCity}
							allowClear
						>
							<Option value="Dhaka">Dhaka</Option>
							<Option value="Noakhali">Noakhali</Option>
							<Option value="Other">Other</Option>
						</Select>
					</Form.Item>
					<Form.Item name="Mazhab" label="Mazhab" rules={[{ required: true }]}>
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
					<Form.Item name="Method" label="Method" rules={[{ required: true }]}>
						<Select
							placeholder="Select your method"
							onChange={onChangeMethod}
							allowClear
						>
							<Option value="01">University of Islamabad</Option>
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
