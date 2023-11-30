import React from "react";
import { Col } from "antd";
import Checkbox from "antd/es/checkbox";

const PrayerCard = ({ prayerKey, value, index, handleCheckboxChange }) => (
  <>
    <Col
      span={5}
      style={{
        ...styles.card,
        backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
      }}
    >
      {prayerKey}
    </Col>
    <Col
      span={5}
      style={{
        ...styles.card,
        backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
      }}
    >
      {String(value.time)}
    </Col>
    <Col
      span={5}
      style={{
        ...styles.card,
        backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
      }}
    >
      <Checkbox
        disabled={value.isComplete || value.isLateComplete}
        name="isComplete"
        checked={value.isComplete}
        onChange={() => handleCheckboxChange(prayerKey, "isComplete")}
      />
    </Col>
    <Col
      span={5}
      style={{
        ...styles.card,
        backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6c5c5",
      }}
    >
      <Checkbox
        disabled={value.isLateComplete || value.isComplete}
        name="isLateComplete"
        checked={value.isLateComplete}
        onChange={() => handleCheckboxChange(prayerKey, "isLateComplete")}
      />
    </Col>
  </>
);

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "8px",
    marginRight: "8px",
  },
};

export default PrayerCard;