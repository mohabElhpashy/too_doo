import { Card, Form, Input, Row, Select, Upload,
    DatePicker,Col,Table} from "antd";
  import React, { useState } from "react";
  import { languageValidator, numberValidator } from "constants/helperFunctions";
  import moment from "moment";
  import { DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ } from "constants/DateConstant";
  import { ImageSvg } from "assets/svg/icon";
  import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
  import CustomIcon from "components/util-components/CustomIcon";
  
  import {
    ARABIC_alpha,
    ENGLISH_ALPH,
    NUMBER_CONSTANTS,
  } from "constants/LanguagesConstent";
  import { lowerCase } from "lodash";
  const { Dragger } = Upload;
  
  
  const GeneralField = ({
    Variations,
    checkViewMode
  }) => {
    const [feildChecker, setFieldChecker] = useState({
      number: true,
      subject_ar: true,
      subject_en: true,
      body_ar: true,
      body_en: true,
      capacity:null
    });
    console.log("service list =>>>>>",Variations[0])
    return (
      
        <Row gutter={16}>
        <Col xs={24} sm={24} md={17}>
          <Card title="Basic Info">
            <Form.Item
              name="namr_en"
              label="Number Of Hours"
               >
              <Input
              disabled={checkViewMode}
              defaultValue={Variations[0].number_of_hours}

                
                placeholder="Name in English"
                // onPressEnter={(e) => e.preventDefault()}
              />
            </Form.Item>
            <Form.Item name="namr_ar"
             label="Down Payment Value" 
              >
              <Input
              disabled={checkViewMode}
              defaultValue={Variations[0].down_payment_value}
              placeholder="Name in Arabic "
                // onPressEnter={(e) => e.preventDefault()}
                // onChange={(e) =>
                //   setOperation({ ...operations, name_ar: e.target.value })
                // }
                rows={4}
              
              />
            </Form.Item>
            <Form.Item name="namr_ar"
             label="Price" 
              >
              <Input
              disabled={checkViewMode}
              defaultValue={Variations[0].price}
              placeholder="Name in Arabic "
                // onPressEnter={(e) => e.preventDefault()}
                // onChange={(e) =>
                //   setOperation({ ...operations, name_ar: e.target.value })
                // }
                rows={4}
              
              />
            </Form.Item>
         
            {/* <Form.Item
              name="namr_en"
              label="English Name"
            //   rules={rules.name}
              defaultValue={Variations.name_en}
              >
              <Input
                // onChange={(e) =>
                //   setOperation({ ...operations, name_en: e.target.value })
                // }
                placeholder="Name in English"
                // onPressEnter={(e) => e.preventDefault()}
              />
            </Form.Item>
            <Form.Item name="namr_ar" label="Arabic Name" rules={rules.name}  defaultValue={operations.name_ar}>
              <Input
                placeholder="Name in Arabic "
                // onPressEnter={(e) => e.preventDefault()}
                // onChange={(e) =>
                //   setOperation({ ...operations, name_ar: e.target.value })
                // }
                rows={4}
              
              />
            </Form.Item> */}
             
          
          </Card>
  
           
        </Col>
        <Col xs={24} sm={24} md={7}>
          <Card title="Main Image" style={{ height: 365 }}>
          <Dragger
              showUploadList={false}
              name="main_image"
              // customRequest={(options) => uploadHandler(options, "main_image")}
              disabled={checkViewMode}
            >
              {Variations[0]?.main_image ? (
                <img
                  src={Variations[0]?.main_image }
                  alt="avatar"
                  className="img-fluid"
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <div>
                  {Variations[0]?.main_image  ? (
                    <div>
                      <LoadingOutlined className="font-size-xxl text-primary" />
                      <div className="mt-3">Uploading</div>
                    </div>
                  ) : (
                    <div>
                      <CustomIcon className="display-3" svg={ImageSvg} />
                      <p>Clic k or drag file to upload</p>
                    </div>
                  )}
                </div>
              )}
            </Dragger>
          </Card>
         
        </Col>
       </Row>
    )
  };
  
  export default GeneralField;
  