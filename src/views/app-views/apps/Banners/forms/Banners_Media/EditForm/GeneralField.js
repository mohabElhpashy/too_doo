import { Card, Form, Input, Row, Select,  DatePicker,
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
}) => {
  const [feildChecker, setFieldChecker] = useState({
    number: true,
    subject_ar: true,
    subject_en: true,
    body_ar: true,
    body_en: true,
    capacity:null
  });
  console.log("service list =>>>>>",postObject)
  return (
    <>
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="subject_ar"
          label="Subject in Arabic:"
          hasFeedback
          required
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            feildChecker.subject_ar
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
                        "Please enter The Subject in Arabic"
                      );
                    }
                  },
                }),
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            placeholder="Please enter the Subject in Arabic"
            defaultValue={postObject?.name_ar}
            disabled={checkViewMode}
            onChange={(e) => {
              setPostObject({ ...postObject, subject_ar: e.target.value });
              setFieldChecker({ ...feildChecker, subject_ar: false });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="subject_en"
          label="Subject in English:"
          required
          rules={[
            feildChecker.subject_en
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
                        "Please enter The Subject in English"
                      );
                    }
                  },
                }),
          ]}
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            disabled={checkViewMode}
            defaultValue={postObject?.name_en}
            onChange={(e) => {
              setPostObject({ ...postObject, subject_en: e.target.value });
              setFieldChecker({ ...feildChecker, subject_en: false });
            }}
            placeholder="Please enter the Subject in English"
          />
        </Form.Item>


         <Form.Item required name="offer_date" label="Offer Period">
            <DatePicker.RangePicker
              className="w-100"
              showTime
              disabled={checkViewMode}
              defaultValue={[
                moment(
                  postObject?.end_date,
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                ),
                moment(
                  postObject?.start_date,
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                ),
              ]}
              onOk={(event) => {
                const offerFrom = moment(event[0]).format(
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                );
                const offerTo = moment(event[1]).format(
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                );
                setPostObject({
                  ...postObject,
                  offer_to: postObject.end_date,
                  offer_from: postObject.start_date,
                });
              }}
            />
          </Form.Item>
      </Card>
      

    </Row>
    <Card title="Pricing">
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="currentPrice"
            label="Old Price"
          >
            <div key={postObject.currentPrice}>
              <Input
                disabled={true}
                defaultValue={postObject.currentPrice}
                value={postObject.currentPrice}
                addonAfter="EGP"
                className="w-100"
              />
            </div>
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            name="discount"
            label="Discount"
          
          >
            <Input
              name="discount"
              disabled={checkViewMode}
              defaultValue={postObject?.discount}
              addonAfter="%"
              
              className="w-100"
            />
          </Form.Item>
          <Form.Item name="price" label="New Price">
            <Input
              name="price"
              placeholder="Enter the Price"
              addonAfter="EGP"
              disabled={true}
              defaultValue={Math.round(postObject?.new_price)}
              
              className="w-100"
            />
          </Form.Item>
        </Card>
    </>
    
  );
};

export default GeneralField;
