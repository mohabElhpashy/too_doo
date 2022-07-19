import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { numberValidator } from "constants/helperFunctions";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
import React from "react";
function VariationField({ variationList, setVariationList, checkView }) {
  const handleChange = (index, event) => {
    const values = [...variationList];
    values[index][event.target.name] = event.target.value;
    setVariationList(values);
  };

  const removeElement = (_, id) => {
    const filteredList = variationList.filter((element) => element.id !== id);
    setVariationList(filteredList);
  };

  const handleAddition = () => {
    setVariationList([
      ...variationList,
      {
        id: Math.floor(Math.random() * 10000),
        // price: null,
        // number_of_days: "",
        // description_en: "",
        // description_ar: "",
      },
    ]);
  };
  return (
    <Card title="Variants">
      <Form.List name="variants">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {variationList?.map((field, index) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <MinusCircleOutlined
                      disabled={checkView}
                      className="mt-md-4 pt-md-3 "
                      onClick={(e) => {
                        if (checkView) return null;
                        else {
                          return removeElement(field, field.id);
                        }
                      }}
                    />
                  </div>

                  <Row key={field.id} gutter={16}>
                    <Col sm={24} md={11}>
                      <Form.Item
                        required
                        label="Number Of Days"
                        name={[field.id, "number_of_days"]}
                        rules={[
                          () => ({
                            validator(_, value) {
                              if (!numberValidator(value, NUMBER_CONSTANTS)) {
                                return Promise.reject(
                                  "Your Cant include Charcters"
                                );
                              } else {
                                return Promise.resolve();
                              }
                            },
                          }),
                        ]}
                        className="w-100"
                      >
                        <Input
                          name="number_of_days"
                          placeholder="Please enter Number of Days"
                          key={field.id}
                          maxLength="2"
                          addonAfter="Days"
                          onChange={(e) => handleChange(index, e)}
                          className="w-100"
                          value={field.number_of_days}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={11}>
                      <Form.Item
                        label="Price"
                        required
                        name={[field.id, "pricee"]}
                        fieldKey={[field.price, "price"]}
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!numberValidator(value, NUMBER_CONSTANTS)) {
                                return Promise.reject(
                                  "Your Cant include Charcters"
                                );
                              } else {
                                return Promise.resolve();
                              }
                            },
                          }),
                        ]}
                        className="w-100"
                      >
                        <Input
                          name="price"
                          placeholder="Enter the Price"
                          key={field.id}
                          addonAfter="EGP"
                          onChange={(e) => handleChange(index, e)}
                          className="w-100"
                          value={field.price}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={11}>
                      <Form.Item
                        required
                        label="Description in English"
                        name={[field.id, "description_en"]}
                        className="w-100"
                      >
                        <Input.TextArea
                          name="description_en"
                          placeholder="Please enter Description in English"
                          key={field.id}
                          onChange={(e) => handleChange(index, e)}
                          className="w-100"
                          value={field.description_en}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={11}>
                      <Form.Item
                        label="Description in Arabic"
                        required
                        name={[field.id, "description_ar"]}
                        fieldKey={[field.price, "description_ar"]}
                        className="w-100"
                      >
                        <Input.TextArea
                          name="description_ar"
                          placeholder="Enter the Description in Arabic"
                          key={field.id}
                          addonAfter="EGP"
                          onChange={(e) => handleChange(index, e)}
                          className="w-100"
                          value={field.description_ar}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={22}>
                      <Form.Item
                        label="Down Payment"
                        name={[field.id, "down_payment_value"]}
                        fieldKey={[field.price, "down_payment_value"]}
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!numberValidator(value, NUMBER_CONSTANTS)) {
                                return Promise.reject(
                                  "Your Cant include Charcters"
                                );
                              } else if (value > 100) {
                                return Promise.reject(
                                  "Your Cant Number Cant be Greater Than 100"
                                );
                              } else {
                                return Promise.resolve();
                              }
                            },
                          }),
                        ]}
                        className="w-100"
                      >
                        <Input
                          name="down_payment_value"
                          placeholder="Enter the Down Payment"
                          key={field.id}
                          addonAfter={"%"}
                          onChange={(e) => handleChange(index, e)}
                          className="w-100"
                        />
                      </Form.Item>
                    </Col>
                    {/* <Col sm={24} md={2}>
                      <MinusCircleOutlined
                        className="mt-md-4 pt-md-3"
                        onClick={(e) => {
                          removeElement(field, field.id);
                        }}
                      />
                    </Col> */}
                  </Row>
                </>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => handleAddition()}
                  className="w-100"
                >
                  <PlusOutlined /> Add Another Variation
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Card>
  );
}

export default VariationField;
