import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Row, Select,DatePicker } from "antd";
import { numberValidator } from "constants/helperFunctions";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
import React from "react";
import { useState } from "react";
function VariationField({
  postObject,
  setPostObject,
  variationList,
  setVariationList,
}) {
//     
  return (
    <Card title="Variants">
       
        
         
            <div className="mt-3">
              
                <Row   gutter={16}>
                  <Col sm={24} md={11}>
             

                  <Form.Item
            style={{
              display: "inline-block",
              width: "calc(100% - 5px)",
              marginRight: 8,
            }}
            required

            name="reservation_date"
            label="Reservation_Date"
            
          >
             <DatePicker
              showTime
              className="w-100"
             
              placeholder="Select Time"
              onOk={ (e)=>setVariationList({...variationList,
                reservation_date:e._d.toISOString('yyyy-MM-dd')
            })}

            />
           </Form.Item>
                   </Col>
                  <Col sm={24} md={11}>
                     <Form.Item
                      label="Price"
                      required
                  
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
                        addonAfter="EGP"
                         onChange={(e) => setVariationList({...variationList,price: e.target.value})}
                        className="w-100"
                       />
 
                    </Form.Item>
                   </Col>
                 
                </Row>
              
              
            </div>
        
      
      
    </Card>
  );
}

export default VariationField;
