import { Card, Form, Input, Row, Select,  DatePicker,Col
} from "antd";
import React, { useState } from "react";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ } from "constants/DateConstant";

import {
  ARABIC_alpha,
  ARABIC_NUMBER_CHAR,
  ENGLISH_ALPH,
  ENGLISH_Number_CHAR,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";

const GeneralField = ({
  postObject,
  setPostObject,
  checkView
   
}) => {
   
  console.log("mohasdb =>>>>>",postObject)
  return (
    <>
     {postObject.name_ar!=""||postObject.name_en!=""?
     
    
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
           label="Method"
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
             name="name_ar"
             disabled={checkView}
             // value={postObject.name_ar}
             defaultValue={postObject.method}   
             onPressEnter={(e) => e.preventDefault()}
             onChange={(event) =>
               setPostObject({
                ...postObject,
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
           label="service_name"
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
           defaultValue={postObject?.service_name}   
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
         <Form.Item
           required
           style={{
             display: "inline-block",
             width: "calc(50% - 5px)",
             marginRight: 8,
           }}
           name="name_ar"
           label="type"
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
             name="name_ar"
             disabled={checkView}
             // value={postObject.name_ar}
             defaultValue={postObject.type}   
             onPressEnter={(e) => e.preventDefault()}
             onChange={(event) =>
               setPostObject({
                ...postObject,
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
           label="uri"
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
           defaultValue={postObject?.uri}   
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
      
   </Row>:<h1>mohab</h1>}
     
    </>
    
  );
};

export default GeneralField;
