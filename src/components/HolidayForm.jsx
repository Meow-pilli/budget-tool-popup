import { Col, Form, Select, Row } from "antd";
import React from "react";

const holidayItems = [
  { value: "all-holidays", label: "All Holidays" },
  { value: "christmas", label: "Christmas" },
  { value: "thanksgiving", label: "Thanksgiving" },
  { value: "new-year", label: "New Year" },
  { value: "easter", label: "Easter" },
  { value: "halloween", label: "Halloween" },
];

const currencyItems = [
  { value: "dollar", label: "Dollar ($)" },
  { value: "pound", label: "Pound (£)" },
  { value: "euro", label: "Euro (€)" },
  { value: "rupees", label: "Rupees (₹)" },
  { value: "yen", label: "Yen (¥)" },
];

function HolidayForm() {
  return (
    <Form name="holiday-form">
      <Row gutter="90">
        <Col>
          <Form.Item name="holiday">
            <Select allowClear
              placeholder="-- Select a Holiday --"
              options={holidayItems}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="currency">
            <Select allowClear
              placeholder="-- Select a Currency --"
              options={currencyItems}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default HolidayForm;
