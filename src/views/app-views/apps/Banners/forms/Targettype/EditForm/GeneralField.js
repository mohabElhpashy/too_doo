import { Card, Form, Input,Col, Row, Select,  DatePicker,
} from "antd";
import React, { useState } from "react";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ } from "constants/DateConstant";

import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";

const GeneralField = ({
  postObject,
  setPostObject,
  checkViewMode,
  servicesList,
  setButtonChecker,
  singeltarget
}) => {
 
  const  service=[  "home", "product" ,"seller" ,"service" ,"flashdeals" ,"offers" ]

  console.log("service list =>>>>>",postObject)
  return (
    <>
    <Row gutter={24 }>
 <Col xs={24} sm={24} md={7}>
        <Card title="Add Target Type" style={{ height: 365}}>
        <Form.Item required name="Target Type" label="Target Type:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Target Type"
            // onChange={(e) =>
            //   setTargetType({ ...TargetType, value: e })
              
            // }
            onSelect={(e) => {
              setPostObject({ ...postObject, value: e })

          }}
          disabled={checkViewMode==="view"}
          defaultValue={singeltarget.show_in}
            // onSelect={(e) => setPostObject({ ...postObject, service_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {service?.map((element, index) => (
              <Select.Option key={index} value={element} onClick={e=>console.log(element)}>
                {element}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        </Card>
       
      </Col>   
      
        </Row>
    </>
    
  );
};

export default GeneralField;
