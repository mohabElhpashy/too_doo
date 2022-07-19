import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { numberValidator } from "constants/helperFunctions";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
import React, { useState } from "react";

function VariationField({
  postObject,
  setPostObject,
  variationList,
  setVariationList,
  checkView,
}) {
  //    const handleAddition = (add,fields)=>{
  //      add();
  //      if(fields.length>0)setTempList([...tempList,variationList])
  //    }

  // const [purchaseList, setPurchaseList] = useState(staticPurchaseList);
  // const handleChange = (index, event) => {
  //   const values = [...variationList];
  //   values[index][event.target.name] = event.target.value;
  //   setVariationList(values);
  // };
  // const handleSelect = (index, event) => {
  //   const values = [...variationList];
  //   values[index]["purchase_type"] = event;
  //   setPurchaseList(
  //     purchaseList.filter((element, index) => element.type !== event)
  //   );
  //   setVariationList(values);
  // };
  // const removeElement = (field, id) => {
  //   const filteredList = variationList.filter((element) => element.id !== id);
  //   setVariationList(filteredList);
  //   setPurchaseList(staticPurchaseList);
  // };

  // const handleAddition = () => {
  //   setVariationList([
  //     ...variationList,
  //     {
  //       id: Math.floor(Math.random() * 10000),
  //       price: null,
  //       purchase_type: "",
  //     },
  //   ]);
  // };

  const handleChange = (index, event) => {
    const values = [...variationList];
    values[index][event.target.name] = event.target.value;
    // console.log("my valuees",values)
    setVariationList(values);
  };
  let test = [];

  const removeElement = (field, id) => {
    const filteredList = variationList.filter((element) => element.id !== id);
    setVariationList(filteredList);
  };
  const [feildChecker, setFieldChecker] = useState(test);

  const handleAddition = () => {
    setFieldChecker([
      ...feildChecker,
      {
        numberOfHours: true,
        price: true,
        down_payment_value: true,
      },
    ]);
    setVariationList([
      ...variationList,
      {
        id: Math.floor(Math.random() * 10000),
        price: null,
        number_of_hours: "",
      },
    ]);
  };
  for (const iterator of variationList) {
    test.push({
      numberOfHours: true,
      price: true,
      down_payment_value: true,
    });
  }
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
                      required
                      label="Number Of Hours"
                      name={[field.id, "number_of_hours"]}
                      fieldKey={[field.number_of_hours, "number_of_hours"]}
                      rules={[
                        feildChecker[index]?.numberOfHours
                          ? []
                          : ({ getFieldValue }) => ({
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
                        name={[field.id, "number_of_hours"]}
                        placeholder="Please enter Number of Hours"
                        key={field.id}
                        defaultValue={field.name}
                        disabled={checkView}
                        maxLength="2"
                        addonAfter="Hours"
                        onChange={(e) => {
                          // setFieldChecker({
                          //   ...feildChecker,
                          //   numberOfHours: false,
                          // });
                          feildChecker[index].numberOfHours = false;

                          handleChange(index, e);
                        }}
                        className="w-100"
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={11}>
                    <Form.Item
                      label="Price"
                      required
                      name={[field.id, "price"]}
                      fieldKey={[field.price, "price"]}
                      rules={[
                        feildChecker[index]?.price
                          ? []
                          : ({ getFieldValue }) => ({
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
                        name={["price"]}
                        disabled={checkView}
                        placeholder="Enter the Price"
                        addonAfter="EGP"
                        defaultValue={field.price}
                        onChange={(e) => {
                          feildChecker[index].price = false;
                          handleChange(index, e);
                        }}
                        className="w-100"
                      />
                    </Form.Item>
                  </Col>
                  {/* <Col sm={24} md={22}>
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
                        name="down_payment_value"
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
                  </Col> */}
                  {checkView ? null : (
                    <Col sm={24} md={2}>
                      <MinusCircleOutlined
                        className="mt-md-4 pt-md-3"
                        onClick={(e) => {
                          removeElement(field, field.id);
                        }}
                      />
                    </Col>
                  )}
                </Row>
              ))}

              <Form.Item>
                <Button
                  disabled={checkView}
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
