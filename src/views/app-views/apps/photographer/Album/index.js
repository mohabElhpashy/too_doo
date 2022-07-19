import { Button, Form, Tabs } from "antd";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
// import { useFetchSingle } from "hooks";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ProductForm = () => {
  const [form] = Form.useForm();
  // const [loading, setLoading] = useState(false);
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  // const { services } = useFetchSingle(`albums?store_id=${recordId}`);
  const history = useHistory();
  const inialState = {
    question_ar: "",
    question_en: "",
    answer_ar: "",
    answer_en: "",
  };
  const [postObject, setPostObject] = useState(inialState);
  //Handle Notification
  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Process Feedback",
  //     description: "Your Process has been Done Successfully!",
  //   });
  // };

  // Button Disabled

  // const buttonValidation = () => {
  //   let count = 0;
  //   for (const key in postObject) {
  //     if (!postObject[key]) {
  //       count++;
  //     }
  //   }
  //   if (count == 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const onFinish = async (postObject) => {
  //   setLoading(true);
  //   try {
  //     await service.post(`/web/faqs`, postObject);
  //     setLoading(false);
  //     openNotificationWithIcon("success");
  //     history.push("staticPages");
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        onSubmitCapture={(e) => {
          e.preventDefault();
        }}
        className="ant-advanced-search-form"
        initialValues={{
          ...postObject,
          prefix: "+02",
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3"> PhotoGrapher Album</h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("photoGrapher")}
                >
                  Go Back
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                setPostObject={setPostObject}
                postObject={postObject}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
