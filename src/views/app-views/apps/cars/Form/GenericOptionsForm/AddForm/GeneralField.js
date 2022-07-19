import { Card, Form, Input, Row } from "antd";
import React from "react";



const GeneralField = ({ postObject, setPostObject}) => {
 

  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
         required
          name="namer_ar"
          label="Option Name in Arabic:"
          onPressEnter={(e) => e.preventDefault()}

      >
          <Input onChange={(e)=>setPostObject({...postObject,name_ar:e.target.value})} placeholder="Enter Option Name in Arabic"/>
      </Form.Item>
          
      <Form.Item
         required
          name="name_en"
          label="Option Name in English:"
          onPressEnter={(e) => e.preventDefault()}

      >
          <Input onChange={(e)=>setPostObject({...postObject,name_en:e.target.value})} placeholder="Enter Option Name in English"/>
      </Form.Item>
        
      </Card>
    </Row>
  );
};

export default GeneralField;
