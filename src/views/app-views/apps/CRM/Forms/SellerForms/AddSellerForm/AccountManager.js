import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import React from "react";
import { useState } from "react";
function VariationField({
  postObject,
  setPostObject,
  variationList,
  setVariationList,
  isDisabled,
}) {
  //    const handleAddition = (add,fields)=>{
  //      add();
  //      if(fields.length>0)setTempList([...tempList,variationList])
  //    }

  const handleChange = (index, event) => {
    const values = [...variationList];
    values[index][event.target.name] = event.target.value;
    setVariationList(values);
  };
  let test = [];
  const [feildChecker, setFieldChecker] = useState(test);

  const removeElement = (field, id) => {
    const filteredList = variationList.filter((element) => element.id !== id);
    setVariationList(filteredList);
  };

  const handleAddition = () => {
    setFieldChecker([
      ...feildChecker,
      {
        account_manger_name: true,
        account_manger_phone: true,
      },
    ]);
    setVariationList([
      ...variationList,
      {
        id: Math.floor(Math.random() * 10000),
        account_manger_phone: null,
        account_manger_name: "",
      },
    ]);
  };
  for (const iterator of variationList) {
    test.push({
      account_manger_name: true,
      account_manger_phone: true,
    });
  }
  return (
    <Card title="Account Managers">
      <Form.List name="variants">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {variationList?.map((field, index) => (
                <Row key={field.id} gutter={16}>
                  <Col sm={24} md={11}>
                    <Form.Item
                      required
                      hasFeedback
                      label="Account Manager Name"
                      name={[field.id, "account_manger_name"]}
                      rules={[
                        feildChecker[index]?.account_manger_name
                          ? []
                          : ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value)
                                  return Promise.reject(
                                    "You Must Enter The Name"
                                  );

                                const checkValidation = languageValidator(
                                  value.toLowerCase(),
                                  [...ARABIC_alpha, ...ENGLISH_ALPH]
                                );
                                if (checkValidation) {
                                  return Promise.resolve();
                                } else {
                                  return Promise.reject(
                                    "The Name Must be Characters"
                                  );
                                }
                              },
                            }),
                      ]}
                      className="w-100"
                    >
                      <Input
                        name="account_manger_name"
                        placeholder="Please enter Account Manager Name"
                        key={field.id}
                        disabled={isDisabled}
                        defaultValue={field.account_manger_name}
                        onChange={(e) => {
                          feildChecker[index].account_manger_name = false;
                          handleChange(index, e);
                        }}
                        className="w-100"
                        value={field.account_manger_name}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={11}>
                    <Form.Item
                      label="Account Manager Phone"
                      required
                      hasFeedback
                      name={[field.id, "account_manger_phone"]}
                      fieldKey={[
                        field.account_manger_phone,
                        "account_manger_phone",
                      ]}
                      rules={[
                        feildChecker[index]?.account_manger_phone
                          ? []
                          : ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  value.length === 11 &&
                                  value[0] == 0 &&
                                  value[1] == 1 &&
                                  (value[2] == 0 ||
                                    value[2] == 1 ||
                                    value[2] == 2 ||
                                    value[2] == 5)
                                ) {
                                  return Promise.resolve();
                                } else {
                                  return Promise.reject(
                                    "Please enter A Valid Phone Number"
                                  );
                                }
                              },
                            }),
                      ]}
                      className="w-100"
                    >
                      <Input
                        name="account_manger_phone"
                        placeholder="Enter Account Manager Phone"
                        key={field.id}
                        maxLength={11}
                        defaultValue={field.account_manger_phone}
                        disabled={isDisabled}
                        onChange={(e) => {
                          feildChecker[index].account_manger_phone = false;

                          handleChange(index, e);
                        }}
                        className="w-100"
                        value={field.account_manger_phone}
                      />
                    </Form.Item>
                  </Col>

                  <Col sm={24} md={2}>
                    <MinusCircleOutlined
                      className="mt-md-4 pt-md-3"
                      onClick={(e) => {
                        if (isDisabled) return null;
                        else {
                          removeElement(field, field.id);
                        }
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  disabled={isDisabled}
                  onClick={() => handleAddition()}
                  className="w-100"
                >
                  <PlusOutlined /> Add Account Manager
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
