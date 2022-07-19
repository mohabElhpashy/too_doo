import { Card, Form, Input, Row, Select, TimePicker } from "antd";
import React from "react";
import moment from "moment";
const { Option } = Select;
const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const GeneralField = ({
  postObject,
  setPostObject,
  services,
  filteredClinics,
  checkViewMode,
}) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item name="days" required label={<span>Days&nbsp;</span>}>
          <Select
            disabled={checkViewMode}
            showSearch
            defaultValue={postObject?.day}
            placeholder="Please Select Day"
            optionFilterProp="children"
            onChange={(e) => setPostObject({ ...postObject, day: e })}
            value={postObject?.service_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {days?.map((element, index) => (
              <Option key={index} value={element}>
                {element}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          required
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
          name="time_from"
          label="Time From"
        >
          <TimePicker
            showTime
            disabled={checkViewMode}
            defaultValue={moment(postObject?.time_from, "HH:mm:ss")}
            className="w-100"
            showNow={false}
            placeholder="Select Time"
            onOk={(e) => {
              const timeString = moment(e).format("HH:mm:ss");
              setPostObject({
                ...postObject,
                time_from: timeString,
              });
            }}
          />
        </Form.Item>

        <Form.Item
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          name="time_to"
          label="Time To"
          required
        >
          <TimePicker
            showTime
            disabled={checkViewMode}
            showNow={false}
            defaultValue={moment(postObject?.time_to, "HH:mm:ss")}
            placeholder="Select Time"
            className="w-100"
            onOk={(e) => {
              const timeString = moment(e).format("HH:mm:ss");
              setPostObject({
                ...postObject,
                time_to: timeString,
              });
            }}
          />
        </Form.Item>
        <Form.Item required name="clinic_id" label="Clinic Name:" hasFeedback>
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            defaultValue={postObject?.clinic_id}
            placeholder="Select a Clinic Name"
            onSelect={(e) => setPostObject({ ...postObject, clinic_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {filteredClinics?.map((element, index) => (
              <Option key={element.id} value={element.id}>
                {element?.name_en}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
