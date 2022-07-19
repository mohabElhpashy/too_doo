import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, Select,Input } from "antd";
import React from "react";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { languageValidator, numberValidator } from "constants/helperFunctions";
function WeddingHallDetails({
  details,
  setdetails,
  
   checkView,
}) {
  const rules = {
    name: [
      {
        required: true,
        message: "Please enter product name",
      },
    ],
    description: [
      {
        required: true,
        message: "Please enter product description",
      },
    ],
    price: [
      {
        required: true,
        message: "Please enter product price",
      },
    ],
    comparePrice: [],
    taxRate: [
      {
        required: true,
        message: "Please enter tax rate",
      },
    ],
    cost: [
      {
        required: true,
        message: "Please enter item cost",
      },
    ],
  };
  console.log("details",details)
   
  const handleChange = (index, event) => {
    const values = [...details];
    values[index][event.target.name] = event.target.value;
    setdetails(values);
  };
  // const handleSelect = (index, event, key) => {
  //   const values = [...detailsList];
  //   values[index][key] = event;
  //   // values[index]["name_en"] = orignalDetailesList.find(
  //   //   (element) => element.id === event
  //   // ).name_en;
  //   // genericDetailsList.filter((element, index) => element.id !== event);
  //   setDetailsList(values);
  // };

  const removeElement = (field, id) => {
    const filteredList = details.filter((element) => element.id !== id);
    setdetails(filteredList);
    
  };
  const handleAddition = () => {
    setdetails([
      ...details,
      {
        id: Math.floor(Math.random() * 10000),
        name_en:"",
        name_ar:"",
        description_en:"",
        description_ar:"",
      },
    ]);
  };
  return (
    <Card title="Details">
      <Form.List name="details">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {details?.map((field, index) => (
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
                      className="mt-md-4 pt-md-3 "
                      onClick={(e) => {
                        removeElement(field, field.id);
                      }}
                    />
                  </div>
           

                <Row key={field.id} gutter={16}>
                  <Col sm={24} md={24}>
                  <Form.Item
            hasFeedback
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            label="Name in Arabic"
            rules={[
              {
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ARABIC_alpha
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Please enter The Name in Arabic");
                  }
                },
              }),
            ]}
          >
            <div key={field.id}>
            <Input
            name="name_ar"
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>handleChange(index,event)}
              placeholder="Please enter Product Name in Arabic"
            />
            </div>
                 </Form.Item>

                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 5px)",
                    }}
                    required
                    name="name_en"
                    label="Name in English"
                    hasFeedback
                    rules={[
                      {
                        whitespace: true,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const checkValidation = languageValidator(
                            value.toLowerCase(),
                            ENGLISH_ALPH
                          );
                          if (checkValidation) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject("Please enter The Name in English");
                          }
                        },
                      }),
                    ]}
                  >
                                <div key={field.id}>

                    <Input
                    name="name_en"
                      onPressEnter={(e) => e.preventDefault()}
                      onChange={(event) =>handleChange(index,event)}

                      placeholder="Please enter Product Name in English"
                    />
                    </div>
                  </Form.Item>

                  <Form.Item
                    required
                    name="description_ar"
                    label="Description in Arabic"
                    // rules={[
                    //   ({ getFieldValue }) => ({
                    //     validator(_, value) {
                    //       const checkValidation = languageValidator(
                    //         value.toLowerCase(),
                    //         ARABIC_alpha
                    //       );
                    //       if (checkValidation) {
                    //         return Promise.resolve();
                    //       } else {
                    //         return Promise.reject(
                    //           "Please enter The Description in Arabic"
                    //         );
                    //       }
                    //     },
                    //   }),
                    // ]}
                  >
               <div key={field.id}>

                    <Input.TextArea
                    name="description_en"
                    onChange={(event) =>handleChange(index,event)}

                      rows={4}
                    />
                    </div>
                  </Form.Item>

                  <Form.Item
                    required
                    name="description_en"
                    label="Description in English"
                    // rules={[
                    //   ({ getFieldValue }) => ({
                    //     validator(_, value) {
                    //       const checkValidation = languageValidator(
                    //         value.toLowerCase(),
                    //         ENGLISH_ALPH
                    //       );
                    //       if (checkValidation) {
                    //         return Promise.resolve();
                    //       } else {
                    //         return Promise.reject(
                    //           "Please enter The Description in English"
                    //         );
                    //       }
                    //     },
                    //   }),
                    // ]}
                  >
              <div key={field.id}>

                    <Input.TextArea
                    name="description_ar"
                      placeholder="Enter the Description in English"
                      onChange={(event) =>handleChange(index,event)}

                      rows={4}
                    />
                    </div>
                  </Form.Item>
                  </Col>
 
                
                </Row>
                </>
              ))}
              <Form.Item>
                <Button
                  // disabled={
                  //   checkView ||
                  //   orignalDetailesList?.length === detailsList.length
                  // }
                  type="dashed"
                  onClick={() => handleAddition()}
                  className="w-100"
                >
                  <PlusOutlined /> Add Another Detail
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Card>
  );
}

export default WeddingHallDetails;
