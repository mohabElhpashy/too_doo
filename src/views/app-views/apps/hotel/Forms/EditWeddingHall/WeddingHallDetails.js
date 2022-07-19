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
  detailsList ,
   setDetailsList,
  
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
  console.log("details",detailsList)
   
  const handleChange = (index, event) => {
    const values = [...detailsList];
    values[index][event.target.name] = event.target.value;
    setDetailsList(values);
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
    const filteredList = detailsList.filter((element) => element.id !== id);
    setDetailsList(filteredList);
    
  };
  const handleAddition = () => {
    setDetailsList([
      ...detailsList,
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
              {detailsList?.map((field, index) => (
                <>
                {  checkView?
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
                  // onClick={(e) => {
                  //   removeElement(field, field.id);
                  // }}
                />
              </div>:
                    <div
                    style={{
                      display: "flex",
                      flex: 1,
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <MinusCircleOutlined
                                // disabled={checkView}
    
                      className="mt-md-4 pt-md-3 "
                      onClick={(e) => {
                        removeElement(field, field.id);
                      }}
                    />
                  </div>
}
                
           

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
            // rules={[
            //   {
            //     whitespace: true,
            //   },
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ARABIC_alpha
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Please enter The Name in Arabic");
            //       }
            //     },
            //   }),
            // ]}
          >
            <div key={field.id}>
            <Input
            defaultValue={field.name_ar}
            name="name_ar"
            disabled={checkView}

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
                    // rules={[
                    //   {
                    //     whitespace: true,
                    //   },
                    //   ({ getFieldValue }) => ({
                    //     validator(_, value) {
                    //       const checkValidation = languageValidator(
                    //         value.toLowerCase(),
                    //         ENGLISH_ALPH
                    //       );
                    //       if (checkValidation) {
                    //         return Promise.resolve();
                    //       } else {
                    //         return Promise.reject("Please enter The Name in English");
                    //       }
                    //     },
                    //   }),
                    // ]}
                  >
                                <div key={field.id}>

                    <Input
                    name="name_en"
                    defaultValue={field.name_en}
                    disabled={checkView}

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
                    defaultValue={field.description_ar}
                    disabled={checkView}

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
                    disabled={checkView}
                    name="description_ar"
                      placeholder="Enter the Description in English"
                      onChange={(event) =>handleChange(index,event)}
                      defaultValue={field.description_en}

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
                  disabled={checkView}

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
