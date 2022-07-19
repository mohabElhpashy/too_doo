import React, { useRef, useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  message,
  Select,
  Modal,
  Button,
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import service from "auth/FetchInterceptor";
import {
  ARABIC_alpha,
  ARABIC_NUMBER_CHAR,
  ENGLISH_ALPH,
  ENGLISH_Number_CHAR,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { languageValidator, numberValidator } from "constants/helperFunctions";
 

const Periods = ({
    postObject, 
    setPostObject ,
    checkView
}) => {
  // const imgList = React.useMemo(() => (props.postObject.subImages.map((element, index) => ({ uid: index, url: element, name: 'image.png' }))))

  
  //Upload Seaction
 

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
          
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            label="Name in Arabic"
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ARABIC_NUMBER_CHAR
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
            <Input
            disabled={checkView}
              name="name_ar"
              defaultValue={postObject.name_ar}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObject({
                    ...postObject
                 ,
                 name_ar: event.target.value,
                })
              }
              placeholder="Please enter Product Name in Arabic"
            />
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
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ENGLISH_Number_CHAR
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
            <Input
            disabled={checkView}
          defaultValue={postObject.name_en}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
            setPostObject({
                  ...postObject,
                  name_en: event.target.value,
                })
              }
              placeholder="Please enter Product Name in English"
            />
          </Form.Item>

          
          
        
        </Card>
      </Col>
   
    </Row>
  );
};

export default Periods;
