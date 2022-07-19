import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";
import React, { useState } from "react";
function VariationField({
  variationList,
  setButtonChecker,
  setVariationList,
  checkView,
}) {
  //    const handleAddition = (add,fields)=>{
  //      add();
  //      if(fields.length>0)setTempList([...tempList,variationList])
  //    }
  let test = [];
  for (const iterator of variationList) {
    console.log(iterator, "This is gonna be the iterator");
    test.push({
      number_of_days: true,
      price: true,
      description_ar: true,
      description_en: true,
      down_payment_value: true,
    });
  }
  const [feildChecker, setFieldChecker] = useState(test);
  const handleChange = (index, event) => {
    const values = [...variationList];
    values[index][event.target.name] = event.target.value;
    setVariationList(values);
  };

  const removeElement = (field, id) => {
    const filteredList = variationList.filter((element) => element.id !== id);
    setVariationList(filteredList);
  };

  const handleAddition = () => {
    setFieldChecker([
      ...feildChecker,
      {
        number_of_days: true,
        price: true,
        description_ar: true,
        description_en: true,
        down_payment_value: true,
      },
    ]);
    setVariationList([
      ...variationList,
      {
        id: Math.floor(Math.random() * 10000),
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
                <Row key={field.id} gutter={16}>
                  <Col sm={24} md={11}>
                    <Form.Item
                      label="Number Of Days"
                      required
                      fieldKey={[field.id, "daysss"]}
                      rules={[
                        feildChecker[index]?.number_of_days
                          ? []
                          : ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!numberValidator(value, NUMBER_CONSTANTS)) {
                                  setButtonChecker(false);
                                  return Promise.reject(
                                    "Your Cant include Charcters"
                                  );
                                } else {
                                  setButtonChecker(true);

                                  return Promise.resolve();
                                }
                              },
                            }),
                      ]}
                      name={[field.id, "number_of_days"]}
                      className="w-100"
                    >
                      <Input
                        name="number_of_days"
                        placeholder="Please enter Number of Days"
                        disabled={checkView}
                        // defaultValue={field?.name?.split(" ")[0]}
                        defaultValue={field.number_of_days}
                        maxLength="2"
                        addonAfter="Days"
                        onChange={(e) => {
                          feildChecker[index].number_of_days = false;
                          // setFieldChecker([
                          //   ...feildChecker,
                          //   feildChecker[index].number_of_days= false,
                          // ]);
                          handleChange(index, e);
                        }}
                        className="w-100"
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={11}>
                    <Form.Item
                      required
                      label="Price"
                      name={[field.id, "pricee"]}
                      fieldKey={[field.price, "price"]}
                      rules={[
                        feildChecker[index]?.price
                          ? []
                          : ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!numberValidator(value, NUMBER_CONSTANTS)) {
                                  setButtonChecker(false);

                                  return Promise.reject(
                                    "Your Cant include Charcters"
                                  );
                                } else {
                                  setButtonChecker(true);

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
                        defaultValue={field.price}
                        disabled={checkView}
                        key={field.id}
                        addonAfter="EGP"
                        onChange={(e) => {
                          feildChecker[index].price = false;
                          handleChange(index, e);
                        }}
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
                      rules={[
                        feildChecker[index]?.description_en
                          ? []
                          : ({ getFieldValue }) => ({
                              validator(_, value) {
                                const checkValidation = languageValidator(
                                  lowerCase(value),
                                  ENGLISH_ALPH
                                );
                                if (checkValidation) {
                                  setButtonChecker(true);
                                  return Promise.resolve();
                                } else {
                                  setButtonChecker(false);
                                  return Promise.reject(
                                    "Please enter The Description in English"
                                  );
                                }
                              },
                            }),
                      ]}
                    >
                      <Input.TextArea
                        name="description_en"
                        placeholder="Please enter Description in English"
                        defaultValue={field.description_en}
                        key={field.id}
                        disabled={checkView}
                        onChange={(e) => {
                          // setFieldChecker({
                          //   ...feildChecker,
                          //   description_en: false,
                          // });
                          feildChecker[index].description_en = false;

                          handleChange(index, e);
                        }}
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
                      rules={[
                        feildChecker[index]?.description_ar
                          ? []
                          : ({ getFieldValue }) => ({
                              validator(_, value) {
                                const checkValidation = languageValidator(
                                  value,
                                  ARABIC_alpha
                                );
                                if (checkValidation) {
                                  setButtonChecker(true);
                                  return Promise.resolve();
                                } else {
                                  setButtonChecker(false);
                                  return Promise.reject(
                                    "Please enter The Description in Arabic"
                                  );
                                }
                              },
                            }),
                      ]}
                    >
                      <Input.TextArea
                        name="description_ar"
                        placeholder="Enter the Description in Arabic"
                        key={field.id}
                        disabled={checkView}
                        defaultValue={field.description_ar}
                        addonAfter="EGP"
                        onChange={(e) => {
                          // setFieldChecker({
                          //   ...feildChecker,
                          //   description_ar: false,
                          // });
                          feildChecker[index].description_ar = false;

                          handleChange(index, e);
                        }}
                        className="w-100"
                        value={field.description_ar}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={22}>
                    <Form.Item
                      label="Down Payment"
                      name={[field.id, "down_payment_value"]}
                      fieldKey={[
                        field.down_payment_value,
                        "down_payment_value",
                      ]}
                      rules={[
                        feildChecker[index]?.down_payment_value
                          ? []
                          : ({ getFieldValue }) => ({
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
                        name={"down_payment_value"}
                        placeholder="Enter the Down Payment"
                        key={field.id}
                        addonAfter={"%"}
                        disabled={checkView}
                        defaultValue={field?.down_payment_value}
                        onChange={(e) => {
                          feildChecker[index].down_payment_value = false;

                          handleChange(index, e);
                        }}
                        className="w-100"
                        value={field.price}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={2}>
                    <MinusCircleOutlined
                      className="mt-md-4 pt-md-3"
                      onClick={(e) => {
                        if (checkView) return null;
                        removeElement(field, field.id);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  disabled={checkView}
                  onClick={() => {
                    handleAddition();
                  }}
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
